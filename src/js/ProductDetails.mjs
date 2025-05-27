import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    console.log(this.product);
    this.renderProductDetails();
    // document.getElementById('addToCart').addEventListener('click', this.addProductToCart.bind(this));
    document.getElementById('addToCart').addEventListener('click', () => {
      this.addProductToCart(this.product);
    });

  }

  addProductToCart(product) {
    let cartItems = getLocalStorage("so-cart") || [];
    cartItems.push(product);
    setLocalStorage("so-cart", cartItems);
  }

  renderProductDetails() {
    let product=this.product
    document.querySelector('h2').textContent = product.Brand.Name;
    document.querySelector('h3').textContent = product.NameWithoutBrand;

    const productImage = document.getElementById('productImage');

    productImage.src = product.Images.PrimaryLarge;

    productImage.alt = product.NameWithoutBrand;

    document.getElementById('productPrice').textContent = `$${product.FinalPrice}`;
    document.getElementById('productColor').textContent = product.Colors[0].ColorName;
    document.getElementById('productDesc').innerHTML = product.DescriptionHtmlSimple;

    document.getElementById('addToCart').dataset.id = product.Id;
  }
}