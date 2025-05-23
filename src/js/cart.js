import { getLocalStorage } from "./utils.mjs";

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img src="${item.Image}" alt="${item.Name}" />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
    <button class="remove-item" data-id="${item.Id}">X</button>
  </li>`;
  return newItem;
}

function removeItem() {
  const removeButtons = document.querySelectorAll(".remove-item");
  removeButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const itemId = e.target.dataset.id; // ✅ keep it as a string
      let cartItems = getLocalStorage("so-cart") || [];
      const updatedCart = cartItems.filter((item) => item.Id !== itemId); // ✅ string comparison
      localStorage.setItem("so-cart", JSON.stringify(updatedCart));
      renderCartContents(); // Refresh display
    });
  });
}

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
  removeItem(); // ✅ Attach event listeners to remove buttons
}

renderCartContents(); // Initial render
