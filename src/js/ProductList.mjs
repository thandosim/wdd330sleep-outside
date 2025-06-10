import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
    const productListItem = `
        <li class="product-card">
            <a href="/product_pages/?product=${product.Id}">
              <img
                src="${product.Images.PrimaryLarge}"
                alt="${product.NameWithoutBrand}"
              />
              <h3 class="card__brand">${product.Brand.Name}</h3>
              <h2 class="card__name">${product.NameWithoutBrand}</h2>
              <p class="product-card__price">$${product.ListPrice}</p>
            </a>
        </li>
    `;
    return productListItem;
}

async function imageExists(url) {
    return new Promise((resolve) => {
        const img = new Image();
        img.src = url;
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
    });
}

async function filterValidImages(list) {
    const validItems = await Promise.all(
        list.map(async (item) => {
            const exists = await imageExists(item.Image);
            return exists ? item : null;
        })
    );
    return validItems.filter(Boolean);
}

export default class ProductList {
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
        this.products = [];
        this.sortSelect = document.getElementById('sort-select');
    }

    async init() {
        this.products = await this.dataSource.getData(this.category);
        
        // Add event listener for sorting
        if (this.sortSelect) {
            this.sortSelect.addEventListener('change', () => {
                this.sortProducts(this.sortSelect.value);
            });
        }
        
        // Initial render with default sorting
        this.renderList(this.products);
    }
    
    sortProducts(sortOption) {
        let sortedProducts = [...this.products];
        
        switch(sortOption) {
            case 'name':
                sortedProducts.sort((a, b) => a.NameWithoutBrand.localeCompare(b.NameWithoutBrand));
                break;
            case 'nameReverse':
                sortedProducts.sort((a, b) => b.NameWithoutBrand.localeCompare(a.NameWithoutBrand));
                break;
            case 'price':
                sortedProducts.sort((a, b) => a.FinalPrice - b.FinalPrice);
                break;
            case 'priceReverse':
                sortedProducts.sort((a, b) => b.FinalPrice - a.FinalPrice);
                break;
            default:
                // Default sorting (no sorting)
                break;
        }
        
        this.renderList(sortedProducts);
    }
    
    renderList(productList) {
        this.listElement.innerHTML = '';
        renderListWithTemplate(productCardTemplate, this.listElement, productList);
    }
}
