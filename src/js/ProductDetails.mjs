export default class ProductDetails {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }

    async init() {
        this.product = await this.dataSource.findProductById(this.productId);
        this.renderProductDetails();

        document.getElementById("addToCart").addEventListener('click', this.addProductToCart.bind(this));
    }

    addProductToCart(product) {
        let cartItems = getLocalStorage("so-cart") || [];
        cartItems.push(this.product);
        setLocalStorage("so-cart", cartItems);
    }

    renderProductDetails() {
        const productDetailSection = document.querySelector('.product-detail');
        productDetailSection.children[0].textContent = this.product.Brand.Name;
        productDetailSection.children[1].textContent = this.product.NameWithoutBrand;
        productDetailSection.children[2].src = this.product.Image;
        productDetailSection.children[2].alt = this.product.NameWithoutBrand;
        productDetailSection.getElementsByClassName(product-card__price).textContent = `$${this.product.ListPrice}`;
        productDetailSection.getElementsByClassName(product__color).textContent = this.product.Colors.ColorName;
        productDetailSection.getElementsByClassName(product__description).innerHTML = this.product.DescriptionHtmlSimple;
    }
}

