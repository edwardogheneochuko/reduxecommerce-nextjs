

import React from 'react'
import { products } from "../public/data/data.json"
import CardCarousel from './CardCarousel'

const NewArrival = () => {
    const cards = products.slice(0,8).map((item) => ({
        image: item.image,
        text: item.text,
        price: `${item.price}`
    }))

  return (
    <div>
        <CardCarousel title="New Arrivals" cards={cards} />
    </div>
  )
}

export default NewArrival