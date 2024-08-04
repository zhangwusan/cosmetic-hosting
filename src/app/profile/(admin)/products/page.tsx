"use client";

import { useProductContext } from '@/components/contexts/ProductContext';
import DisplayManagement from "@/components/DisplayManagement";
import { ProductType } from '@/models/Product';
import { useState } from 'react';
import DisplayManagementPart from '@/components/DisplayMangementPart';

// or using fields
const fields = [
    { key: 'name', label: 'Name' },
    { key: 'description', label: 'Description' },
    { key: 'price', label: 'Price' },
    { key: 'category', label: 'Category' },
    { key: 'stock', label: 'Stock' },
    { key: 'supplier', label: 'Supplier' },
];

const AdminProducts = () => {
    const { products, deleteProductById } = useProductContext();
    const [currentPage, setCurrentPage] = useState<number>(1);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    // Seperate products to display 12 on each page
    const PRODUCTS_PER_PAGE = 12;
    const totalPages = products !== undefined ? Math.ceil(products?.length / PRODUCTS_PER_PAGE) : 0;
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    const endIndex = startIndex + PRODUCTS_PER_PAGE;
    const paginatedProducts = products?.slice(startIndex, endIndex);

    return (
        <DisplayManagementPart
            currentPage={currentPage}
            handlePageChange={handlePageChange}
            totalPages={totalPages}
        >
            <DisplayManagement
                name="products"
                object={paginatedProducts as ProductType[]}
                deleteObjectByIdMethod={deleteProductById}
                fields={fields}
            />
        </DisplayManagementPart>
    );
};

export default AdminProducts;
