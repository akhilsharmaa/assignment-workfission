import axios from "axios";
export const searchProduct = async () => { 
      try {
        const result = await axios.get("http://localhost:8000/search");  
        return result.data;  
      } catch (error) {
          console.error(error); 
      }
} 