import { useCartContext } from '@/components/contexts/CartContext';
import { ProductType } from '@/models/Product';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React from 'react';


interface DisplayProductProps {
    paginatedProducts: ProductType[];
    currentPage: number;
    totalPages: number;
    handlePageChange: (page: number) => void;
}

export default function DisplayProduct({
    paginatedProducts,
    currentPage,
    totalPages,
    handlePageChange
}: DisplayProductProps) {
    const { addToCart } = useCartContext();
    const { data: session } = useSession();
    const userId = session?.user._id as string; 
    return (
        <div className="p-6 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {paginatedProducts.map((product, index) => (
                    <div key={index} className="border rounded-lg shadow-md p-4">
                        <Image
                            src={product.images_url[0]}
                            alt={product.name}
                            width={150}
                            height={200}
                            className="w-full h-48 object-cover rounded-md mb-4"
                        />
                        <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                        <p className="text-gray-600 mb-2">{product.category}</p>
                        <p className="text-lg font-bold">${product.price.toFixed(2)}</p>
                        <div className="mt-2">
                            <span className="text-yellow-500">{product.rating} ★</span>
                        </div>
                        <button className="w-full py-2 bg-blue-500 text-white rounded-md" onClick={() => addToCart(userId, product)}>Add to Cart</button>
                    </div>
                ))}
            </div>
            <div className="flex justify-between items-center mt-6">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300"
                >
                    Previous
                </button>
                <span className="text-lg text-gray-600">
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300"
                >
                    Next
                </button>
            </div>
        </div>
    );
}
