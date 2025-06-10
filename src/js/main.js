import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter } from "./utils.mjs";
loadHeaderFooter();
const dataSource = new ExternalServices("tents");
const productList = new ProductList(
  "tents",
  dataSource,
  document.querySelector(".product-list"),
);
// loadHeaderFooter();
productList.init();
