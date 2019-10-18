const red = document.querySelector('#red-range')
const green = document.querySelector('#green-range')
const blue = document.querySelector('#blue-range')
const redchip = document.querySelector('#red-chip')
const greenchip = document.querySelector('#green-chip')
const bluechip = document.querySelector('#blue-chip')
const show = document.querySelector('.color-area')
const code = document.querySelector('#code')



function fixCode(num) {
  const fixcode = parseInt(num).toString(16)
  return ('0' + fixcode).slice(-2);
  //可使用負數索引，表示由陣列的最末項開始提取。slice(-2) 代表拷貝陣列中的最後兩個元素。
}

show.addEventListener('change', function () {
  let redcode = fixCode(red.value)
  redchip.textContent = red.value
  let greencode = fixCode(green.value)
  greenchip.textContent = green.value
  let bluecode = fixCode(blue.value)
  bluechip.textContent = blue.value
  let color = '#' + redcode + greencode + bluecode
  show.style.backgroundColor = color
  code.textContent = color
})