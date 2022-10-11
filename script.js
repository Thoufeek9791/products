

const formEl = document.querySelector('form');
// console.log(formEl);


formEl.addEventListener('submit', (e) => {
    e.preventDefault(); 
    // console.log(formEl.productsearch.value);
})

const addIcon = document.querySelector('.fa-circle-plus');
const removeIcon = document.querySelector('.fa-trash');
const containerEl = document.querySelector('.container')

const divEl = document.createElement('div');
const ulEl = document.createElement('ul');





//copy code
let modal = document.querySelector(".modal");
let trigger = document.querySelector(".fa-circle-plus");
let closeButton = document.querySelector(".close-button");
function toggleModal() {
  modal.classList.toggle("show-modal");
}
function windowOnClick(event) {
  if(event.target === modal) {
    toggleModal();
  }
}
trigger.addEventListener("click", toggleModal);
closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);

