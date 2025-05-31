import { renderListWithTemplate, getLocalStorage } from "./utils.mjs";

function cartItemTemplate(item) {
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
</li>`;

  return newItem;
}

// export default class ShoppingCart {
//     constructor( listElement) {
//         // this.dataSource = dataSource;
//         this.listElement = listElement;
//     }

//     async init() {
//         const list = await getLocalStorage("so-cart");
//         renderListWithTemplate(cartItemTemplate,this.listElement,list);
//     }
// }

export default class ShoppingCart {
    constructor(listElement) {
        this.listElement = listElement;
        this.cartFooter = document.querySelector(".cart-footer"); 
        this.cartTotalValue = document.getElementById("cart-total-value");
    }

    async init() {
        const list = await getLocalStorage("so-cart");
        
        if (list.length === 0) {
            this.displayEmptyCartMessage();
            this.cartFooter.classList.add("hide"); // Hide footer
        } else {
            renderListWithTemplate(cartItemTemplate, this.listElement, list);
            this.updateCartTotal(list);
        }
    }

    updateCartTotal(cartItems) {
        const total = cartItems.reduce((sum, item) => sum + item.FinalPrice, 0);
        this.cartTotalValue.textContent = `${total.toFixed(2)}`;
        this.cartFooter.classList.remove("hide"); // Show footer
    }

    displayEmptyCartMessage() {
        this.listElement.innerHTML = `<p class="empty-cart">Your cart is empty. Start shopping!</p>`;
    }
}