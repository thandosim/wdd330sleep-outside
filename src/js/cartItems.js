import { getLocalStorage } from "./utils.mjs";

export default function cartItemTemplate(item) {
   return `<p class="item-${item.Id}">${item.NameWithoutBrand} <span>Quantity ${getLocalStorage(item.Name)}<span></p>`
};