import { getParam, loadHeaderFooter } from "./utils.mjs"; //removed setLocalStorage, getLocalStorage since addProductToCart is Removed
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

const dataSource = new ProductData("tents");

const productId = getParam("product");

const product = new ProductDetails(productId, dataSource);
loadHeaderFooter();
product.init();
