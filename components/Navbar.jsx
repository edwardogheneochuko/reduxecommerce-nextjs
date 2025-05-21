
"use client"

import Link from "next/link"
import { useState } from "react"
import {FaTruck, FaHeart, FaShoppingCart, FaTimes, FaBars} from "react-icons/fa"
import { useSelector } from "react-redux"

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

    // get cart from redux 
    const cartItems = useSelector((state) => state.cart.items);
    const cartItemCount = cartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );

    // wish
    const wishlistItems = useSelector((state) => state.wishlist.items)
    const wishlistItemCount = wishlistItems.length

  return (
    <nav className="sticky top-0 z-50 bg-slate-50 px-6 py-4 flex items-center
    justify-between">
        {/* Logo */}
        <div className="flex flex-col leading-tight">
            <span className="text-lg md:text-2xl font-bold text-pink-600">
                Commerce
            </span>
            <span className="text-sm text-gray-500 tracking-widest self-center">
                Shopping Store
            </span>
        </div>
        {/*center section */}
        <ul className="hidden md:flex gap-8 text-gray-700 font-medium">
            <li>
                <Link href="/" className="hover:text-pink-500">Home</Link>
            </li>
            <li className="hover:text-pink-400 cursor-pointer">New Arrivals</li>
            <li className="hover:text-pink-400 cursor-pointer">Top Sellers</li>
            <li>
                <Link href="/products" className="hover:text-pink-400">
                  Products
                </Link>
            </li>
        </ul>
        {/* right section icons */}
        <div className="flex items-center gap-6 text-gray-700 text-xl">
            <div className="flex gap-6">
                <FaTruck className="hover:text-pink-400" />
                <Link href="/wishlist" className="relative">
                  <FaHeart className="hover:text-pink-400" />
                  {wishlistItemCount > 0 && (
                    <span className="absolute -top-3 right-3 ring-2
                     text-xs text-white bg-red-400 rounded-full px-1.5 py-0.5">
                      {wishlistItemCount }
                    </span>
                  )}
                </Link>
                <Link href="/cart" className="relative">
                  <FaShoppingCart className="hover:text-pink-400"/>
                  {cartItemCount > 0 && (
                    <span className="absolute -top-3 right-3 text-xs text-white bg-pink-400
                    rounded-full px-1.5 py-0.5 ring-1">
                      {cartItemCount }
                    </span>
                  )}
                </Link>
            </div>

            {/* menu icon */}
            <div className="md:hidden flex">
                <button onClick={toggleMenu}>
                    {isMenuOpen ? <FaBars className="text-2xl hover:text-pink-400"/>
                     : <FaTimes className="text-2xl hover:text-pink-400" />}
                </button>
            </div> 
        </div>
        {!isMenuOpen && <ul className="absolute top-full left-0 w-full bg-white flex
        flex-col items-center gap-4 py-4 text-gray-400 font-medium md:hidden shadow-md">
           <li>
            <Link href="/" className="hover:text-pink-400" onClick={toggleMenu}>
              Home
            </Link>
           </li>
           <li className="hover:text-pink-400"onClick={toggleMenu}> New Arrivals </li>
           <li className="hover:text-pink-400"onClick={toggleMenu}> Top Sellers </li>
           <li>
            <Link href="/products"className="hover:text-pink-400"onClick={toggleMenu}>
              Products
            </Link>
           </li>
        </ul>}
    </nav>
  )
}

export default Navbar