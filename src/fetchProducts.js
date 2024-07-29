import { allProductsUrl } from "./utils.js";

const fetchProducts = async () => {
  try {
    const response = await fetch(allProductsUrl);
    if (response) {
      return response.json();
    }
  } catch (err) {
    console.error("Fetch error:", err);
  }
};

export default fetchProducts;
