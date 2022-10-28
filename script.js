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

  const list = JSON.parse(localStorage.getItem(formEl.productsearch.value));

  div.classList.add("products-list");
  // const divChild = document.createElement("div");
  const ul = document.createElement("ul");
  for (i = 0; i <= 3; i++) {
    const li = document.createElement("li");
    li.textContent = productsHeader[i];
    ul.append(li);
    // const value = document.createElement('li');
    // value.textContent = list[i];
    // ul.append(value)
  }
  div.append(ul);
  // const ulMain = document.createElement("ul");

  list.forEach((spec) => {
    const li = document.createElement("li");
    li.textContent = spec;
    ul.append(li);
  });
  // // div.append(divChild);
  // div.append(ulMain);
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

  console.log(checkedValues);

  localStorage.setItem(
    addProductFormEL.elements[0].value,
    JSON.stringify([
      addProductFormEL.elements[0].value,
      checkedValues,
      addProductFormEL.elements[2].value,
      addProductFormEL.elements[3].value,
    ])
  );
}
trigger.addEventListener("click", toggleModal);
closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);

addProductFormEL.addEventListener("submit", handleAddProducts);
