import React, { 
    useState, 
    type ChangeEvent , 
    type FormEvent } from "react";

import axios from "axios"

interface ProductData {
  productName: string;
  price: string;
  description: string;
  imageUrl?: string;
}

interface ProductFormProps {
  fetchAndSetAllProducts: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ fetchAndSetAllProducts }) => {

  const [formData, setFormData] = useState<ProductData>({
    productName: "",
    price: "",
    description: "",
    imageUrl: "",
  });
  const [message, setMessage] = useState<string|undefined>(undefined); 

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Submitted Product:", formData); 

    const submitData = async ()  => { 
      const result = await axios.post("http://localhost:8000/new", 
        {
          name: formData.productName, 
          price: Number(formData.price),
          description: formData.description, 
          imageUrl: formData.imageUrl
        }
      );  
      if (result.status === 200) {
          setMessage("Product added successfully."); 
          fetchAndSetAllProducts(); 
      }else {
          alert("Something went wrong."); 
      }
    }

    submitData(); 
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-2xl">
      <h2 className="text-2xl font-bold mb-6 text-center">Add New Product</h2>

      {message &&  
        <div className="max-w-xs bg-teal-500 text-sm text-white rounded-xl shadow-lg" role="alert" tabindex="-1" aria-labelledby="hs-toast-solid-color-teal-label">
          <div id="hs-toast-solid-color-teal-label" className="flex p-4">
            {message}
            <div className="ms-auto">
              <button type="button" className="inline-flex shrink-0 justify-center items-center size-5 rounded-lg text-white hover:text-white opacity-50 hover:opacity-100 focus:outline-hidden focus:opacity-100" aria-label="Close">
                <span className="sr-only">Close</span>
                <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M18 6 6 18"></path>
                  <path d="m6 6 12 12"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      } 
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Product Name</label>
          <input
            type="text"
            name="productName"
            value={formData.productName}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows={4}
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Image URL (optional)</label>
          <input
            type="text"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Submit Product
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
