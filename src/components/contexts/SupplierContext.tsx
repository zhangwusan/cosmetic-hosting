"use client";

import { SupplierType } from "@/models/Supplier"; // Adjust path as needed
import React, { createContext, useEffect, useState } from "react";

export interface SupplierForm {
    name: string,
    contact_name: string,
    phone_number: string,
    email: string,
    address: string,
    city: string,
    state: string,
    postal_code: string,
    zip_code: string,
    country: string
}

interface SupplierProps {
    suppliers: SupplierType[] | undefined;
    setSuppliers: React.Dispatch<React.SetStateAction<SupplierType[] | undefined>>;
    addSupplier: (supplier: SupplierForm) => Promise<void>;
    deleteSupplierById: (supplierId: string) => Promise<void>;
    updateSupplierById: (supplierId: string, supplier: SupplierForm) => Promise<void>;
}

const SupplierContext = createContext<SupplierProps | null>(null);

export const useSupplierContext = () => {
    const context = React.useContext(SupplierContext);
    if (!context) {
        throw new Error("useSupplierContext must be used within a SupplierContextProvider");
    }
    return context;
};

// Fetch suppliers
const getSuppliers = async (): Promise<SupplierType[]> => {
    const response = await fetch("/api/suppliers", {
        method: "GET",
        headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch suppliers");
    }

    const data = await response.json();
    return data;
};

// Add a new supplier
const postSupplier = async (supplier: SupplierForm): Promise<SupplierType> => {
    const response = await fetch("/api/suppliers", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(supplier),
    });

    if (!response.ok) {
        throw new Error("Failed to add supplier");
    }

    const data = await response.json();
    return data;
};

// Delete supplier by id
const deleteById = async (supplierId: string): Promise<void> => {
    const response = await fetch(`/api/suppliers/${supplierId}`, {
        method: "DELETE",
        headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
        throw new Error("Failed to delete supplier");
    }
};

// Update supplier by id
const updateById = async (supplierId: string, supplier: SupplierForm): Promise<void> => {
    const response = await fetch(`/api/suppliers/${supplierId}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(supplier),
    });

    if (!response.ok) {
        throw new Error("Failed to update supplier");
    }
};

// Create SupplierContextProvider component
export default function SupplierContextProvider({
    children
}: {
    children: React.ReactNode;
}) {
    const [suppliers, setSuppliers] = useState<SupplierType[] | undefined>(undefined);

    // Refresh supplier information
    const refreshSuppliers = async () => {
        try {
            const data = await getSuppliers();
            setSuppliers(data);
        } catch (error) {
            console.error("Error fetching suppliers:", error);
        }
    };

    // Add a new supplier
    const addSupplier = async (supplier: SupplierForm) => {
        try {
            const newSupplier = await postSupplier(supplier);
            if (newSupplier) {
                await refreshSuppliers();
            }
        } catch (error) {
            console.error("Error adding supplier:", error);
        }
    };

    // Delete a supplier by ID
    const deleteSupplierById = async (supplierId: string) => {
        try {
            await deleteById(supplierId);
            await refreshSuppliers();
        } catch (error) {
            console.error("Error deleting supplier:", error);
        }
    };

    // Update a supplier by ID
    const updateSupplierById = async (supplierId: string, supplier: SupplierForm) => {
        try {
            await updateById(supplierId, supplier);
            await refreshSuppliers();
        } catch (error) {
            console.error("Error updating supplier:", error);
        }
    };

    // Fetch suppliers on mount
    useEffect(() => {
        refreshSuppliers();
    }, []);

    return (
        <SupplierContext.Provider value={{
            suppliers, 
            setSuppliers, 
            addSupplier, 
            deleteSupplierById,
            updateSupplierById
        }}>
            {children}
        </SupplierContext.Provider>
    );
}
