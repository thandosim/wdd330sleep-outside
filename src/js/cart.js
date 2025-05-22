import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import { loadHeaderFooter } from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const productListElement = document.querySelector(".product-list");
  
  // Check if cartItems exists, is an array, and has items
  if (cartItems && Array.isArray(cartItems) && cartItems.length > 0) {
    const htmlItems = cartItems.map((item, index) => cartItemTemplate(item, index));
    productListElement.innerHTML = htmlItems.join("");
    
    // Add event listeners to remove buttons
    document.querySelectorAll(".cart-card__remove").forEach(button => {
      button.addEventListener("click", removeFromCart);
    });
  } else {
    // Display a message when cart is empty
    productListElement.innerHTML = '<li class="cart-empty">Your cart is empty</li>';
  }
}

function cartItemTemplate(item, index) {
  // Make sure item and its properties exist before using them
  if (!item) return '';
  
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image || ''}"
      alt="${item.Name || 'Product'}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name || 'Product'}</h2>
  </a>
  <p class="cart-card__color">${item.Colors && item.Colors[0] ? item.Colors[0].ColorName : 'N/A'}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice || '0.00'}</p>
  <button class="cart-card__remove" data-index="${index}">X</button>
</li>`;
cartItems.init();
loadHeaderFooter();
// function renderCartContents() {
//   const cartItems = getLocalStorage("so-cart");
//   const htmlItems = cartItems.map((item) => cartItemTemplate(item));
//   document.querySelector(".product-list").innerHTML = htmlItems.join("");
// }

// function cartItemTemplate(item) {
//   const newItem = `<li class="cart-card divider">
//   <a href="#" class="cart-card__image">
//     <img
//       src="${item.Image}"
//       alt="${item.Name}"
//     />
//   </a>
//   <a href="#">
//     <h2 class="card__name">${item.Name}</h2>
//   </a>
//   <p class="cart-card__color">${item.Colors[0].ColorName}</p>
//   <p class="cart-card__quantity">qty: 1</p>
//   <p class="cart-card__price">$${item.FinalPrice}</p>
// </li>`;

//   return newItem;
// }

// renderCartContents();
