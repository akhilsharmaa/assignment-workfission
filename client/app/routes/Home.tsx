import { use, useEffect, useState } from "react";
import New from "../components/New"
import All from "../components/All"
import AllProducts from "../components/All";
import { getProducts } from "~/utils/getProducts";
import axios from "axios";
import type { Product } from "~/model/Product";
import { searchProduct } from "~/utils/searchProduct";

export default function Home() {

  const [activeTab, setActiveTab] = useState("tab1");
  const [products, setProducts]  = useState<Product[]>([]); 
  
  const fetchAndSetAllProducts = () => { 
    const fetch = async () => {
      const result = await getProducts();   
      setProducts(result);  
    }
    fetch(); 
  }

  const searchAndSetAllProducts = () => { 
    const fetch = async () => {
      const result = await searchProduct();   
      setProducts(result);  
    }
    fetch(); 
  } 

  useEffect(() => {
    fetchAndSetAllProducts(); 
  }, [])

  return (
    <div className="max-w-md mx-auto mt-10">
      {/* Tab Headers */}
      <div className="flex border-b border-gray-300">
        <button
          className={`flex-1 py-2 text-center transition-colors duration-300 ${
            activeTab === "tab1"
              ? "border-b-2 border-blue-500 text-blue-500 font-semibold"
              : "text-gray-500 hover:text-blue-500"
          }`}
          onClick={() => setActiveTab("tab1")}
        >
          Tab 1
        </button>
        <button
          className={`flex-1 py-2 text-center transition-colors duration-300 ${
            activeTab === "tab2"
              ? "border-b-2 border-blue-500 text-blue-500 font-semibold"
              : "text-gray-500 hover:text-blue-500"
          }`}
          onClick={() => setActiveTab("tab2")}
        >
          Tab 2
        </button>
      </div>

      {/* Tab Content */}
      <div className="p-4 bg-white border border-t-0 rounded-b-md shadow-md">
        {activeTab === "tab1" && (
          <div>
            <AllProducts
                products={products}
            />
          </div>
        )}
        {activeTab === "tab2" && (
          <div> 
            <New
              fetchAndSetAllProducts={fetchAndSetAllProducts}
            />
          </div>
        )}
      </div>
    </div>
  );
}
