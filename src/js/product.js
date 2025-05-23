import { getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

const dataSource = new ProductData("tents");
const productID = getParam("product");

console.log("Product ID from URL:", productID);

if (!productID) {
  // Gracefully handle missing product ID
  document.querySelector("main").innerHTML = "<p>No product specified.</p>";
} else {
  const product = new ProductDetails(productID, dataSource);
  product.init();
}
