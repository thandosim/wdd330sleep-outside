function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ProductData {
  constructor(category) {
    this.category = category;
    this.path = `/json/${this.category}.json`;
    console.log("Product data path:", this.path); // Debug log
  }
  
  getData() {
    return fetch(this.path)
      .then(convertToJson)
      .then((data) => {
        console.log("Raw data:", data); // Debug log
        // If data is an array, return it directly
        if (Array.isArray(data)) {
          return data;
        }
        // If data has a Result property (like in backpacks.json), return that
        else if (data.Result && Array.isArray(data.Result)) {
          return data.Result;
        }
        // Otherwise return an empty array
        return [];
      })
      .catch(error => {
        console.error("Error fetching product data:", error);
        return [];
      });
  }
  
  async findProductById(id) {
    console.log("Finding product with ID:", id); // Debug log
    const products = await this.getData();
    console.log("Products loaded:", products.length); // Debug log
    const product = products.find((item) => item.Id === id);
    console.log("Found product:", product); // Debug log
    return product;
  }
}
