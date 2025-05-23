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
  // Clear the parent element first before adding new content
  parentElement.innerHTML = "";
  
  // Create a temporary container
  const tempElement = document.createElement('div');
  tempElement.innerHTML = template;
  
  // Append the content to the parent element
  parentElement.appendChild(tempElement.firstElementChild || tempElement);
  
  if (callback) {
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
  
  // Check if header is already loaded to prevent multiple loads
  const headerElement = document.getElementById("main-header");
  if (headerElement && !headerElement.hasAttribute("data-loaded")) {
    try {
      const headerTemplate = await loadTemplate("/partials/header.html");
      console.log("Header template loaded, rendering...");
      renderWithTemplate(headerTemplate, headerElement);
      // Mark as loaded
      headerElement.setAttribute("data-loaded", "true");
    } catch (error) {
      console.error("Error loading header:", error);
    }
  }

  // Check if footer is already loaded to prevent multiple loads
  const footerElement = document.getElementById("main-footer");
  if (footerElement && !footerElement.hasAttribute("data-loaded")) {
    try {
      const footerTemplate = await loadTemplate("/partials/footer.html");
      console.log("Footer template loaded, rendering...");
      renderWithTemplate(footerTemplate, footerElement);
      // Mark as loaded
      footerElement.setAttribute("data-loaded", "true");
    } catch (error) {
      console.error("Error loading footer:", error);
    }
  }
}
