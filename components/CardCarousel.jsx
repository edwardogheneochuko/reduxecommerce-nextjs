import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import Slider from 'react-slick/lib/slider';
import ProductCard from './ProductCard';

const PrevArrow = ({ onClick }) => (
  <button
    className='absolute left-[-10px] top-1/2 transform -translate-y-1/2 bg-white
    text-black shadow-md p-2 rounded-full hover:bg-pink-400 hover:text-white
    cursor-pointer transition-colors z-10 outline-none'
    onClick={onClick}
  >
    <FaArrowLeft size={20} />
  </button>
);

const NextArrow = ({ onClick }) => (
  <button
    className='absolute right-[-10px] top-1/2 transform -translate-y-1/2 bg-white
    text-black shadow-md p-2 rounded-full hover:bg-pink-400 hover:text-white
    cursor-pointer transition-colors z-10 outline-none'
    onClick={onClick}
  >
    <FaArrowRight size={20} />
  </button>
);

const CardCarousel = ({ title, cards }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024, // below 1024px
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768, // below 768px
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 680, // below 680px
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <div className='w-full max-w-7xl mx-auto my-32 px-4'>
      <div className='flex justify-between items-center mb-6'>
        <h2 className='text-xl sm:text-3xl md:text-4xl font-bold text-gray-800'>
          {title}
        </h2>
        <Link href="/products">
          <span className='text-lg text-gray-400 hover:text-pink-400'>
            View More
          </span>
        </Link>
      </div>
      <div className='relative'>
        <Slider {...settings}>
          {cards.map((card, index) => (
            <div className='px-2' key={index}>
              <ProductCard
                image={card.image}
                text={card.text}
                price={card.price}
                id = {card.id}
                category= {card.category}
                inStock= {card.inStock}
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default CardCarousel;
