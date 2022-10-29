const productsHeader = ["Art No", "size", "color", "MRP"];
const formEl = document.querySelector("form");
const addProductFormEL = document.querySelector(".modal-content form");
let isSecondClick = false;
let divRef = null;
const checkedValues = [];
console.log(addProductFormEL);

const refresh = () => {};

formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  const div = document.createElement("div");
  if (isSecondClick) {
    divRef.remove();
    divRef = div;
  } else {
    divRef = div;
    isSecondClick = true;
  }

  const list = JSON.parse([localStorage.getItem(formEl.productsearch.value)]);
  console.log(list);

  div.classList.add("products-list");
  const ul = document.createElement("ul");
  for (i = 0; i <= 3; i++) {
    const li = document.createElement("li");
    li.textContent = productsHeader[i];
    ul.append(li);
  }
  div.append(ul);

  for(i = 0; i <= 3; i++) {
    const li = document.createElement("li");
    li.textContent = Object.values(list)[i];
    ul.append(li)
  }
  document.body.append(div);
});

const addIcon = document.querySelector(".fa-circle-plus");
const removeIcon = document.querySelector(".fa-trash");
const containerEl = document.querySelector(".container");

const divEl = document.createElement("div");
const ulEl = document.createElement("ul");

//copy code
let modal = document.querySelector(".modal");
let trigger = document.querySelector(".fa-circle-plus");
let closeButton = document.querySelector(".close-button");
function toggleModal() {
  modal.classList.toggle("show-modal");
}
function windowOnClick(event) {
  if (event.target === modal) {
    toggleModal();
  }
}

function handleAddProducts(event) {
  event.preventDefault();
  console.log(addProductFormEL.elements);
  // console.log(addProductFormEL.elements[0].value);
  console.log(addProductFormEL.elements.sizes);

  const sizesList = [...addProductFormEL.elements.sizes];
  console.log(sizesList);

  sizesList.forEach((size) => {
    if (size.checked === true) {
      checkedValues.push(size.value);
    }
  });

  
  const productDetails = {
    artNo: addProductFormEL.elements[0].value,
    sizes: checkedValues,
    color: addProductFormEL.elements[8].value,
    MRP: addProductFormEL.elements[9].value
  }

  console.log(...productDetails.color);

  localStorage.setItem(
    productDetails.artNo,
    JSON.stringify(productDetails)
  );
}
trigger.addEventListener("click", toggleModal);
closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);

addProductFormEL.addEventListener("submit", handleAddProducts);
