// Headers for products
const productsHeader = ["Art No", "size", "color", "MRP"];
//Getting the Main Form
const formEl = document.querySelector("form");

// Getting Modal content form
const addProductFormEL = document.querySelector(".modal-content form");
//To remove the available product list when the user checks for the second input
let isSecondClick = false;
let divRef = null;
//To get the checked values of the checkbox
const checkedValues = [];
let elements = [];
//To add availabe pmroducts to this div
const container = document.getElementsByClassName(".products");
console.log(addProductFormEL);

//This is the closures method of passing arguments to callback function
const handleCart = (list, items) => {
  console.log("sold button is clicked");
  var data = list;
  console.log(data);
  var items = items;
  const addToCart = [];
  const availableSizes = [];
  const myStorage = JSON.parse(localStorage.getItem("products"));
  console.log(myStorage);
  return () => {
    console.log(data);
    for (i = 0; i < items.length; i++) {
      if (items[i].checked) {
        addToCart.push(items[i].value);
        // myStorage.sizes.splice(myStorage.sizes.indexOf(items[i].value), 1);
        // console.log(myStorage.sizes);
      } else {
        availableSizes.push(items[i].value);
      }

      // localStorage.setItem(
      //   "products",
      //   JSON.stringify([
      //     ...JSON.parse(localStorage.getItem("purchace-product") || "[]"),
      //     products,
      //   ])
      // );
    }

    console.log("checked sizes ", addToCart);
    console.log("Unchecked Sizes: ", availableSizes);
    // const products = {
    //   artNo: list.artNo,
    //   sizes: addToCart,
    //   color: list.color,
    //   MRP: list.MRP,
    // };

    // localStorage.setItem(
    //   "purchace-product",
    //   JSON.stringify([
    //     ...JSON.parse(localStorage.getItem("purchace-product") || "[]"),
    //     products,
    //   ])
    // );
  };
};

formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  //adding available products to the div
  const div = document.createElement("div");
  //To display the sold checkbox
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

  const list = JSON.parse([localStorage.getItem("products")]);
  console.log(list);
  // const availabeListArr = [...list];
  // console.log(availabeListArr);
  console.log(list[0].artNo);
  console.log(formEl.productsearch.value);

  for (let i = 0; i < list.length; i++) {
    console.log("Inside list for loop");
    if (list[i].artNo === formEl.productsearch.value) {
      console.log("Inside list if");

      const listArr = Object.values(list[i]);
      console.log(listArr[1].length);
      div.classList.add("products-list");
      const ul = document.createElement("ul");
      for (i = 0; i <= 3; i++) {
        const li = document.createElement("li");
        li.textContent = productsHeader[i];
        ul.append(li);
      }
      div.append(ul);

      for (j = 0; j <= 3; j++) {
        const li = document.createElement("li");
        // li.textContent = Object.values(list[i])[i];
        li.textContent = listArr[j];
        // li.textContent = list[i][j]
        ul.append(li);
      }
      document.body.append(div);

      let checkBox = null;
      let checkBoxList = [];
      for (j = 0; j < listArr[1].length; j++) {
        console.log("Inside Checkbox");
        const label = document.createElement("label");
        label.textContent = listArr[1][j];
        checkBox = document.createElement("input");
        checkBox.type = "checkbox";
        checkBox.value = listArr[1][j];
        soldContainer.append(label, checkBox);
        checkBoxList.push(checkBox);
      }
      const soldButton = document.createElement("button");
      soldButton.textContent = "Sold";
      soldContainer.append(soldButton);
      document.body.append(soldContainer);
      // const buyItems = [...checkBox.checked.value];
      soldButton.addEventListener("click", handleCart(listArr, checkBoxList));
    }
  }
});

const addIcon = document.querySelector(".fa-circle-plus");
const removeIcon = document.querySelector(".fa-trash");
const containerEl = document.querySelector(".container");
const dropDown = document.querySelector(".dropdown-content");
// const newItem = document.getElementById("new-item");
const existingItem = document.getElementById("existing-item");

//Code for Existing Item

existingItem.addEventListener("click", () => {});

//code for New Item
// newItem.addEventListener('click', (e) => {
//   console.log(e.target);
// })

const divEl = document.createElement("div");
const ulEl = document.createElement("ul");

//Add products drop down code
addIcon.addEventListener("click", () => {
  dropDown.classList.toggle("dropdown-content-show");
});

//Close the dropdown menu if the user clicks outside of it
window.onclick = (e) => {
  if (!e.target.matches(".fa-circle-plus")) {
    dropDown.classList.remove("dropdown-content-show");
  }
};

//copy code
let modal = document.querySelector(".modal");
let existingModal = document.getElementById("existing-modal");
let newItem = document.querySelector("#new-item");
let closeButton = document.querySelector(".close-button");
let existingCloseBtn = document.querySelector(".existing-close-button");
console.log(existingCloseBtn);
function toggleModal(e) {
  console.log(e.target);
  if (e.target === existingItem) {
    const data = JSON.parse(localStorage.getItem("products"));
    const selectEl = document.getElementById("available-artNo");
    for (i = 0; i < data.length; i++) {
      const optionEl = document.createElement("option");
      optionEl.textContent = data[i].artNo;
      optionEl.value = data[i].artNo;
      selectEl.append(optionEl);
    }
    existingModal.classList.toggle("show-modal");
  } else if (e.target === newItem) {
    modal.classList.toggle("show-modal");
  } else {
    existingModal.classList.remove("show-modal");
    modal.classList.remove("show-modal");
  }
}
function windowOnClick(event) {
  if (event.target === modal) {
    toggleModal();
  }
}

//code for NewItem

function handleAddProducts(event) {
  event.preventDefault();
  console.log(addProductFormEL.elements);
  // console.log(addProductFormEL.elements[0].value);
  console.log(addProductFormEL.elements.sizes);

  const sizesList = [...addProductFormEL.elements.sizes];
  console.log("size list", sizesList);

  sizesList.forEach((size) => {
    if (size.checked === true) {
      checkedValues.push(size.value);
    }
    console.log("checked values", checkedValues);
  });

  const productDetails = {
    artNo: addProductFormEL.elements[0].value,
    sizes: checkedValues,
    color: addProductFormEL.elements[8].value,
    MRP: addProductFormEL.elements[9].value,
  };

  console.log(...productDetails.color);

  // Adding New Product to lacal storage
  // localStorage.setItem(, JSON.stringify(productDetails));

  localStorage.setItem(
    "products",
    JSON.stringify([
      ...JSON.parse(localStorage.getItem("products") || "[]"),
      productDetails,
    ])
  );
}
newItem.addEventListener("click", toggleModal);
existingItem.addEventListener("click", toggleModal);
closeButton.addEventListener("click", toggleModal);
existingCloseBtn.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);

addProductFormEL.addEventListener("submit", handleAddProducts);
