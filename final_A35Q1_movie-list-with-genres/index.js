(function () {
  const genres = {
    "1": "Action",
    "2": "Adventure",
    "3": "Animation",
    "4": "Comedy",
    "5": "Crime",
    "6": "Documentary",
    "7": "Drama",
    "8": "Family",
    "9": "Fantasy",
    "10": "History",
    "11": "Horror",
    "12": "Music",
    "13": "Mystery",
    "14": "Romance",
    "15": "Science Fiction",
    "16": "TV Movie",
    "17": "Thriller",
    "18": "War",
    "19": "Western"
  }

  const BASE_URL = 'https://movie-list.alphacamp.io'
  const INDEX_URL = BASE_URL + '/api/v1/movies/'
  const POSTER_URL = BASE_URL + '/posters/'
  const ITEM_PER_PAGE = 12
  const dataPanel = document.querySelector('#data-panel')
  const genresList = document.querySelector('#genres')
  const pagination = document.querySelector('#pagination')

  let data = []
  let paginationData = []
  let initialPage = 1

  // initial page
  axios.get(INDEX_URL).then((response) => {
    data.push(...response.data.results)
    getTotalPages(data)
    writeGenresList(genres)
  }).catch((err) => console.log(err))

  //  == function ==
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

  function getPageData(pageNum, data) {
    paginationData = data || paginationData
    let offset = (pageNum - 1) * ITEM_PER_PAGE
    let pageData = paginationData.slice(offset, offset + ITEM_PER_PAGE)
    displayDataList(pageData)
  }

  function pageActive(pageNum) {
    pagination.children[pageNum - 1].classList.toggle('active')
  }

  function displayDataList(data) {
    let htmlContent = ''
    if (data.length === 0) {
      htmlContent = `
      <div class="px-3 text-center w-100">
          <h5 class="my-4"><i class="fas fa-search"></i> Oops! No result found :(</h5>
          <span>back to </span><a href="index.html">HOME</a>
      </div>
      `
    } else {
      data.forEach(function (item, index) {
        htmlContent += `
        <div class="col-sm-3 mb-2 mt-2">
          <div class="card h-100">
            <img class="card-img-top" src="${POSTER_URL}${item.image}" alt="Card image cap">
            <div class="card-body px-1 movie-item-body">
              <h5 class="card-title">${item.title}</h5>
            </div>
            <!-- genre area -->
            <div class="card-footer px-1">
             ${movieGenres(item.genres)}
            </div>
          </div>
        </div>
      `
      })
      //item.genres是一組只有genres的key的陣列, 將之傳入movieGenres的函式中
    }
    dataPanel.innerHTML = htmlContent

  }

  //  左欄分類清單
  function writeGenresList(genres) {
    let genresContent = ''
    for (let i in genres) {
      genresContent += `
      <li class="nav-item">
        <a class="nav-link py-0 pl-1" href="javascript:;" data-toggle="pill">${genres[i]}</a>
      </li>
    `
    }
    genresList.innerHTML = genresContent
  }

  //  傳入genres的key到函式, 用來找出genres這個物件裡key對應的value
  function movieGenres(ary) {
    let htmlContent = ''
    for (let i in ary) {
      htmlContent += `
        <span class="alert-sm alert-secondary rounded">${genres[ary[i]]}</span> 
        `
      //  用變數來存取物件，使用bracket notation
    }
    return htmlContent
  }

  function findGenresKey(value) {
    for (let key in genres) {
      if (genres[key].includes(value)) {
        return key
      }
    }
  }

  function showSelected(data, key) {
    let genresData = []
    data.forEach(function (item, index) {
      for (let i = 0; i < item.genres.length; i++) {
        if (item.genres[i] === parseInt(key)) {
          genresData.push(item)
        }
      }
    })
    // console.log(genresData)
    initialPage = 1
    getTotalPages(genresData)
  }


  //  == EventListener ==
  // select genres event listener
  genresList.addEventListener('click', event => {
    let genresIndex = event.target.textContent
    let key = findGenresKey(genresIndex)
    showSelected(data, key)
  })

  //  pagination event listener
  pagination.addEventListener('click', event => {
    pageActive(initialPage)
    if (event.target.tagName === 'A') {
      initialPage = event.target.dataset.page
      getPageData(initialPage)
      pageActive(initialPage)//頁面所在會是藍色
    }
  })

  // == end
})()
