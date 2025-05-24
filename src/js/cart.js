import { getLocalStorage } from "./utils.mjs";

// Template for each cart item, now includes quantity controls and updates price dynamically
function cartItemTemplate(item) {
  const quantity = item.Quantity || 1;
  const newItem = `<li class="cart-card divider" data-id="${item.Id}">
    <a href="#" class="cart-card__image">
      <img src="${item.Image}" alt="${item.Name}" />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <div class="cart-card__quantity">
      <button class="qty-btn decrease" data-id="${item.Id}">-</button>
      <input type="number" min="1" class="qty-input" data-id="${item.Id}" value="${quantity}" />
      <button class="qty-btn increase" data-id="${item.Id}">+</button>
    </div>
    <p class="cart-card__price">$${(item.FinalPrice * quantity).toFixed(2)}</p>
    <button class="remove-item" data-id="${item.Id}">X</button>
  </li>`;
  return newItem;
}

// Function to remove an item from cart on clicking the X button
function removeItem() {
  const removeButtons = document.querySelectorAll(".remove-item");
  removeButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const itemId = e.target.dataset.id; // string id
      let cartItems = getLocalStorage("so-cart") || [];
      const updatedCart = cartItems.filter((item) => item.Id !== itemId);
      localStorage.setItem("so-cart", JSON.stringify(updatedCart));
      renderCartContents(); // Refresh display
    });
  });
}

// Increase or decrease quantity by 1 on +/- buttons
function updateQuantity(itemId, change) {
  let cartItems = getLocalStorage("so-cart") || [];
  const item = cartItems.find(i => i.Id === itemId);
  if (!item) return;
  item.Quantity = (item.Quantity || 1) + change;
  if (item.Quantity < 1) item.Quantity = 1; // Minimum quantity is 1
  localStorage.setItem("so-cart", JSON.stringify(cartItems));
  renderCartContents();
}

// Set quantity to specific value from input field
function setQuantity(itemId, quantity) {
  let cartItems = getLocalStorage("so-cart") || [];
  const item = cartItems.find(i => i.Id === itemId);
  if (!item) return;
  item.Quantity = quantity < 1 ? 1 : quantity; // Validate quantity >= 1
  localStorage.setItem("so-cart", JSON.stringify(cartItems));
  renderCartContents();
}

// Setup event listeners for quantity change buttons and input fields
function setupQuantityListeners() {
  document.querySelectorAll(".qty-btn.decrease").forEach(button => {
    button.addEventListener("click", () => {
      updateQuantity(button.dataset.id, -1);
    });
  });

  document.querySelectorAll(".qty-btn.increase").forEach(button => {
    button.addEventListener("click", () => {
      updateQuantity(button.dataset.id, 1);
    });
  });

  document.querySelectorAll(".qty-input").forEach(input => {
    input.addEventListener("change", () => {
      let newQty = parseInt(input.value);
      if (isNaN(newQty) || newQty < 1) newQty = 1;
      setQuantity(input.dataset.id, newQty);
    });
  });
}

// Render all cart items and attach event listeners
function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
  removeItem();          // Attach remove button listeners
  setupQuantityListeners();  // Attach quantity controls listeners
}

// Initial call to render the cart on page load
renderCartContents();