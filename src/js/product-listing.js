import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import { getParam, loadHeaderFooter, capitalizeWords } from "./utils.mjs";

loadHeaderFooter();

const category = getParam("category");
const title = document.querySelector("#category");
title.textContent = `${capitalizeWords(category)}`;

const listElement = document.querySelector(".product-list");
const dataSource = new ExternalServices();
const myList = new ProductList(category, dataSource, listElement);

myList.init();
