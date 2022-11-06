const container = document.createElement("div");
container.classList.add("product-list");

document.body.append(container);

const products = JSON.parse(localStorage.getItem("purchace-product"));
console.log(products);
const label = ["artNo", "sizes", "color", "MRP"];

label.forEach((list) => {
  const span = document.createElement("span");
  span.textContent = list;
  container.append(span);
});

products.forEach((item) => {
  for (let i = 0; i < label.length; i++) {
    const key = label[i];
    const span = document.createElement("span");
    span.textContent = item[key];
    container.append(span);
  }
});
