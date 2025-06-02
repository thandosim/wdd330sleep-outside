import { getLocalStorage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

// takes the items currently stored in the cart (localstorage) and returns them in a simplified form.
function packageItems(items) {
// convert the list of products from localStorage to the simpler form required for the checkout process.
// An Array.map would be perfect for this process.
    return items.map(item => ({
        id: item.Id, // Ensure correct property names
        name: item.Name,
        price: item.FinalPrice,
        quantity: item.Quantity || 1 // Default to 1 if undefined
    }));
}

// takes a form element and returns an object where the key is the "name" of the form input.
function formDataToJSON(formElement) {
  const formData = new FormData(formElement),
    convertedJSON = {};

  formData.forEach(function (value, key) {
    convertedJSON[key] = value;
  });

  return convertedJSON;
}

export default class CheckoutProcess {
    constructor(key, outputSelector) {
        this.key = key;
        this.outputSelector = outputSelector;
        this.list = [];
        this.itemTotal = 0;
        this.shipping = 0;
        this.taxRate = 0.06; 
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
                if (zipInput.value.length === 5) { 
                    this.displayOrderTotals();
                    orderSummary.classList.remove("hide");
                } else {
                    orderSummary.classList.add("hide"); 
                }

            });
        }

    }

    calculateItemSubTotal() {
        this.itemTotal = this.list.reduce((sum, item) => sum + item.FinalPrice, 0);
    }

    calculateOrderTotal() {
        const tax = this.itemTotal * this.taxRate;

        const itemCount = this.list.length;
        this.shipping = itemCount > 0 ? 10 + (itemCount - 1) * 2 : 0;

        this.orderTotal = this.itemTotal + tax + this.shipping;

        this.displayOrderTotals(tax);
    }

    displayOrderTotals(tax) {
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

    async checkout(form) {
    // get the form element data by the form name
    // convert the form data to a JSON order object using the formDataToJSON function
    // populate the JSON order object with the order Date, orderTotal, tax, shipping, and list of items
    // call the checkout method in the ExternalServices module and send it the JSON order data.

        // const formData = new FormData(form);
        try {

            const orderData = formDataToJSON(form);
        
            orderData.orderDate = new Date().toISOString();
            orderData.orderTotal = this.orderTotal.toFixed(2);
            orderData.tax = (this.itemTotal * this.taxRate).toFixed(2);
            orderData.shipping = this.shipping.toFixed(2);
            orderData.items = packageItems(this.list);

            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(orderData),
            };

            
            const response = await fetch("https://wdd330-backend.onrender.com/checkout", options);
        } catch(err) { 
            console.error("Checkout error:", err);
            alert("There was an issue with your order. Please try again.");
        }
        
        
        
    }
}

