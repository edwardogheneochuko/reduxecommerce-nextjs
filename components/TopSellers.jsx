


import React from 'react'
import { products } from "../public/data/data.json"
import CardCarousel from './CardCarousel'


const TopSellers = () => {
    const cards = products.slice(8,15).map((item) => ({
            image: item.image,
            text: item.text,
            price: `${item.price}`,
            id: item.id,
            category: item.category,
            inStock: item.inStock,
        }))

  return (
        <CardCarousel title="Top Sellers" cards={cards}/>
  )
}

export default TopSellers