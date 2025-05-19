export default class ProductList {
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }

    async init() {
        const list = await this.dataSource.getData();
        this.renderList(list);
    }

    renderList(list) {
        const html = list.map(product => this.productCardTemplate(product));
        this.listElement.innerHTML = html.join("");
    }

    productCardTemplate(product) {
        return `<li class="product-card">
            <a href="product_pages/${product.Id}.html">
                <img src="${product.Image}" alt="${product.Name}"/>
                <h3 class="card__brand">${product.Brand.Name}</h3>
                <h2 class="card__name">${product.NameWithoutBrand}</h2>
                <p class="product-card__price">$${product.FinalPrice}</p>
            </a>
        </li>`;
    }
}

const productList = new ProductList("tents", dataSource, document.querySelector(".productList"));
