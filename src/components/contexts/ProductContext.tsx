"use client"

import { ProductType } from "@/models/Product";
import React, { createContext, useEffect } from "react";

export interface ProductForm {
    name: string;
    category: string;
    brand: string;
    price: number;
    stock: number;
    discount: number;
    rating: number;
    description: string;
    supplier: string; 
    images: File[];
    images_url: string[];
}

interface ProductProps {
    products: ProductType[] | undefined;
    setProducts: React.Dispatch<React.SetStateAction<ProductType[] | undefined>>;
    addProduct: (product: FormData) => Promise<void>;
    deleteProductById: (productId: string) => Promise<void>;
    updateProductById: (productId: string, product: FormData) => Promise<void>;
}

const ProductContext = createContext<ProductProps | null>(null);

export const useProductContext = () => {
    const context = React.useContext(ProductContext);
    if (!context) {
        throw new Error("useProductContext must be used within a ProductContextProvider");
    }
    return context;
}

const getProducts = async () => {
    try {
        const response = await fetch("/api/products", {
            method: "GET",
            headers: { 'Content-Type': 'application/json' },
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Failed to fetch products:', error);
        return [];
    }
}

const postProduct = async (product: FormData) => {
    try {
        const response = await fetch("/api/products", {
            method: "POST",
            body: product, // Directly send FormData
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Failed to add product:', error);
        return undefined;
    }
}

const deleteProduct = async (productId: string) => {
    try {
        await fetch(`/api/products/${productId}`, {
            method: "DELETE",
        });
    } catch (error) {
        console.error('Failed to delete product:', error);
    }
}

const updateProduct = async (productId: string, product: FormData) => {
    try {
        await fetch(`/api/products/${productId}`, {
            method: "PUT",
            body: product
        });
    } catch (error) {
        console.error('Failed to update product:', error);
    }
}

export default function ProductContextProvider({
    children
}: {
    children: React.ReactNode;
}) {
    const [products, setProducts] = React.useState<ProductType[] | undefined>([]);

    const refreshProducts = async () => {
        try {
            const products = await getProducts();
            setProducts(products);
        } catch (error) {
            console.error("Error fetching suppliers:", error);
        }
    }

    const addProduct = async (product: FormData) => {
        const newProduct = await postProduct(product);
        if (newProduct) {
            refreshProducts();
        }
    }
    // delete product by id
    const deleteProductById = async (productId: string) => {
        await deleteProduct(productId);
        refreshProducts();
    }

    // update product by id
    const updateProductById = async (productId: string, product: FormData) => {
        await updateProduct(productId, product);
        refreshProducts();
    }

    // Fetch products on mount
    useEffect(() => {
        refreshProducts();
    }, []); // Empty dependency array to run only on mount

    return (
        <ProductContext.Provider value={{ products, setProducts, addProduct, deleteProductById, updateProductById }}>
            {children}
        </ProductContext.Provider>
    );
}
