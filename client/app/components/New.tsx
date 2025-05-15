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
          alert("Product added successfully."); 
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
