"use client"

import React from 'react'
import { categories } from "../public/data/data.json"
import Image from 'next/image'

const Categories = () => {
  
  return (
    <div className='mx-auto my-8 grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-3'>
      {categories.map((category, index) => {
        return (
          <div
            key={index}
            className='group relative flex h-80 w-full flex-col justify-end overflow-hidden rounded-2xl'
          >
            <Image
              src={category.image}
              alt={category.buttonText}
              fill
              style={{ objectFit: "cover" }}
              className=' transition-transform duration-300 group-hover:scale-110'
            />
            <div className="absolute bottom-4 left-4 bg-white bg-opacity-75 px-4 py-2 rounded text-black">
              {category.buttonText}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Categories;
