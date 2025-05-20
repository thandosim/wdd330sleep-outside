export default class ProductDetails {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }

    init() {

    }

    addProductToCart(product) {
        let cartItems = getLocalStorage("so-cart") || [];
        cartItems.push(product);
        setLocalStorage("so-cart", cartItems);
    }

    renderProductDetails() {

    }
}