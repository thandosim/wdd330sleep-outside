import ProductData from "./ProductData.mjs";
import ProductList from "./js/ProductList.mjs";

const dataSource = new ProductData("tents");
const productList = new ProductList("tents", dataSource, document.querySelector(".productList"));
productList.init();
