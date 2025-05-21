
import { addToWishList, removeFromWishList } from '../lib/wishSlice';
import { addToCart, removeFromCart } from '../lib/cartSlice';

import Image from 'next/image';
import React from 'react';
import toast from 'react-hot-toast';
import { FaCheck, FaHeart, FaShoppingCart } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';


const ProductCard = ({ id, image, text, price, category, inStock }) => {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);
  const isInCart = cartItems.some((item) => item.id === id);

  const wishlistItems = useSelector((state) => state.wishlist.items);
  const isInWishlist = wishlistItems.some((item) => item.id === id);

  const handleToggleWish = () => {
    if (isInWishlist) {
      dispatch(removeFromWishList(id));
      toast.success("Removed from WishList", {
        duration: 3000,
        position: "bottom-center",
        icon: <FaCheck className='text-white' />,
        style: {
          background: "#ef4444",
          color: "white",
          fontSize: "16px",
          padding: "12px 20px",
          borderRadius: "6px",
          transition: "opacity .3s ease",
        },
      });
    } else {
      dispatch(addToWishList({ id, image, text, price, category, inStock }));
      toast.success("Successfully Added to WishList", {
        duration: 3000,
        position: "bottom-center",
        icon: <FaCheck className='text-white' />,
        style: {
          background: "green",
          color: "white",
          fontSize: "16px",
          padding: "12px 20px",
          borderRadius: "6px",
          transition: "opacity .3s ease",
        },
      });
    }
  };

  const handleToggleCart = () => {
    if (isInCart) {
      dispatch(removeFromCart(id));
      toast.success("Removed from Cart", {
        duration: 3000,
        position: "bottom-center",
        icon: <FaCheck className='text-white' />,
        style: {
          background: "#ef4444",
          color: "white",
          fontSize: "16px",
          padding: "12px 20px",
          borderRadius: "6px",
          transition: "opacity .3s ease",
        },
      });
    } else {
      dispatch(addToCart({ id, image, text, price, quantity: 1 }));
      toast.success("Successfully Added to Cart", {
        duration: 3000,
        position: "bottom-center",
        icon: <FaCheck className='text-white' />,
        style: {
          background: "green",
          color: "white",
          fontSize: "16px",
          padding: "12px 20px",
          borderRadius: "6px",
          transition: "opacity .3s ease",
        },
      });
    }
  };

  return (
    <div className='bg-white rounded-lg shadow-lg overflow-visible flex flex-col'>
      <div className='relative w-full h-[200px]'>
        <Image src={image} alt={text || 'Product Image'} fill style={{ objectFit: 'cover' }} />
      </div>
      <h3 className='text-lg font-semibold text-gray-800 px-4 pt-2 pb-4'>{text}</h3>
      <div className='flex items-center justify-between px-4 pt-0'>
        <span className='text-xl font-bold text-gray-700'>${price}</span>
        <div className='flex space-x-3'>
          <FaHeart
            className={`${isInWishlist ? "text-red-500" : "text-gray-400"}
             hover:text-red-500 cursor-pointer`}
            onClick={handleToggleWish}
          />
          <FaShoppingCart
            className={`cursor-pointer ${isInCart ? 'text-green-500' : 'text-gray-500 hover:text-green-500'}`}
            onClick={handleToggleCart}
          />
        </div>
      </div>
    </div>
  );
};


export default ProductCard;
