import { useEffect, useState } from "react";
import New from "../components/New";
import AllProducts from "../components/All";
import { getProducts } from "~/utils/getProducts";
import type { Product } from "~/model/Product";
import { searchProduct } from "~/utils/searchProduct";

export default function Home() {
  const [activeTab, setActiveTab] = useState("tab1");
  const [products, setProducts] = useState<Product[]>([]);
  const [searchInput, setSearchInput] = useState<string>("");

  const fetchAndSetAllProducts = async () => {
    const result = await getProducts();
    setProducts(result);
  };

  const searchAndSetAllProducts = async () => {
    if (searchInput.trim()) {
      const result = await searchProduct(searchInput.trim());
      setProducts(result);
    } else {
      fetchAndSetAllProducts(); // fallback to all products if search is empty
    }
  };

  useEffect(() => {
    fetchAndSetAllProducts();
  }, []);

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    searchAndSetAllProducts();
  };

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
          Home
        </button>
        <button
          className={`flex-1 py-2 text-center transition-colors duration-300 ${
            activeTab === "tab2"
              ? "border-b-2 border-blue-500 text-blue-500 font-semibold"
              : "text-gray-500 hover:text-blue-500"
          }`}
          onClick={() => setActiveTab("tab2")}
        >
          New Product
        </button>
      </div>

      {/* Tab Content */}
      <div className="p-4 bg-white border border-t-0 rounded-b-md shadow-md">
        {activeTab === "tab1" && (
          <div>
            <form className="max-w-md mx-auto" onSubmit={handleSearchSubmit}>
              <label
                htmlFor="default-search"
                className="mb-2 text-sm font-medium text-gray-900 sr-only"
              >
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="search"
                  id="default-search"
                  className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Search Mockups, Logos..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
                <button
                  type="submit"
                  className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
                >
                  Search
                </button>
              </div>
            </form>

            <AllProducts products={products} />
          </div>
        )}
        {activeTab === "tab2" && (
          <New fetchAndSetAllProducts={fetchAndSetAllProducts} />
        )}
      </div>
    </div>
  );
}
