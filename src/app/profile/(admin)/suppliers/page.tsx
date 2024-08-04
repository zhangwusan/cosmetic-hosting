"use client";

import DisplayManagement from "@/components/DisplayManagement";
import { useState } from 'react';
import DisplayManagementPart from '@/components/DisplayMangementPart';
import { useSupplierContext } from "@/components/contexts/SupplierContext";
import { SupplierType } from "@/models/Supplier";

const fields = [
    { key: 'name', label: 'Name' },
    { key: 'contact_name', label: 'Contact Name' },
    { key: 'phone_number', label: 'Phone Number' },
    { key: 'email', label: 'Email' },
];


const AdminSuppliers = () => {
    const { suppliers, deleteSupplierById } = useSupplierContext();
    const [currentPage, setCurrentPage] = useState<number>(1);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    // Seperate user to display 12 on each page
    const SUPPLIER_PER_PAGE = 12;
    const totalPages = suppliers !== undefined ? Math.ceil(suppliers?.length / SUPPLIER_PER_PAGE) : 0;
    const startIndex = (currentPage - 1) * SUPPLIER_PER_PAGE;
    const endIndex = startIndex + SUPPLIER_PER_PAGE;
    const paginatedSuppliers = suppliers?.slice(startIndex, endIndex);
    console.log(paginatedSuppliers)

    return (
        <DisplayManagementPart
            currentPage={currentPage}
            handlePageChange={handlePageChange}
            totalPages={totalPages}
        >
            <DisplayManagement
                name="suppliers"
                object={paginatedSuppliers as SupplierType[]}
                deleteObjectByIdMethod={deleteSupplierById}
                fields={fields}
            />
        </DisplayManagementPart>
    );
};

export default AdminSuppliers;
