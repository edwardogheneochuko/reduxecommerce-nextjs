"use client"

import { addToCart } from '../../lib/cartSlice'
import { removeFromWishList } from '../../lib/wishSlice'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaHeart, FaNodeJs, FaTrash } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'

const WishPage = () => {
    const dispatch = useDispatch()
    const wishlist = useSelector((state) => state.wishlist.items)
    const removeItem = (id) => {
        dispatch(removeFromWishList(id))
    }

    const addToCartHandler = (item) => {
        const cartItem = {
            ...item, quantity: 1,
        }
        dispatch(addToCart(cartItem))
    }

  return (
    <div className='w-full max-w-7xl mx-auto my-12 px-4'>
        <h1 className='text-2xl md:text-4xl font-bold text-gray-800 mb-2'>
            Wishlist
        </h1>
        <p className='text-gray-600 mb-6 flex items-center'>
            {wishlist.length} items in your 
            <FaHeart className='ml-1 text-red-400'/>
        </p>
        <div className='w-full'>
            <div className='bg-white rounded-lg shadow-md p-4 sm:p-6 '>
                {wishlist.length === 0 ? (
                    <div className='text-center py-6 '>
                        <p className='text-gray-700 '>
                            Your Wishlist is Empty
                        </p>
                        <Link href="/products" className='mt-4 inline-block bg-pink-400
                    text-white px-4 py-2 rounded-md hover:bg-pink-500 text-sm 
                    sm:text-base'> Wish  Now
                    </Link>
                    </div>
                ) : (
                <>
                   <div className='hidden sm:grid grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4
                 text-gray-700 font-semibold mb-4'>
                    <div>Product</div>
                    <div>Price</div>
                    <div>Stock</div>
                    <div>Actions</div>
                    
                 </div>
                 {wishlist.map((item, index) => (
                    <div key={index} className={`flex flex-col sm:grid py-6
                        sm:grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 items-start sm:items-center
                        ${index < wishlist.length - 1 ? "border-b border-gray-400" : " "}`}>
                            <div className='flex items-center gap-4 w-full'>
                                
                                <div className='relative w-16 h-16 flex shrink-0'>
                                    <Image src={item.image} alt='' fill 
                                    style={{objectFit:"cover"}} className='rounded' />
                                    
                                </div>
                                <div className='flex-1 sm:flex-none'>
                                    <div className='flex justify-between items-center'>
                                        <p className='text-gray-800 font-medium text-sm
                                        sm:text-base'>
                                            {item.text}
                                        </p>
                                    <FaTrash className='text-gray-500 hover:text-red-400
                                        cursor-pointer text-xs sm:hidden'
                                        onClick={() => removeItem(item.id)} />
                                    </div>
                                    <p className='text-xs sm:text-sm text-gray-500'>
                                        {item.category}
                                    </p>
                                </div>
                            </div>
                            <div className='text-gray-700 text-sm sm:text-base flex flex-col
                            w-full sm:block'>
                                <span className='sm:hidden text-xs font-medium text-gray-600'>
                                    Price
                                </span>
                                ${item.price}
                            </div>
                            <div className='text-sm sm:text-base flex gap-1 w-full sm:block'>
                                <span className='sm:hidden text-xs font-medium text-gray-600'>
                                    Stock:
                                </span>
                                <span className={`text-xs sm:text-sm font-medium ${item.inStock ? 
                                    "text-green-600" : "text-red-500"}`}>
                                        {item.inStock ? "In Stock" : "Out of Stock"}
                                </span>
                            </div>

                        <div className='flex flex-col gap-2 w-full sm:flex-row sm:items-center
                        sm:gap-4'>
                            <span className='sm:hidden text-xs font-medium text-gray-600'>
                                Actions:
                            </span>
                            <div className='flex items-center gap-4'>
                                <button onClick={() => addToCartHandler(item)}
                                 className=' mt-4 bg-pink-500 text-gray-100 px-4 py-2 rounded-md
                hover:bg-pink-800 disabled:bg-gray-400 disabled:cursor-not-allowed
                text-sm sm:text-base cursor-pointer'>
                                    Add to Cart
                                </button>
                                
                            </div>
                            
                        </div>
                    </div>
                 ))}
                </>
                )}
            </div>
        </div>
    </div>
  )
}

export default WishPage

