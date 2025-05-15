import React from 'react'
import type { Product } from '~/model/Product'

function Card(props: Product) {
  return (
    <a href="#" className="group">
      <img src="https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-03.jpg" 
        alt="Person using a pen to cross a task off a productivity paper card." 
        className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8"/>
      <h3 className="mt-4 text-sm text-gray-700">{props.name}</h3>
      <p className="mt-4 text-sm text-gray-700">{props.description}</p>
      <p className="mt-1 text-lg font-medium text-gray-900">${props.price}</p>
    </a>
  )
}

export default Card
