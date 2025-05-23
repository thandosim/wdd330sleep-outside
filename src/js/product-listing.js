import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { getParam, loadHeaderFooter, capitalizeWords } from "./utils.mjs";
const category = getParam('category');
const title = document.querySelector("#category");
title.textContent += `${capitalizeWords(category)}`
const listElement = document.querySelector(".product-list");
const dataSource = new ProductData();
const myList = new ProductList(
  category,
  dataSource,
  listElement,
);
loadHeaderFooter();
myList.init();
