


import Categories from '../../components/Categories'
import NewArrival from '../../components/NewArrival'
import SliderComponent from '../../components/SliderComp'
import TopSellers from '../../components/TopSellers'
import React from 'react'

const HomePage = () => {
  return (
    <div>
        <SliderComponent />
        <Categories />
        <NewArrival />
        <TopSellers />
    </div>
  )
}

export default HomePage