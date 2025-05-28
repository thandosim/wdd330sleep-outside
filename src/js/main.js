import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

const dataSource = new ProductData("tents");
const productList = new ProductList("tents", dataSource, document.querySelector(".product-list"));
productList.init();

function renderProduct(product) {
  const isDiscounted = product.FinalPrice < product.SuggestedRetailPrice;
  const discountPercent = isDiscounted
    ? Math.round(
        ((product.SuggestedRetailPrice - product.FinalPrice) /
          product.SuggestedRetailPrice) *
          100
      )
    : 0;

  return `
    <li class="product-item">
      <img src="${product.Image}" alt="${product.Name}" />
      <h3>${product.Name}</h3>
      <p>
        <span class="final-price">$${product.FinalPrice.toFixed(2)}</span>
        ${
          isDiscounted
            ? `<span class="suggested-price">$${product.SuggestedRetailPrice.toFixed(
                2
              )}</span>
               <span class="discount-badge">${discountPercent}% OFF</span>`
            : ""
        }
      </p>
    </li>
  `;
}
