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
  // Remove Vite client script if present
  template = template.replace(/<script.*?@vite\/client.*?<\/script>/g, '');
  
  // Debug logs
  console.log("Rendering template to:", parentElement);
  console.log("Template length:", template.length);
  
  // Simply set the innerHTML of the parent element
  parentElement.innerHTML = template;
  
  if (callback) {
    callback(data);
  }
}

export async function loadTemplate(path) {
  const res = await fetch(path);
  if (!res.ok) {
    throw new Error(`Failed to load template: ${path} (${res.status} ${res.statusText})`);
  }
  const template = await res.text();
  return template;
}

export async function loadHeaderFooter() {
  console.log("Loading header and footer...");
  
  // Check if header is already loaded to prevent multiple loads
  const headerElement = document.getElementById("main-header");
  if (headerElement) {
    try {
      const headerTemplate = await loadTemplate("/partials/header.html");
      console.log("Header template loaded, rendering...");
      console.log("Header template content:", headerTemplate); // Debug log
      renderWithTemplate(headerTemplate, headerElement);
    } catch (error) {
      console.error("Error loading header:", error);
    }
  }

  // Check if footer is already loaded to prevent multiple loads
  const footerElement = document.getElementById("main-footer");
  if (footerElement) {
    try {
      const footerTemplate = await loadTemplate("/partials/footer.html");
      console.log("Footer template loaded, rendering...");
      console.log("Footer template content:", footerTemplate); // Debug log
      renderWithTemplate(footerTemplate, footerElement);
    } catch (error) {
      console.error("Error loading footer:", error);
    }
  }
}
