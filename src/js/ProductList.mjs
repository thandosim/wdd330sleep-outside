import { setLocalStorage, getLocalStorage } from './utils.mjs';

export default class ProductList {
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }

    async init() {
        const list = await this.dataSource.getData();
        this.renderList(list);
        // Add event listeners to the "Add to Cart" buttons
        document.querySelectorAll(".product-card__add").forEach(button => {
            button.addEventListener("click", this.addToCartHandler.bind(this));
        });
        console.log("Event listeners added to", document.querySelectorAll(".product-card__add").length, "buttons");
    }

    renderList(list) {
        const html = list.map(product => this.productCardTemplate(product));
        this.listElement.innerHTML = html.join("");
    }

    productCardTemplate(product) {
        return `<li class="product-card">
            <a href="product_pages/index.html?product=${product.Id}">
                <img src="${product.Image}" alt="${product.Name}"/>
                <h3 class="card__brand">${product.Brand.Name}</h3>
                <h2 class="card__name">${product.NameWithoutBrand}</h2>
                <p class="product-card__price">$${product.FinalPrice}</p>
            </a>
            <button class="product-card__add" data-id="${product.Id}">Add to Cart</button>
        </li>`;
    }

    async addToCartHandler(e) {
        console.log("Add to cart clicked for product ID:", e.target.dataset.id);
        const product = await this.dataSource.findProductById(e.target.dataset.id);
        console.log("Product found:", product);
        this.addProductToCart(product);
    }

    addProductToCart(product) {
        let cart = getLocalStorage("so-cart") || [];
        if (!Array.isArray(cart)) {
            cart = [cart];
        }
        cart.push(product);
        setLocalStorage("so-cart", cart);
    }
}
