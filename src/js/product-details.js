import { getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import { setLocalStorage } from "./utils.mjs";

// Get the product id from the URL
const productId = getParam("product");
const dataSource = new ProductData("tents");

async function loadProductDetails() {
  const product = await dataSource.findProductById(productId);
  
  if (product) {
    renderProductDetails(product);
    
    // Add event listener to Add to Cart button
    document.getElementById("addToCart").addEventListener("click", () => {
      addProductToCart(product);
    });
  } else {
    document.querySelector(".product-detail").innerHTML = 
      "<p>Product not found. Please return to the <a href='/'>home page</a>.</p>";
  }
}

function renderProductDetails(product) {
  document.querySelector(".product-detail h3").textContent = product.Brand.Name;
  document.querySelector(".product-detail h2").textContent = product.NameWithoutBrand;
  document.querySelector(".product-detail img").src = product.Image;
  document.querySelector(".product-detail img").alt = product.Name;
  document.querySelector(".product-card__price").textContent = `$${product.FinalPrice}`;
  document.querySelector(".product__color").textContent = product.Colors[0].ColorName;
  
  // Use innerHTML instead of textContent for the description to render HTML properly
  document.querySelector(".product__description").innerHTML = product.DescriptionHtmlSimple;
  
  document.getElementById("addToCart").dataset.id = product.Id;
}

function addProductToCart(product) {
  let cart = JSON.parse(localStorage.getItem("so-cart")) || [];
  if (!Array.isArray(cart)) {
    cart = [cart];
  }
  cart.push(product);
  setLocalStorage("so-cart", cart);
}

loadProductDetails();
