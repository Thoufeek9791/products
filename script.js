

const formEl = document.querySelector('form');
const addProductFormEL = document.querySelector('.modal-content form');
console.log(addProductFormEL);


formEl.addEventListener('submit', (e) => {
    e.preventDefault(); 
    const list = JSON.parse(localStorage.getItem(formEl.productsearch.value));
    console.log(list);
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

function handleAddProducts(event) {
  event.preventDefault();
  console.log(addProductFormEL.elements);
  console.log(addProductFormEL.elements[0].value);

  

  localStorage.setItem( addProductFormEL.elements[0].value, 
    JSON.stringify([addProductFormEL.elements[0].value,
      addProductFormEL.elements[1].value, addProductFormEL.elements[2].value, addProductFormEL.elements[3].value])
  );

}
trigger.addEventListener("click", toggleModal);
closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);

addProductFormEL.addEventListener('submit', handleAddProducts);


