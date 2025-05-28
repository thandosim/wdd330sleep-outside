import { loadHeaderFooter, getLocalStorage } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

// Load header and footer
loadHeaderFooter();

// Initialize checkout process with local storage key & output selector
const checkout = new CheckoutProcess("so-cart", ".order-summary");
checkout.init();

// Validate checkout form before submission
document.getElementById("checkout-form").addEventListener("submit", function(event) {
    if (!this.checkValidity()) {
        alert("Please fill out all fields correctly before placing the order.");
        event.preventDefault(); // Prevent form submission
    }
});