const productsHeader = ["Art No", "size", "color", "MRP"];
const formEl = document.querySelector("form");
const addProductFormEL = document.querySelector(".modal-content form");
let isSecondClick = false;
let divRef = null;
const checkedValues = [];
let elements = [];
const container = document.getElementsByClassName(".products");
console.log(addProductFormEL);

//This is the closures method of passing arguments to callback function
const handleCart = (list, items) => {
  var data = list;
  var items = items;
  const sizeSet = [];
  const myStorage = JSON.parse(localStorage.getItem(list.artNo));
  return () => {
    // console.log(data);
    for (i = 0; i < items.length; i++) {
      if (items[i].checked) {
        sizeSet.push(items[i].value);
        myStorage.sizes.splice(myStorage.sizes.indexOf(items[i].value), 1);
        console.log(myStorage.sizes);
      }

      localStorage.setItem(
        list.artNo,
        JSON.stringify({
          artNo: list.artNo,
          sizes: myStorage.sizes,
          color: list.color,
          MRP: list.MRP,
        })
      );
    }
    const products = {
      artNo: list.artNo,
      sizes: sizeSet,
      color: list.color,
      MRP: list.MRP,
    };

    localStorage.setItem(
      "purchace-product",
      JSON.stringify([
        ...JSON.parse(localStorage.getItem("purchace-product") || "[]"),
        products,
      ])
    );
  };
};

formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  const div = document.createElement("div");
  const soldContainer = document.createElement("div");
  if (isSecondClick) {
    divRef.remove();
    soldContainerRef.remove();
    divRef = div;
    soldContainerRef = soldContainer;
  } else {
    divRef = div;
    soldContainerRef = soldContainer;
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

  for (i = 0; i <= 3; i++) {
    const li = document.createElement("li");
    li.textContent = Object.values(list)[i];
    ul.append(li);
  }
  document.body.append(div);

  let checkBox = null;
  let checkBoxList = [];
  for (i = 0; i < list.sizes.length; i++) {
    const label = document.createElement("label");
    label.textContent = list.sizes[i];
    checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.value = list.sizes[i];
    soldContainer.append(label, checkBox);
    checkBoxList.push(checkBox);
  }
  const soldButton = document.createElement("button");
  soldButton.textContent = "Sold";
  soldContainer.append(soldButton);
  document.body.append(soldContainer);
  // const buyItems = [...checkBox.checked.value];
  soldButton.addEventListener("click", handleCart(list, checkBoxList));
});

const addIcon = document.querySelector(".fa-circle-plus");
const removeIcon = document.querySelector(".fa-trash");
const containerEl = document.querySelector(".container");
const dropDown = document.querySelector(".dropdown-content");
const newItem = document.getElementById("new-item");
const existingItem = document.getElementById("existing-item");

//Code for Existing Item

existingItem.addEventListener("click", () => {

  toggleModal();
  const select = document.createElement('select');
  for(i = 0; i < addProductFormEL.children.length; i++) {
    elements[i] = addProductFormEL.children[i];
    const option = document.createElement('option');
    option.value = localStorage.getItem(addProductFormEL.artNo)
    addProductFormEL.replaceChild()
  }
});

//code for New Item
// newItem.addEventListener('click', (e) => {
//   console.log(e.target);
// })

const divEl = document.createElement("div");
const ulEl = document.createElement("ul");

addIcon.addEventListener("click", () => {
  dropDown.style.display = "block";
});
existingItem.addEventListener("click", (e) => {
  const modelContent = document.querySelector(".modal-content");
  const selectEl = document.createElement("select");
  const optionEl = document.createElement("option");
  selectEl.id = "artNo";
  selectEl.name = "myArt";
});

//copy code
let modal = document.querySelector(".modal");
let trigger = document.querySelector("#new-item");
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
    MRP: addProductFormEL.elements[9].value,
  };

  console.log(...productDetails.color);

  localStorage.setItem(productDetails.artNo, JSON.stringify(productDetails));
}
trigger.addEventListener("click", toggleModal);
closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);

addProductFormEL.addEventListener("submit", handleAddProducts);
