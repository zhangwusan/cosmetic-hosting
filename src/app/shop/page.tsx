"use client"
import DisplayProduct from "@/components/DisplayProduct";
import { useProductContext } from "@/components/contexts/ProductContext";
import { ProductType } from "@/models/Product";
import { useState } from "react";

const PRODUCTS_PER_PAGE = 9;

export default function Shop() {
    const { products } = useProductContext();
    const [sortOrder, setSortOrder] = useState<string>("default");
    const [currentPage, setCurrentPage] = useState<number>(1);

    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSortOrder(event.target.value);
        setCurrentPage(1); // Reset to the first page on sorting change
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    if (!products) return <div>Loading...</div>;

    const sortedProducts = [...products].sort((a: any, b: any) => {
        switch (sortOrder) {
            case "rating":
                return b.rating - a.rating;
            case "latest":
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            case "price-low-high":
                return a.price - b.price;
            case "price-high-low":
                return b.price - a.price;
            case "popularity":
                return b.popularity - a.popularity; // Assuming popularity is the correct field
            default:
                return 0; // Default sorting (no change)
        }
    });

    // Calculate pagination
    const totalProducts = sortedProducts.length;
    const totalPages = Math.ceil(totalProducts / PRODUCTS_PER_PAGE);
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    const endIndex = startIndex + PRODUCTS_PER_PAGE;
    const paginatedProducts = sortedProducts.slice(startIndex, endIndex);

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-4">Shop</h1>
            <div className="flex items-center justify-between mb-6">
                <span className="text-lg text-gray-600">
                    Showing {startIndex + 1}-{Math.min(endIndex, totalProducts)} of {totalProducts} results
                </span>
                <div className="flex items-center space-x-4">
                    <label htmlFor="sorting" className="text-sm font-medium text-gray-700">
                        Sort by:
                    </label>
                    <select
                        id="sorting"
                        value={sortOrder}
                        onChange={handleSortChange}
                        className="bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm p-2"
                    >
                        <option value="default">Default sorting</option>
                        <option value="popularity">Sort by popularity</option>
                        <option value="rating">Sort by average rating</option>
                        <option value="latest">Sort by latest</option>
                        <option value="price-low-high">Sort by price: low to high</option>
                        <option value="price-high-low">Sort by price: high to low</option>
                    </select>
                </div>
            </div>
            <DisplayProduct
                paginatedProducts={paginatedProducts}
                currentPage={currentPage}
                totalPages={totalPages}
                handlePageChange={handlePageChange}
            />
        </div>
    );
}
