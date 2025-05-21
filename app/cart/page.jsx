"use client"

import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateQuantity, removeFromCart } from '../../lib/cartSlice'
import { FaShoppingBasket, FaTrash } from 'react-icons/fa'
import Link from 'next/link'
import Image from 'next/image'

const CartPage = () => {
    const dispatch = useDispatch()
    const cartItems = useSelector((state) => state.cart.items)

    // update the quantity of cart item
    const handleUpdateQuantity = (id, delta) => {
        const item = cartItems.find((item) => item.id === id)
        if (item) {
            const newQuantity = Math.max(1, item.quantity + delta)
            dispatch(updateQuantity({id, quantity: newQuantity}))
        } 
    }
    // remove item from the cart by id
    const removeItem = (id) => {
        dispatch(removeFromCart(id))
    }
    // calculate the total price of the cart
    const subtotal = cartItems.reduce(
        (sum, item) => sum + (Number(item.price) || 0) * item.quantity,
        0
    )
    // calculate the total number of items in cart
    const totalItems = cartItems.reduce(
        (sum, item) => sum + item.quantity, 
        0
    )

  return (
    <div className='w-full max-w-7xl mx-auto my-12 px-4'>
       <h1 className='text-3xl md:text-4xl font-bold text-gray-800 mb-2'>
        Shopping Bag
       </h1>
       <p className='text-gray-600 mb-6 flex items-center gap-2 text-xl'>
        {totalItems} item{totalItems !== 1 ? 's' : ''} in <FaShoppingBasket className='text-green-600'/>
       </p>

       <div className='flex flex-col lg:flex-row gap-6'>
        <div className='w-full lg:w-2/3 '>
          <div className='bg-white rounded-lg shadow-lg p-4 sm:p-6'>
            {cartItems.length === 0 ? (
                <div className='text-center py-4'>
                    <p className='text-gray-700'>Your Cart is Empty</p>
                    <Link href="/products" className='mt-4 inline-block bg-pink-400
                    text-white px-4 py-2 rounded-md hover:bg-pink-500 text-sm 
                    sm:text-base'> Shop Now</Link>
                </div>
            ) : (
                <>
                 <div className='hidden sm:grid grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4
                 text-gray-700 font-semibold mb-4'>
                    <div>Product</div>
                    <div>Price</div>
                    <div>Quantity</div>
                    <div>Total Price</div>
                 </div>

            {cartItems.map((item, index) => (
                    <div key={item.id} className={`flex flex-col sm:grid items-start py-4
                    sm:grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 sm:items-center 
                    ${index < cartItems.length - 1 ? "border-b border-gray-400": ""}`}>
                        <div className='flex items-center gap-4 w-full'>
                            <div className='relative w-12 h-12 sm:w-16 sm:h-16 flex shrink-0'>
                                <Image src={item.image} alt='' className='rounded'
                                fill style={{objectFit:"cover"}} />
                            </div>
                            <div className='flex-1'>
                                <p className='text-gray-800 font-medium text-sm
                                 sm:text-base'>
                                    {item.text}
                                </p>
                            </div>
                        </div>
                        <div className='text-gray-800 text-sm sm:text-base flex justify-between
                        w-full sm:block pl-2.5'>
                            <span className='sm:hidden font-semibold'>Price:</span>
                             ${item.price}
                            </div>
                        <div className='flex items-center w-full sm:w-auto'>
                        <span className='sm:hidden font-semibold mr-44 sm:mr-2'> Quantity </span>
                        {/* Minus */}
                        <button
                          aria-label={`Decrease quantity of ${item.text}`}
                          className='w-6 h-6 pb-1 flex items-center justify-center bg-transparent border-2
                          border-gray-400 rounded-lg hover:bg-gray-300 text-black text-2xl cursor-pointer disabled:opacity-50'
                          onClick={() => handleUpdateQuantity(item.id, -1)}
                          disabled={item.quantity === 1}
                        >
                          -
                        </button>
                        {/* item quantity*/}
                        <span className='w-7 sm:w-8 text-center text-sm sm:text-base'>
                            {item.quantity}
                        </span>
                        {/* Addition  */}
                        <button
                          aria-label={`Increase quantity of ${item.text}`}
                          className='w-6 h-6 pb-1 flex items-center justify-center bg-transparent border-2
                          border-gray-400 rounded-lg hover:bg-gray-300 text-black text-2xl cursor-pointer'
                          onClick={() => handleUpdateQuantity(item.id, 1)}
                        >
                          +
                        </button>
                        </div>
                        {/* total price */}
                        <div className=' text-gray-700 text-sm sm:text-base flex justify-between w-full sm:block pl-4'>
                            <span className='sm:hidden font-semibold'> Total: </span>
                           ${item.price * item.quantity}
                        </div>
                        {/* remove icon */}
                        <div className='self-center sm:self-auto'>
                            <FaTrash
                              aria-label={`Remove ${item.text} from cart`}
                              className='text-gray-700 text-lg 
                               hover:text-red-600 cursor-pointer  sm:text-sm'
                              onClick={() => removeItem(item.id)}
                            />
                        </div>
                    </div>
                 ))}
                </>
            )}
          </div>
        </div>
          {/* Summary of goods bought */}
          <div className='w-full lg:w-1/3'>
          <div className='bg-white rounded-lg shadow-md p-4 sm:p-6'>
            <h3 className='text-xl font-semibold text-gray-800 mb-4'>
                Cart Summary
            </h3>
            <div className='mb-6'>
                <label className='block text-gray-700 font-medium mb-2' htmlFor='coupon-code'>
                    Code :
                </label>
                <div className='flex gap-2'>
                    <input
                      type="text"
                      id="coupon-code"
                      placeholder='Enter Code'
                      className='w-full border border-gray-300 rounded-md px-3 text-sm sm:text-base text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-400'
                    />
                    <button className='bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700'>
                      Apply
                    </button>
                </div>
            </div>
            <div className='border-t py-4'>
                <div className='flex justify-between text-gray-700 mb-2 text-sm sm:text-base'>
                    <span>Total</span>
                    <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className='w-full mt-4 bg-pink-500 text-gray-100 px-4 py-2 rounded-md
                hover:bg-pink-800 disabled:bg-gray-400 disabled:cursor-not-allowed
                text-sm sm:text-base cursor-pointer'>
                    Proceed to Checkout
                </div>
            </div>
          </div>
          </div>
       </div>
    </div>
  )
}

export default CartPage
