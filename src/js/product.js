import { getParam } from "./utils.mjs"; //removed setLocalStorage, getLocalStorage since addProductToCart is Removed
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

const dataSource = new ProductData("tents");

const productId = getParam("product");

const product = new ProductDetails(productId, dataSource);
product.init();

// console.log(dataSource.findProductById(productId));
// const testing = dataSource.findProductById(productId);
// setLocalStorage("testing1", testing);

// function addProductToCart(product) { //function moved to ProductDetails.mjs
//   let cartItems = getLocalStorage("so-cart") || [];
//   cartItems.push(product);
//   setLocalStorage("so-cart", cartItems);
// }
// add to cart button event handler
// async function addToCartHandler(e) {
//   const product = await dataSource.findProductById(e.target.dataset.id);
//   addProductToCart(product);
// }

// // add listener to Add to Cart button
// document
//   .getElementById("addToCart")
//   .addEventListener("click", addToCartHandler);
