import axios from "axios";
export const searchProduct = async (name: string) => { 
      try {
        const result = await axios.post("http://localhost:8000/search", 
          {
            "name": name
          }
        );  
        return result.data;  
      } catch (error) {
          console.error(error); 
      }
} 