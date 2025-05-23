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
    this.path = `../json/${this.category}.json`;
  }
  
  getData() {
    return fetch(this.path)
      .then(convertToJson)
      .then((data) => {
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
      });
  }
  
  async findProductById(id) {
    const products = await this.getData();
    return products.find((item) => item.Id === id);
  }
}
