import {qs, getLocalStorage } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource){
  this.productId = productId;
  this.product = {};
  this.dataSource = dataSource;
}



async init() {
  this.product = await this.dataSource.findProductById(this.productId);
  this.renderProductDetails();

  document
      .getElementById('addToCart')
      .addEventListener('click', this.addProductToCart.bind(this));

}

  addProductToCart(product) {
   letcart = getLocalStorage("so-cart") || [];
   const productInCart = cart.find((item) => item.Id === product.Id);

   
   if (productInCart) {
     productInCart.quantity = (productInCart.quantity || 1) + 1;
   } else {
     product.quantity = 1;
     cart.push(product);
   }

   localStorage.setItem("so-cart", JSON.stringify(cart));

  
}

renderProductDetails() {
        qs(".product-detail h3").innerHTML = this.product.Brand.Name;
        qs(".product-detail h2").innerHTML = this.product.NameWithoutBrand;
        renderListWithTemplate(productImageTemplate,qs(".slides"),this.product.Images.ExtraImages);
        const newChild = document.createElement("img");
        newChild.src = this.product.Images.PrimaryLarge
        newChild.alt = this.product.Name
        qs(".slides").prepend(newChild)
        qs(".product-card__price").innerHTML = "Now " + `$${this.product.FinalPrice}`;
        qs(".product-card__save").innerHTML = "Save $" + (this.product.SuggestedRetailPrice - this.product.FinalPrice).toFixed(2);

        qs(".product-card__disc").innerHTML = "Was " + `$${this.product.SuggestedRetailPrice}`;
        qs(".product__color").innerHTML = this.product.Colors[0].ColorName;
        qs(".product__description").innerHTML = this.product.DescriptionHtmlSimple;
        qs(".product-detail__add button").setAttribute("data-id", this.product.Id);
 
}

  // this.product = await this.dataSource.findProductById(this.productId);
  // this.renderProductDetails()

 
}