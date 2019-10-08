const list = document.querySelector('#my-todo')
const todos = ['Hit the gym', 'Read a book', 'Buy eggs', 'Organize office', 'Pay bills']

for (let todo of todos) {
  addItem(todo)
}

function addItem(text) {
  let newItem = document.createElement('li')
  newItem.innerHTML = writeItem(text)
  list.appendChild(newItem)
  newItem.children[0].classList.add('bg-info')
}

function writeItem(textContent) {
  let content = `
    <label for="item">${textContent}</label>
    <i class="delete fa fa-trash"></i>
  `
  return content
}

// == 新增 todo 項目 == 
const addButton = document.querySelector('#addBtn')
const input = document.querySelector('#newTodo')

addButton.addEventListener('click', addTodo)

function addTodo() {
  let newInput = input.value
  if (newInput !== '') { //如果 input 還沒有輸入內容，不會產生新的 todo
    addItem(newInput)
    input.value = '' // input 加入todo 後清空
  }
}

// 按下 Enter 鍵時，一樣可以新增 todo
input.addEventListener('keypress', function (event) {
  if (event.keyCode === 13) {
    addTodo()
  }
}
)

// == 點擊刪除按鈕時，可以刪除事件 ==
const done = document.querySelector('#done-item')

list.addEventListener('click', deleteItem)
done.addEventListener('click', deleteItem)

function deleteItem(event) {
  if (event.target.classList.contains('delete')) {
    event.target.parentElement.remove()
  }
}

// == 點擊 todo 文字時，將項目移至done list 並套用.checked 樣式 ==
list.addEventListener('click', moveToDone)

function moveToDone(event) {
  if (event.target.tagName === 'LABEL') {
    event.target.parentElement.remove()
    let text = event.target.textContent
    let doneItem = document.createElement('li')
    doneItem.innerHTML = writeItem(text)
    done.appendChild(doneItem)
    doneItem.children[0].classList.add('checked', 'bg-dark')
  }
}

// == 點擊 Done list 裡的項目後, 將項目加回Todo ==
done.addEventListener('click', moveBackTodo)
function moveBackTodo(event) {
  if (event.target.tagName === 'LABEL') {
    let text = event.target.textContent
    addItem(text)
    event.target.parentElement.remove()
  }
}