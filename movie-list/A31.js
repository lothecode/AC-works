(function () {
  const BASE_URL = 'https://movie-list.alphacamp.io'
  const INDEX_URL = BASE_URL + '/api/v1/movies/'
  const POSTER_URL = BASE_URL + '/posters/'
  const data = []
  const ITEM_PER_PAGE = 12
  const dataPanel = document.getElementById('data-panel')
  const searchForm = document.getElementById('search')
  const searchInput = document.getElementById('search-input')
  const pagination = document.querySelector('#pagination')
  const displayMode = document.querySelector('#display-mode')
  const resultQty = document.querySelector('#result-qty')
  let mode = 'cards' // for default display mode
  let paginationData = [] // for getPageData函式, 在外面設置一個變數 paginationData，讓 getPageData 擁有固定的資料來源
  let initialPage = 1

  axios.get(INDEX_URL).then((response) => {
    data.push(...response.data.results)
    getTotalPages(data)
    getPageData(initialPage, data, mode)

  }).catch((err) => console.log(err))

  pagination.addEventListener('click', event => {
    pageActive(initialPage)
    if (event.target.tagName === 'A') {

      initialPage = event.target.dataset.page
      getPageData(initialPage)
      pageActive(initialPage)//頁面所在會是藍色,
    }
  })

  displayMode.addEventListener('click', event => {
    if (event.target.classList.contains('fa-th')) {
      mode = 'cards'
    } else if (event.target.classList.contains('fa-bars')) {
      mode = 'list'
    }
    getTotalPages(paginationData)
    getPageData(initialPage, paginationData)
    //這裡要傳入paginationData, 當已經search過後, data的內容變成results, 但這裡不知道data是誰, 還有一個地方的data也被調整過就是為了做分頁時的paginationData

  })

  dataPanel.addEventListener('click', (event) => {
    if (event.target.matches('.btn-show-movie')) {
      showMovie(event.target.dataset.id)
    } else if (event.target.matches('.btn-add-favorite')) {
      addFavoriteItem(event.target.dataset.id)
    }
  })


  searchForm.addEventListener('submit', event => {
    event.preventDefault()
    let results = []
    const regex = new RegExp(searchInput.value, 'i')
    results = data.filter(movie => movie.title.match(regex))
    let htmlReulst = ''
    htmlReulst = `
      <h5>${results.length} result(s) found</h5>
      `
    resultQty.innerHTML = htmlReulst
    initialPage = 1
    getTotalPages(results)
  })

  function getTotalPages(data) {
    let totalPages = Math.ceil(data.length / ITEM_PER_PAGE) || 1
    let pageItemContent = ''
    for (let i = 0; i < totalPages; i++) {
      pageItemContent += `
      <li class="page-item">
        <a class="page-link" href="javascript:;" data-page="${i + 1}">${i + 1}</a>
      </li>
      `
    }
    pagination.innerHTML = pageItemContent
    getPageData(initialPage, data)
    pageActive(initialPage, data)
  }

  // 每頁電影內容抓取
  function getPageData(pageNum, data) {
    paginationData = data || paginationData
    // console.log(pageNum)
    let offset = (pageNum - 1) * ITEM_PER_PAGE
    let pageData = paginationData.slice(offset, offset + ITEM_PER_PAGE)
    displayDataList(pageData)
  }
  // 當使用者點擊 pagination(pagination eventListener的動作時)) 時，程序理應要用同一組 data 來繼續計算。要如何在 pagination.addEventListener 沒有傳入 data 的情況下，能夠知道要用「上次傳入的 data」來運算出正確的電影列表呢？ 點displaymode時也會有一樣的狀況
  // 要解決這個問題，我們需要在 getPageData 的外面設置一個變數 paginationData，讓 getPageData 擁有固定的資料來源, 如果呼叫 getPageData 時有電影資料被傳入，就用新傳入的資料作運算，然後 paginationData 會被刷新；如果呼叫 getPageData 時沒有電影資料被傳入，則沿用 paginationData 裡的內容，確保 slice 始終有東西可以處理。


  function displayDataList(data) {
    let htmlContent = ''
    data.forEach(function (item, index) {
      switch (mode) {
        case 'cards':
          htmlContent += `
        <div class="col-sm-3">
          <div class="card mb-2">
            <img class="card-img-top " src="${POSTER_URL}${item.image}" alt="Card image cap">
            <div class="card-body movie-item-body">
              <h5 class="card-title">${item.title}</h5>
            </div>
            <!-- "More" button -->
            <div class="card-footer">
              <button class="btn btn-primary btn-show-movie" data-toggle="modal" data-target="#show-movie-modal" data-id="${item.id}">More</button>
              <button class="btn btn-info btn-add-favorite" data-id="${item.id}">+</button>
            </div>
          </div>
        </div>
      `
          break;

        case 'list':
          htmlContent += `
            <table class="table">
        <tbody>
          <tr>
            <td width="67%">${item.title}</td>
            <td width="33%">
              <button class="btn btn-primary btn-show-movie" data-toggle="modal" data-target="#show-movie-modal"
                data-id="${item.id}">More</button>
              <button class="btn btn-info btn-add-favorite" data-id="${item.id}">+</button>
            </td>
          </tr>
        </tbody>
      </table>`
          break;
      }
    })
    dataPanel.innerHTML = htmlContent
  }


  function showMovie(id) {
    const modalTitle = document.getElementById('show-movie-title')
    const modalImage = document.getElementById('show-movie-image')
    const modalDate = document.getElementById('show-movie-date')
    const modalDescription = document.getElementById('show-movie-description')
    const url = INDEX_URL + id

    axios.get(url).then(response => {
      const data = response.data.results
      modalTitle.textContent = data.title
      modalImage.innerHTML = `<img src="${POSTER_URL}${data.image}" class="img-fluid" alt="Responsive image">`
      modalDate.textContent = `release at : ${data.release_date}`
      modalDescription.textContent = `${data.description}`
    })
  }

  function addFavoriteItem(id) {
    const list = JSON.parse(localStorage.getItem('favoriteMovies')) || []
    const movie = data.find(item => item.id === Number(id))
    if (list.some(item => item.id === Number(id))) {
      alert(`${movie.title} is already in your favorite list.`)
    } else {
      list.push(movie)
      alert(`Added ${movie.title} to your favorite list!`)
    }
    localStorage.setItem('favoriteMovies', JSON.stringify(list))
  }

  //  pagination在頁面所在處是藍色 用classList.toggle來切換. 用children來指定
  function pageActive(pageNum) {
    pagination.children[pageNum - 1].classList.toggle('active')
    console.log(pagination.children[pageNum - 1])
  }


})()
