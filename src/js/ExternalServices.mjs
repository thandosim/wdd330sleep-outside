const baseURL = import.meta.env.VITE_SERVER_URL

function convertToJson(res) {
  if (res.ok) {
    return res.json().catch(err => {
      console.error("Error parsing JSON:", err);
      throw new Error("Invalid JSON response");
    });
  } else {
    throw new Error(`Bad Response: ${res.status} ${res.statusText}`);
  }
}

export default class ExternalServices {
  constructor() {
     
  }
  async getData(category) {
    try {
      if (!baseURL || baseURL === '') {
        const response = await fetch(`../public/json/${category}.json`);
        const data = await convertToJson(response);
        return data.Result || data;
      }
      
      const response = await fetch(`${baseURL}products/search/${category}`);
      const data = await convertToJson(response);
      return data.Result;
    } catch (err) {
      console.error("Error fetching data:", err);
      const fallbackResponse = await fetch(`../public/json/${category}.json`);
      const fallbackData = await fallbackResponse.json();
      return fallbackData;
    }
  }
  
  async findProductById(id) {
    try {
      const category = this.getCategoryFromId(id);
      // console.log(`Looking for product ${id} in category ${category}`);
      
      // Try to find product in local JSON file
      let response = await fetch(`../public/json/${category}.json`);
      let data = await convertToJson(response);
      // console.log(`Loaded data:`, data);
      
      // Handle different JSON formats
      let products = data;
      if (data.Result) {
        products = data.Result;
      } else if (Array.isArray(data)) {
        products = data;
      }
      
      // console.log(`Products array:`, products);
      
      // Find the specific product
      let product = Array.isArray(products) 
        ? products.find(item => item.Id === id)
        : null;
      
      // If product not found and baseURL is defined, try API
      if (!product && baseURL && baseURL !== '') {
        // console.log(`Product not found in local JSON, trying API...`);
        const apiResponse = await fetch(`${baseURL}product/${id}`);
        const apiData = await convertToJson(apiResponse);
        return apiData.Result;
      }
      
      // console.log(`Found product:`, product);
      return product;
    } catch (err) {
      console.error("Error fetching product:", err);
      return null;
    }
  }

  // Helper method to determine category from product ID
  getCategoryFromId(id) {
    // This is a simplified approach based on the actual product IDs in your data
    const firstChars = id.substring(0, 3).toLowerCase();
    
    // Check for specific product IDs we know about
    if (id === '880RR' || id === '985RF') return 'tents';
    
    // General pattern matching
    if (id.startsWith('8') || id.startsWith('9')) return 'sleeping-bags';
    if (id.startsWith('1') || id.startsWith('2')) return 'backpacks';
    if (id.startsWith('3') || id.startsWith('4')) return 'tents';
    
    // Default to tents if unknown
    return 'tents';
  }
}
