export default class ProductDetails {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }

    async init() {
        const ProductDetails = await this.dataSource.findProductById(this.productId);
        this.renderProductDetails();
    }

    addProductToCart(product) {
        let cartItems = getLocalStorage("so-cart") || [];
        cartItems.push(product);
        setLocalStorage("so-cart", cartItems);
    }

    renderProductDetails() {

    }
}