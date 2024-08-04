"use client"

import { ProductForm, useProductContext } from "@/components/contexts/ProductContext";
import React, { useState, useEffect } from "react";
import { useSupplierContext } from "@/components/contexts/SupplierContext"; // Assuming you have a SupplierContext to get the suppliers
import { useRouter } from "next/navigation";

const CATEGORIES = [
    "Skincare",
    "Haircare",
    "Makeup",
    "Fragrance",
    "Bath & Body",
    "Others"
];

export default function AddProduct() {
    const router = useRouter();
    const [formData, setFormData] = useState<ProductForm>({
        name: "",
        category: "",
        brand: "",
        price: 0,
        stock: 0,
        discount: 0,
        images: [],
        rating: 0,
        supplier: "",
        description: "",
        images_url: []
    });

    const { suppliers } = useSupplierContext(); // Use the SupplierContext to get suppliers
    const { addProduct } = useProductContext();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFormData({ ...formData, images: Array.from(e.target.files) });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append('name', formData.name);
        formDataToSend.append('category', formData.category);
        formDataToSend.append('brand', formData.brand);
        formDataToSend.append('price', formData.price.toString());
        formDataToSend.append('stock', formData.stock.toString());
        formDataToSend.append('discount', formData.discount.toString());
        formDataToSend.append('rating', formData.rating.toString());
        formDataToSend.append('description', formData.description);
        formDataToSend.append('supplier', formData.supplier);

        // Append files
        formData.images.forEach((file, index) => {
            formDataToSend.append('images', file, file.name);
        });

        try {
            await addProduct(formDataToSend);
            router.push("/profile/products");
        } catch (error) {
            console.error(error);
            alert("Failed to add product");
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-md my-10">
            <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Product Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="brand" className="block text-sm font-medium text-gray-700">Brand</label>
                        <input
                            type="text"
                            id="brand"
                            name="brand"
                            value={formData.brand}
                            onChange={handleChange}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="stock" className="block text-sm font-medium text-gray-700">Stock</label>
                        <input
                            type="number"
                            id="stock"
                            name="stock"
                            value={formData.stock}
                            onChange={handleChange}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="discount" className="block text-sm font-medium text-gray-700">Discount</label>
                        <input
                            type="number"
                            id="discount"
                            name="discount"
                            value={formData.discount}
                            onChange={handleChange}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                    </div>
            
                    <div className="col-span-2">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows={4}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                    </div>

                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                        <select
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="mt-1 block w-full border-gray-300 rounded-2xl shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm appearance-none"
                        >
                            <option value="">Select a category</option>
                            {CATEGORIES.map(category => (
                                <option key={category} value={category}>{category}</option>
                            ))}
                        </select>
                    </div>

                    <div className="self-center">
                        <label htmlFor="supplier" className="block text-sm font-medium text-gray-700">Supplier</label>
                        <select
                            id="supplier"
                            name="supplier"
                            value={formData.supplier}
                            onChange={handleChange}
                            className="mt-1 block w-full border-gray-300 rounded-2xl shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm appearance-none"
                        >
                            <option value="">Select a supplier</option>
                            {suppliers && suppliers.map(supplier => (
                                <option key={String(supplier._id)} value={String(supplier._id)}>{supplier.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Add images */}
                <div>
                    <label htmlFor="images" className="block text-sm font-medium text-gray-700">Images</label>
                    <input
                        type="file"
                        id="images"
                        name="images"
                        multiple
                        onChange={handleFileChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                </div>

                <div className="mt-6">
                    <button
                        type="submit"
                        className="px-4 py-2 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        Save Product
                    </button>
                </div>
            </form>
        </div>
    );
}
