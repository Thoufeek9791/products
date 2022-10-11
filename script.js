

const formEl = document.querySelector('form');
// console.log(formEl);


formEl.addEventListener('submit', (e) => {
    e.preventDefault();
    // console.log(formEl.productsearch.value);
})

const addIcon = document.querySelector('.fa-circle-plus');
const removeIcon = document.querySelector('.fa-trash');

addIcon.addEventListener('click', () => {
    const item = prompt('Enter the Product');
    const size = prompt('Enter the size');
    const color = prompt('Enter the Color');
    const divEl = document.createElement('div');
    const ulEl = document.createElement('ul')
    const li
    divEl.textContent = item;
    formEl.append(divEl)
})

