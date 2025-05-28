import { getLocalStorage } from "./utils.mjs";

export default class CheckoutProcess {
    constructor(key, outputSelector) {
        this.key = key;
        this.outputSelector = outputSelector;
        this.list = [];
        this.itemTotal = 0;
        this.shipping = 0;
        this.taxRate = 0.06; // 6% tax
        this.orderTotal = 0;
    }

    init() {
        this.list = getLocalStorage(this.key) || [];
        this.calculateItemSubTotal();
        this.calculateOrderTotal();

        const zipInput = document.getElementById("zip");
        const orderSummary = document.querySelector(this.outputSelector);
        if (zipInput) {
            zipInput.addEventListener("input", () => {
                if (zipInput.value.length === 5) { // Assuming a 5-digit ZIP code
                    this.displayOrderTotals();
                    orderSummary.classList.remove("hide");
                } else {
                    orderSummary.classList.add("hide"); // Hide if invalid
                }

            });
        }

    }

    calculateItemSubTotal() {
        // Calculate subtotal from cart items
        this.itemTotal = this.list.reduce((sum, item) => sum + item.FinalPrice, 0);
    }

    calculateOrderTotal() {
        // Calculate tax
        const tax = this.itemTotal * this.taxRate;

        // Calculate shipping: $10 for the first item, $2 for each additional item
        const itemCount = this.list.length;
        this.shipping = itemCount > 0 ? 10 + (itemCount - 1) * 2 : 0;

        // Calculate final order total
        this.orderTotal = this.itemTotal + tax + this.shipping;

        // Display totals
        this.displayOrderTotals(tax);
    }

    displayOrderTotals(tax) {
        // Select elements and update values
        // const orderSummary = document.querySelector(this.outputSelector);
        const subtotalElem = document.querySelector(`${this.outputSelector} #subtotal`);
        const taxElem = document.querySelector(`${this.outputSelector} #tax`);
        const shippingElem = document.querySelector(`${this.outputSelector} #shipping`);
        const totalElem = document.querySelector(`${this.outputSelector} #order-total`);

        if (subtotalElem && taxElem && shippingElem && totalElem) {
            subtotalElem.innerText = `${this.itemTotal.toFixed(2)}`;
            taxElem.innerText = `${tax.toFixed(2)}`;
            shippingElem.innerText = `${this.shipping.toFixed(2)}`;
            totalElem.innerText = `${this.orderTotal.toFixed(2)}`;
        }

        // if (orderSummary) {
        //     // orderSummary.classList.remove("hide");
        // }

    }
}