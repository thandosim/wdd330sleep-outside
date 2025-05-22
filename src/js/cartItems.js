import { getLocalStorage } from "./utils.mjs";

export function cartItemTemplate(item) {
    `<p class="item-${item.Id}">${item.NameWithoutBrand} Quantity <span>${getLocalStorage(item.NameWithoutBrand)}<span></p>`
};

export default class displayCartItem {
    constructor(product) {
        this.product = product;
    }

    renderWithTemplate() {
        re
    }
};