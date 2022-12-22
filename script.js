// Headers for products
const productsHeader = ["Art No", "size", "color", "MRP"];

//Getting the product search form
const formEl = document.querySelector("form");

// Getting Modal content form
const addProductFormEL = document.querySelector(".modal-content form");

//To remove the available product list when the user checks for the second input
let isSecondClick = false;
let divRef = null;

//Getting the modal
let modal = document.querySelector(".modal");

//Getting the modal for existing Item
let existingModal = document.getElementById("existing-modal");

//Getting New Item
let newItem = document.querySelector("#new-item");

//Getting close btn of the New Item modal
let closeButton = document.querySelector(".close-button");

//Getting the close btn of the Existing Item modal
let existingCloseBtn = document.querySelector(".existing-close-button");

//Add Product Icon
const addIcon = document.querySelector(".fa-circle-plus");

//delete items icon
const removeIcon = document.querySelector(".fa-trash");

//product search container
const containerEl = document.querySelector(".container");

//Add Icon drop down
const dropDown = document.querySelector(".dropdown-content");

// const newItem = document.getElementById("new-item");
const existingItem = document.getElementById("existing-item");

//To update the Existing Item only once
let isSecondCall = false;

//division of existing Item element of Existing Item Modal
const selectDiv = document.querySelector(".existingItem-select");

//  * Getting Available products from the localStorage
//  ! It returns products list in array format
function getAvailableProducts(item) {
  return JSON.parse(localStorage.getItem(item));
}

// * This is the closures method of passing arguments to callback function
//Handling add to cart event
const handleCart = (list, items) => {
  console.log("sold button is clicked");
  var data = list;
  console.log(data);
  var items = items;
  const addToCart = [];
  const availableSizes = [];
  const myStorage = getAvailableProducts("products");
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

//submiting the product search form
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

  const list = getAvailableProducts("products");
  console.log("available products in the local storage", list);
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
        li.textContent = listArr[j];
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
      soldButton.addEventListener("click", handleCart(listArr, checkBoxList));
    }
  }
});

//Add Icon drop down toggle code
addIcon.addEventListener("click", () => {
  dropDown.classList.toggle("dropdown-content-show");
});

//Close the dropdown menu if the user clicks outside of it
window.onclick = (e) => {
  if (!e.target.matches(".fa-circle-plus")) {
    dropDown.classList.remove("dropdown-content-show");
  }
};

//updating Existing Item dropdown
//TODO : see the working of existing Items
function updateExistingItem() {
  const selectEl = document.createElement("select");
  const labelEl = document.createElement("label");
  labelEl.textContent = "ArtNo";
  const data = getAvailableProducts("products");
  try {
    for (i = 0; i < data.length; i++) {
      const optionEl = document.createElement("option");
      optionEl.textContent = data[i].artNo;
      optionEl.value = data[i].artNo;
      selectEl.append(optionEl);
    }
  } catch (error) {
    alert("There is No Item in your List");
    console.log(error.name);
  }
  selectDiv.replaceChildren(labelEl, selectEl);
}

//copy code
function toggleModal(e) {
  if (e.target === existingItem) {
    if (!isSecondCall) {
      updateExistingItem();
      isSecondCall = true;
    }
    existingModal.classList.toggle("show-modal");
  } else if (e.target === newItem) {
    modal.classList.toggle("show-modal");
  } else {
    existingModal.classList.remove("show-modal");
    modal.classList.remove("show-modal");
  }
}
function windowOnClick(e) {
  if (e.target === modal || e.target === existingModal) {
    toggleModal();
  }
}

//Handling New Item added event
function handleAddProducts(event) {
  event.preventDefault();
  //To get the checked values of the checkbox
  const checkedValues = [];
  //product object
  let productDetails = null;
  // console.log(addProductFormEL.elements[0].value);

  const sizesList = [...addProductFormEL.elements.sizes];

  sizesList.forEach((size) => {
    if (size.checked === true) {
      checkedValues.push(size.value);
    }
  });

  const availableProducts = getAvailableProducts("products");
  // checks whether there is any products available in the storage
  if (availableProducts) {
    console.log("calling main if");
    for (i = 0; i < availableProducts.length; i++) {
      //checks whether the new item already present in the storage
      if (availableProducts[i].artNo === addProductFormEL.elements[0].value) {
        //checks whether the new Item and its color present in the storage
        if (
          availableProducts[i].color_size[0].color ===
          addProductFormEL.elements[8].value
        ) {
          console.log("calling color if");
          alert("product already exists");
          break;
        }
        // if the color is different with same artNo then we have to add the coresponding size set to the color in storage
         else {
          console.log("calling color else");
          console.log(availableProducts);
          // availableProducts.splice(i, 1);
          availableProducts[i].color_size.push({
            color: addProductFormEL.elements[8].value,
            sizes: checkedValues,
          });
          localStorage.removeItem("products");

          localStorage.setItem("products", JSON.stringify(availableProducts));
          break;
        }
      }
    }

    //if no item matches the above condition and ends the for loop without break
    if (i === availableProducts.length) {
      console.log("calling end of for");
      productDetails = {
        artNo: addProductFormEL.elements[0].value,
        color_size: [
          { color: addProductFormEL.elements[8].value, size: checkedValues },
        ],
        MRP: addProductFormEL.elements[9].value,
      };

      localStorage.setItem(
        "products",
        JSON.stringify([
          ...JSON.parse(localStorage.getItem("products") || "[]"),
          productDetails,
        ])
      );
    }
  }
  //if there is no product exists in the localstorage then adding as new item
   else {
    console.log("main else");
    productDetails = {
      artNo: addProductFormEL.elements[0].value,
      color_size: [
        { color: addProductFormEL.elements[8].value, size: checkedValues },
      ],
      MRP: addProductFormEL.elements[9].value,
    };

    localStorage.setItem(
      "products",
      JSON.stringify([
        ...JSON.parse(localStorage.getItem("products") || "[]"),
        productDetails,
      ])
    );
  }

  addProductFormEL.reset();
  updateExistingItem();
}

newItem.addEventListener("click", toggleModal);
existingItem.addEventListener("click", toggleModal);
closeButton.addEventListener("click", toggleModal);
// TODO: There is a bug in existing Item close button please fix the bug
existingCloseBtn.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);
addProductFormEL.addEventListener("submit", handleAddProducts);
