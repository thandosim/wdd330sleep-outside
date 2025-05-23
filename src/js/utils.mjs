import ProductData from "./ProductData.mjs";

// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// Function to get URL parameter by name
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

//get the product parameters
// export function getParam(param) {
//   const queryString = window.location.search;
//   const urlParams = new URLSearchParams(queryString);
//   const product = urlParams.get("product");
//   return product;
// }

export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = false) {
  if (clear=true) {
    parentElement.innerHTMl = ``;
  } 
  const htmlStrings = list.map(templateFn);
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.innerHTML = template;
  if(callback) {
    callback(data);
  }
}

export async function loadTemplate(path) {
  const res = await fetch(path);
  const template = await res.text();
  return template;
}

export async function loadHeaderFooter() {
  console.log("Loading header and footer...");
  
  const headerTemplate = await loadTemplate("/partials/header.html");
  const headerElement = document.getElementById("main-header");
  if (headerElement) {
    console.log("Header element found, rendering template");
    renderWithTemplate(headerTemplate, headerElement);
  } else {
    console.error("Header element not found with ID 'main-header'");
  }

  const footerTemplate = await loadTemplate("/partials/footer.html");
  const footerElement = document.getElementById("main-footer");
  if (footerElement) {
    console.log("Footer element found, rendering template");
    renderWithTemplate(footerTemplate, footerElement);
  } else {
    console.error("Footer element not found with ID 'main-footer'");
  }
}
