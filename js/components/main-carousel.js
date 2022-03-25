const btnRight = document.querySelector('.button-arrow.-right');
const btnLeft = document.querySelector('.button-arrow.-left');
const elements = document.querySelector('.elements');
const form = document.querySelector('form');
let pixels = 0;

btnRight.addEventListener('click', function () {
  pixels -= 100
  elements.style = `transform: translateX(${pixels}px);`;
});

btnLeft.addEventListener('click', function () {
  pixels += 100
  elements.style = `transform: translateX(${pixels}px);`;
});

form.addEventListener('submit', function () {
  alert('not working yet')
});