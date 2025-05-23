import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    // Load product by ID
    this.product = await this.dataSource.findProductById(this.productId);
    console.log("Loaded product:", this.product);

    // Check if product is found
    if (!this.product) {
      console.error("Product not found with ID:", this.productId);
      document.querySelector("main").innerHTML = `<p>Product not found.</p>`;
      return;
    }

    // Render product details
    this.renderProductDetails();

    // Add to Cart button event listener
    const addToCartBtn = document.getElementById("addToCart");
    if (addToCartBtn) {
      addToCartBtn.addEventListener("click", this.addProductToCart.bind(this));
    } else {
      console.warn("Add to Cart button not found.");
    }
  }

  addProductToCart() {
    const cartItems = getLocalStorage("so-cart") || [];
    cartItems.push(this.product);
    setLocalStorage("so-cart", cartItems);
    alert(`${this.product.NameWithoutBrand} added to cart.`);
  }

  renderProductDetails() {
    productDetailsTemplate(this.product);
  }
}

function productDetailsTemplate(product) {
  // Basic validation
  if (
    !product ||
    !product.Brand ||
    !product.NameWithoutBrand ||
    !product.Image ||
    !product.Colors ||
    !product.Colors.length
  ) {
    console.error("Invalid product data:", product);
    document.querySelector("main").innerHTML = `<p>Invalid product data.</p>`;
    return;
  }

  // Update DOM with product info
  document.querySelector("h2").textContent = product.Brand;
  document.querySelector("h3").textContent = product.NameWithoutBrand;

  const productImage = document.getElementById("productImage");
  if (productImage) {
    productImage.src = product.Image;
    productImage.alt = product.NameWithoutBrand;
  }

  document.getElementById("productPrice").textContent = product.FinalPrice;
  document.getElementById("productColor").textContent = product.Colors[0].ColorName;
  document.getElementById("productDesc").innerHTML = product.DescriptionHtmlSimple;

  const addToCartBtn = document.getElementById("addToCart");
  if (addToCartBtn) {
    addToCartBtn.dataset.id = product.Id;
  }
}
