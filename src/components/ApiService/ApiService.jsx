import axios from "axios";


export const getAllProducts = async () => {
    try {
        const res = await axios.get('/product');
        if (res.status !== 200) {
            console.log('No data');
            return null; // Or throw an error
        }
        const data = res.data;
        return data;
    } catch (error) {
        console.error('Error fetching products:', error);
        return null; // Or throw an error
    }
};

export const getProductDetails = async (id) => {
    try {
      const res = await axios.get(`/product/${id}`);
      
      if (res.status === 200) {
        return res.data; 
      } else {
        console.log("Unexpected Error:", res.status);
        return null; 
      }
    } catch (error) {
      console.error("Request failed:", error);
      throw error;
    }
  };