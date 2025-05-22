import { getLocalStorage, setLocalStorage } from "./utils.mjs";

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

  return newItem;
}

function removeFromCart(e) {
  const index = parseInt(e.target.dataset.index);
  let cart = getLocalStorage("so-cart");
  
  if (cart && Array.isArray(cart)) {
    // Remove the item at the specified index
    cart.splice(index, 1);
    
    // Update localStorage
    setLocalStorage("so-cart", cart);
    
    // Re-render the cart
    renderCartContents();
  }
}

// Add some CSS for the empty cart message
const style = document.createElement('style');
style.textContent = `
  .cart-empty {
    text-align: center;
    padding: 2rem;
    font-size: 1.2rem;
    color: var(--dark-grey);
  }
`;
document.head.appendChild(style);

renderCartContents();
