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
      const response = await fetch(`${baseURL}product/${id}`);
      const data = await convertToJson(response);
      return data.Result;
    } catch (err) {
      console.error("Error fetching product:", err);
      throw err;
    }
  }
}