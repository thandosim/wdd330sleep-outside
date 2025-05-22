import { getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";


const productId = getParam("product");
const dataSource = new ProductData("tents");

const cartContainer = document.querySelector(".cartItems");

const product = new ProductDetails(productId, dataSource, cartContainer);
product.init();

const clearCartButton = document.querySelector(".clearCart");
clearCartButton.addEventListener("click", () => {
    cartContainer.innerHTML = "";
    localStorage.clear()
});


