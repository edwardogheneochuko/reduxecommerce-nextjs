"use client"

import data from "../../public/data/data.json"
import ProductCard from '../../components/ProductCard'
import React, { useState } from "react"
import { FaTimes } from "react-icons/fa"

const ProductPage = () => {
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)
    const [sortOrder, setSortOrder] = useState("default")

    const [filters, setFilters] = useState({
        category: [],
        priceRange: [],
        availability: [],
        material: [],
        roomType: [],
        style: [],
    })

    const handleFilterChange = (filterType, value) => {
        setFilters((prev) => ({
            ...prev,
            [filterType]: prev[filterType].includes(value)
                ? prev[filterType].filter((v) => v !== value)
                : [...prev[filterType], value],
        }))
    }

    const priceRanges = {
        "$0 - $100": (price) => price >= 0 && price <= 100,
        "$100 - $300": (price) => price > 100 && price <= 300,
        "$300+": (price) => price > 300,
    }

    const filteredProducts = data.products.filter((product) => {
        return (
            (filters.category.length === 0 || filters.category.includes(product.category)) &&
            (filters.priceRange.length === 0 ||
                filters.priceRange.some((range) => priceRanges[range](product.price))) &&
            (filters.availability.length === 0 ||
                filters.availability.includes(product.inStock ? "In Stock" : "Out of Stock")) &&
            (filters.material.length === 0 || filters.material.includes(product.material)) &&
            (filters.roomType.length === 0 || filters.roomType.includes(product.roomType)) &&
            (filters.style.length === 0 || filters.style.includes(product.style))
        )
    })

    let sortedProducts = [...filteredProducts]

    if (sortOrder === "price-low") {
        sortedProducts.sort((a, b) => a.price - b.price)
    } else if (sortOrder === "price-high") {
        sortedProducts.sort((a, b) => b.price - a.price)
    } else if (sortOrder === "name") {
        sortedProducts.sort((a, b) => a.text.localeCompare(b.text))
    }

    const handleSort = (order) => {
        setSortOrder(order)
    }

    return (
        <div className="w-full max-w-7xl mx-auto my-12 px-4 max-[774px]:my-8 max-[774px]:px-3">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 max-[774px]:text-xl max-[774px]:mb-4 max-[774px]:pt-4">
                Products
            </h1>
            <div className="flex flex-col md:flex-row gap-6 max-[774px]:gap-4">
                {/* Sidebar Filter - hidden on mobile */}
                <div className="hidden min-[774px]:block w-full md:w-1/4 bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Filter Options</h3>
                    <div className="space-y-6">
                        {renderFilterGroup("Category", ["Furniture", "Lighting", "Decor"], "category")}
                        {renderFilterGroup("Price Range", ["$0 - $100", "$100 - $300", "$300+"], "priceRange")}
                        {renderFilterGroup("Availability", ["In Stock", "Out of Stock"], "availability")}
                        {renderFilterGroup("Material", ["Wood", "Metal", "Fabric", "Leather", "Grass", "Rattan"], "material")}
                        {renderFilterGroup("Room Type", ["Living Room", "Bedroom", "Dining Room", "Office", "Kids Room", "Kitchen"], "roomType")}
                        {renderFilterGroup("Style", ["Modern", "Traditional", "Mid-Century", "Bohemian", "Acoustic", "Minimalist", "Industrial", "Scandinavians"], "style")}
                    </div>
                </div>

                {/* Product Section */}
                <div className="w-full md:w-3/4">
                    <div className="flex justify-between items-center mb-6 max-[774px]:mb-4">
                        <h2 className="text-xl font-semibold text-gray-800 max-[774px]:text-base">
                            Products List ({sortedProducts.length})
                        </h2>
                        <div className="hidden min-[774px]:flex items-center gap-3">
                            <span className="text-gray-800 font-medium">Sort By:</span>
                            <select
                                className="border border-gray-300 rounded-md px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-400"
                                value={sortOrder}
                                onChange={(e) => handleSort(e.target.value)}
                            >
                                <option value="default">Newest</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                                <option value="name">Name: A to Z</option>
                            </select>
                        </div>
                    </div>

                    {/* Mobile filter + sort */}
                    <div className="min-[774px]:hidden sticky top-8 bg-transparent z-10 p-2">
                        <div className="flex items-center justify-between gap-2">
                            <button
                                className="bg-pink-400 text-white px-4 py-2 rounded-md text-sm font-medium flex-1 cursor-pointer"
                                onClick={() => setIsFilterModalOpen(true)}
                            >
                                Filters
                            </button>
                            <select
                                className="border border-gray-300 rounded-md px-2 py-1 text-gray-700 focus:outline-none focus:ring-pink-400 flex-1 cursor-pointer"
                                value={sortOrder}
                                onChange={(e) => handleSort(e.target.value)}
                            >
                                <option value="default">Newest</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                                <option value="name">Name: A to Z</option>
                            </select>
                        </div>
                    </div>

                    {/* Filter Modal for mobile */}
                    {isFilterModalOpen && (
                        <div
                            className="fixed inset-0 z-20 bg-gray-900 bg-opacity-30 flex justify-center items-center p-4 md:hidden"
                            onClick={() => setIsFilterModalOpen(false)}
                        >
                            <div
                                className="bg-white rounded-lg p-6 w-full max-w-md max-h-[80vh] overflow-y-auto shadow-lg z-30"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-xl font-semibold text-gray-800">Filters</h3>
                                    <button
                                        className="text-gray-700 hover:text-pink-400 text-lg cursor-pointer"
                                        onClick={() => setIsFilterModalOpen(false)}
                                    >
                                        <FaTimes />
                                    </button>
                                </div>
                                <div className="space-y-6">
                                    {renderFilterGroup("Category", ["Furniture", "Lighting", "Decor"], "category")}
                                    {renderFilterGroup("Price Range", ["$0 - $100", "$100 - $300", "$300+"], "priceRange")}
                                    {renderFilterGroup("Availability", ["In Stock", "Out of Stock"], "availability")}
                                    {renderFilterGroup("Material", ["Wood", "Metal", "Fabric", "Leather", "Grass", "Rattan"], "material")}
                                    {renderFilterGroup("Room Type", ["Living Room", "Bedroom", "Dining Room", "Office", "Kids Room", "Kitchen"], "roomType")}
                                    {renderFilterGroup("Style", ["Modern", "Traditional", "Mid-Century", "Bohemian", "Acoustic", "Minimalist", "Industrial", "Scandinavians"], "style")}
                                </div>
                                <button
                                    className="mt-6 w-full bg-pink-400 text-white px-4 py-2 rounded-md text-base font-medium"
                                    onClick={() => setIsFilterModalOpen(false)}
                                >
                                    Apply Filters
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Product Cards */}
                    <div className="grid grid-cols-1 gap-6 max-[774px]:gap-3 min-[774px]:grid-cols-2 md:grid-cols-2">
                        {sortedProducts.map((product) => (
                            <div key={product.id}>
                                <ProductCard
                                    id={product.id}
                                    inStock={product.inStock}
                                    image={product.image}
                                    text={product.text}
                                    price={`${product.price}`}
                                    category={product.category}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )

    function renderFilterGroup(label, options, filterType) {
        return (
            <div>
                <h4 className="text-lg font-medium text-gray-800">{label}</h4>
                {options.map((option) => (
                    <label key={option} className="block mt-2">
                        <input
                            type="checkbox"
                            className="mr-2"
                            checked={filters[filterType].includes(option)}
                            onChange={() => handleFilterChange(filterType, option)}
                        />
                        {option}
                    </label>
                ))}
            </div>
        )
    }
}

export default ProductPage
