import axios from "axios";
export const getProducts = async () => { 
      try {
        const result = await axios.get("http://localhost:8000/all");  
        return result.data;  
      } catch (error) {
          console.error(error); 
      }
} 