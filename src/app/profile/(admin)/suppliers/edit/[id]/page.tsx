"use client";

import { SupplierForm, useSupplierContext } from "@/components/contexts/SupplierContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditSupplier({ params }: { params: { id: string } }) {
    const router = useRouter();
    const { suppliers, updateSupplierById } = useSupplierContext();
    const supplier = suppliers?.find((s) => s._id === params.id);
    const [formData, setFormData] = useState<SupplierForm>({
        name: "",
        contact_name: "",
        phone_number: "",
        email: "",
        address: "",
        city: "",
        state: "",
        postal_code: "",
        zip_code: "",
        country: ""
    });

    useEffect(() => {
        if (supplier) {
            setFormData({
                name: supplier.name,
                contact_name: supplier.contact_name,
                phone_number: supplier.phone_number,
                email: supplier.email,
                address: supplier.address,
                city: supplier.city,
                state: supplier.state,
                postal_code: supplier.postal_code,
                zip_code: supplier.zip_code,
                country: supplier.country
            });
        }
    }, [supplier]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData, // copy data
            [name]: value // update value of the input field
        });
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            console.log(formData);
            await updateSupplierById(params.id, formData);
            router.push("/profile/suppliers");
        } catch (error) {
            console.error(error);
            alert("Failed to update supplier");
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-8 bg-gray-50 rounded-lg shadow-md my-10">
            <h2 className="text-2xl font-bold mb-4">Update Supplier</h2>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Supplier Name</label>
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
                        <label htmlFor="contact_name" className="block text-sm font-medium text-gray-700">Contact Name</label>
                        <input
                            type="text"
                            id="contact_name"
                            name="contact_name"
                            value={formData.contact_name}
                            onChange={handleChange}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700">Phone</label>
                        <input
                            type="text"
                            id="phone_number"
                            name="phone_number"
                            value={formData.phone_number}
                            onChange={handleChange}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                        <input
                            type="text"
                            id="city"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
                        <input
                            type="text"
                            id="state"
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="postal_code" className="block text-sm font-medium text-gray-700">Postal Code</label>
                        <input
                            type="text"
                            id="postal_code"
                            name="postal_code"
                            value={formData.postal_code}
                            onChange={handleChange}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="zip_code" className="block text-sm font-medium text-gray-700">Zip Code</label>
                        <input
                            type="text"
                            id="zip_code"
                            name="zip_code"
                            value={formData.zip_code}
                            onChange={handleChange}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
                        <input
                            type="text"
                            id="country"
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                    </div>
                </div>
                <div className="mt-6">
                    <button
                        type="submit"
                        className="px-4 py-2 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        Save Supplier
                    </button>
                </div>
            </form>
        </div>
    );
}
