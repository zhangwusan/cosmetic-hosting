"use client"
import { useState } from "react";
import DisplayProduct from "@/components/DisplayProduct";
import { useProductContext } from "@/components/contexts/ProductContext";

export default function Category({
    params
}: {
    params: { category: string }
}) {
    const PRODUCTS_PER_PAGE = 9;
    const { category } = params;
    const { products } = useProductContext();
    const [currentPage, setCurrentPage] = useState<number>(1);



    // Filter products by category
    const productsByCategory = products?.filter(product => product.category === category);

    // Calculate pagination
    const totalProducts = productsByCategory?.length || 0;
    const totalPages = Math.ceil(totalProducts / PRODUCTS_PER_PAGE);
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    const endIndex = startIndex + PRODUCTS_PER_PAGE;
    const paginatedProducts = productsByCategory?.slice(startIndex, endIndex) || [];

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-4 text-center">Products in {category} category:</h1>
            {productsByCategory && productsByCategory.length > 0 ? (
                <DisplayProduct
                    paginatedProducts={paginatedProducts}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    handlePageChange={handlePageChange}
                />
            ) : (
                <p>No products found in this category.</p>
            )}
        </div>
    );
}
