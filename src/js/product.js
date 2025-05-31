import { getParam, loadHeaderFooter } from "./utils.mjs"; //removed setLocalStorage, getLocalStorage since addProductToCart is Removed
import ExternalServices from "./ExternalServices.mjs";
import ProductDetails from "./ProductDetails.mjs";

const dataSource = new ExternalServices("tents");

const productId = getParam("product");

const product = new ProductDetails(productId, dataSource);
loadHeaderFooter();
product.init();
