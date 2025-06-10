import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

// Load header and footer
loadHeaderFooter();

// Initialize checkout process with local storage key & output selector
const checkout = new CheckoutProcess("so-cart", ".order-summary");
checkout.init();

// Validate checkout form before submission
const form = document.getElementById("checkout-form");
form.addEventListener("submit", function (event) {
  event.preventDefault();
  const check_status = this.checkValidity();
  this.reportValidity();
  if (check_status) checkout.checkout(this);
});
