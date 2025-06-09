
import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    try {
      this.product = await this.dataSource.findProductById(this.productId);
      
      if (!this.product) {
        console.error(`Product with ID ${this.productId} not found`);
        document.querySelector('main').innerHTML = `<div class="product-not-found">
          <h2>Product Not Found</h2>
          <p>We're sorry, the requested product could not be found.</p>
          <a href="../index.html">Return to Home</a>
        </div>`;
        return;
      }
      
      // console.log(this.product);
      this.renderProductDetails();
      document.getElementById('addToCart').addEventListener('click', () => {
        this.addProductToCart(this.product);
      });
    } catch (error) {
      console.error('Error initializing product details:', error);
      document.querySelector('main').innerHTML = `<div class="product-not-found">
        <h2>Error Loading Product</h2>
        <p>We're sorry, there was an error loading the product details.</p>
        <a href="../index.html">Return to Home</a>
      </div>`;
    }
  }

  addProductToCart(product) {
    let cartItems = getLocalStorage("so-cart") || [];
    cartItems.push(product);
    setLocalStorage("so-cart", cartItems);
  }

  renderProductDetails() {
    const product = this.product;
    
    // Check if product and required properties exist before rendering
    if (!product || !product.Brand) {
      console.error('Invalid product data:', product);
      return;
    }
    
    document.querySelector('h2').textContent = product.Brand.Name;
    document.querySelector('h3').textContent = product.NameWithoutBrand;

    const productImage = document.getElementById('productImage');
    productImage.src = product.Images?.PrimaryLarge || product.Image;
    productImage.alt = product.NameWithoutBrand;

    document.getElementById('productPrice').textContent = `$${product.FinalPrice}`;
    
    // Add discount indicator if there's a discount
    if (product.SuggestedRetailPrice > product.FinalPrice) {
      const discountAmount = product.SuggestedRetailPrice - product.FinalPrice;
      const discountPercent = Math.round((discountAmount / product.SuggestedRetailPrice) * 100);
      const discountElement = document.getElementById('productDiscount');
      discountElement.textContent = `Save $${discountAmount.toFixed(2)} (${discountPercent}%)`;
      discountElement.classList.remove('hide');
      
      // Add original price display with strikethrough
      const originalPriceElement = document.getElementById('originalPrice');
      originalPriceElement.textContent = `$${product.SuggestedRetailPrice.toFixed(2)}`;
      originalPriceElement.classList.remove('hide');
    }
    
    document.getElementById('productColor').textContent = product.Colors[0].ColorName;
    document.getElementById('productDesc').innerHTML = product.DescriptionHtmlSimple;

    document.getElementById('addToCart').dataset.id = product.Id;
  }
}
