import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  // Check if cartItems exists and is an array
  if (cartItems && Array.isArray(cartItems)) {
    const htmlItems = cartItems.map((item, index) => cartItemTemplate(item, index));
    document.querySelector(".product-list").innerHTML = htmlItems.join("");
    
    // Add event listeners to remove buttons
    document.querySelectorAll(".cart-card__remove").forEach(button => {
      button.addEventListener("click", removeFromCart);
    });
  } else {
    document.querySelector(".product-list").innerHTML = "";
  }
}

function cartItemTemplate(item, index) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
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

renderCartContents();
