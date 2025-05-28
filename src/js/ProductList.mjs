import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
    const imagePath = product.Image.startsWith("../") 
        ? product.Image.replace("../", "/") 
        : product.Image;

    // Check for discount
    const isDiscounted = product.FinalPrice < product.SuggestedRetailPrice;
    const discountPercent = isDiscounted
        ? Math.round(100 - (product.FinalPrice / product.SuggestedRetailPrice) * 100)
        : 0;

    return `
        <li class="product-card">
            <a href="/product_pages/?product=${product.Id}">
              <img
                src="${imagePath}"
                alt="${product.NameWithoutBrand}"
              />
              <h3 class="card__brand">${product.Brand.Name}</h3>
              <h2 class="card__name">${product.NameWithoutBrand}</h2>
              <p class="product-card__price">
                $${product.FinalPrice.toFixed(2)}
                ${isDiscounted ? `<span class="suggested-price">$${product.SuggestedRetailPrice.toFixed(2)}</span>
                <span class="discount-badge">-${discountPercent}%</span>` : ""}
              </p>
            </a>
        </li>
    `;
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
    }

    async init() {
        try {
            const list = await this.dataSource.getData();
            console.log("Loaded products:", list.length);

            // Render all products, not just those with valid images
            renderListWithTemplate(productCardTemplate, this.listElement, list);
        } catch (error) {
            console.error("Error loading product list:", error);
            this.listElement.innerHTML = `<li class="error">Error loading products: ${error.message}</li>`;
        }
    }
}
