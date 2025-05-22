import { setLocalStorage, getLocalStorage } from "./utils.mjs";

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

    addProductToCart() {
        let cartItems = getLocalStorage("so-cart") || [];

        // I used this variable to check if the product is in the list or among the cart items
        let productinList = false;

        cartItems.forEach(item => {
            if (this.productId == item.Id) {
                let quantity = 0;
                quantity = parseInt(getLocalStorage(`${this.product.Name}`));
                setLocalStorage(`${this.product.Name}`, `${quantity + 1}`)
                productinList = true;
            }
        });

        if (productinList == false) {
            cartItems.push(this.product);
            setLocalStorage(`${this.product.Name}`, 1)
        }

        setLocalStorage("so-cart", cartItems);
    }

    renderProductDetails() {
        const productDetailSection = document.querySelector('.product-detail');
        productDetailSection.children[0].textContent = this.product.Brand.Name;
        productDetailSection.children[1].textContent = this.product.NameWithoutBrand;
        productDetailSection.children[2].src = this.product.Image;
        productDetailSection.children[2].alt = this.product.NameWithoutBrand;
        productDetailSection.children[3].textContent = `$${this.product.ListPrice}`;
        productDetailSection.children[4].textContent = this.product.Colors[0].ColorName;
        productDetailSection.children[5].innerHTML = this.product.DescriptionHtmlSimple;
    }
}

