const container = document.querySelector(".products-list");

const products = JSON.parse(localStorage.getItem("purchace-product"));
console.log(products);

products.forEach((item => {
    console.log(item);
}))

