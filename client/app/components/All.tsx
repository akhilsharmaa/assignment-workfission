import React, { 
    useState, 
    type ChangeEvent , 
    type FormEvent } from "react";

import axios from "axios"
import Card from "./Card"; 
import type { Product } from "~/model/Product";

const AllProducts = (props: {products: any}) => {    
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8"> 
            {
              props.products.map((product:Product, index:number) => {
                return (
                  <Card  
                    price={product.price}
                    name={product.name}
                    imageUrl={product.imageUrl}
                    description={product.description}
                  /> 
                )
              })
            } 
        </div>
      </div>
    </div> 
  );
};

export default AllProducts;
