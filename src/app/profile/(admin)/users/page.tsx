"use client";

import DisplayManagement from "@/components/DisplayManagement";
import { useState } from 'react';
import DisplayManagementPart from '@/components/DisplayMangementPart';
import { useUserContext } from '@/components/contexts/UserContext';
import { UserType } from "@/models/User";

// or using fields
const fields = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
    { key: 'country', label: 'Country' },
    { key: 'admin', label: 'Admin', render: (value: boolean) => (value ? "Yes" : "No") },
];

const AdminUsers = () => {
    const { users, deleteUserById } = useUserContext();
    const [currentPage, setCurrentPage] = useState<number>(1);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    // Seperate user to display 12 on each page
    const USERS_PER_PAGE = 12;
    const totalPages = users !== undefined ? Math.ceil(users?.length / USERS_PER_PAGE) : 0;
    const startIndex = (currentPage - 1) * USERS_PER_PAGE;
    const endIndex = startIndex + USERS_PER_PAGE;
    const paginatedUsers = users?.slice(startIndex, endIndex);

    return (
        <DisplayManagementPart
            currentPage={currentPage}
            handlePageChange={handlePageChange}
            totalPages={totalPages}
        >
            <DisplayManagement
                name="users"
                object={paginatedUsers as UserType[]}
                deleteObjectByIdMethod={deleteUserById}
                fields={fields}
            />
        </DisplayManagementPart>
    );
};

export default AdminUsers;
