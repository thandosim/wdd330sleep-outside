import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { getParam, loadHeaderFooter } from "./utils.mjs";
const category = getParam('category');
const listElement = document.querySelector(".product-list")
const dataSource = new ProductData();
const myList = new ProductList(
  category,
  dataSource,
  listElement,
);
loadHeaderFooter();
myList.init();
