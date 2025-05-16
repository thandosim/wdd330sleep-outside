function productCardTemplate(product) {
    const productListItem = html`
        <li class="product-card">
            <a href="product_pages/?product=">
              <img
                src=""
                alt=""
              />
              <h3 class="card__brand"></h3>
              <h2 class="card__name"></h2>
              <p class="product-card__price">$</p>
            </a>
        </li>
    `;
    return productListItem;
}


export default class ProductList {
    constructor(category, datasource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }

    async init() {
        const list = await this.dataSource.getData();
    }
}