import {getParams } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from './ProductDetails.mjs';


const productId = getParam('product');
const product = new ProductDetails(productId, dataSource);
product.init();
const dataSource = new ProductData("tents");




// add listener to Add to Cart button
