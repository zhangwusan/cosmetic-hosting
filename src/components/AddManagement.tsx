"use client";

import { useState } from "react";

interface FormField {
    name: string;
    type: string;
    label: string;
    className?: string;
    classNameLabel?: string;
    classNameInput?: string;
    required?: boolean;
    options?: { value: string; label: string }[]; // For select fields
    placeholder?: string;
}

interface AddManagementProps {
    fields: FormField[];
    initialValues: Record<string, any>;
    onSubmit: (data: FormData) => void;
    submitButtonText: string;
}

export default function AddManagement({
    fields,
    initialValues,
    onSubmit,
    submitButtonText
}: AddManagementProps) {
    const [formData, setFormData] = useState<Record<string, any>>(initialValues);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        if (type === "checkbox") {
            setFormData({
                ...formData,
                [name]: (e.target as HTMLInputElement).checked
            });
        } else if (type === "file") {
            const file = (e.target as HTMLInputElement).files?.[0];
            setFormData({
                ...formData,
                [name]: file
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formDataObj = new FormData();

        Object.keys(formData).forEach((key) => {
            if (formData[key] instanceof File) {
                formDataObj.append(key, formData[key] as File);
            } else {
                formDataObj.append(key, formData[key]);
            }
        });
        onSubmit(formDataObj);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {fields.map((field) => (
                    <div key={field.name} className={field.className}>
                        <label htmlFor={field.name} className={field.classNameLabel || "block text-sm font-medium text-gray-700"}>
                            {field.type === 'checkbox' ? "" : field.label}
                        </label>
                        {field.type === "select" ? (
                            <select
                                id={field.name}
                                name={field.name}
                                value={formData[field.name] || ""}
                                onChange={handleChange}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            >
                                {field.options?.map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        ) : field.type === "checkbox" ? (
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id={field.name}
                                    name={field.name}
                                    checked={formData[field.name] || false}
                                    onChange={handleChange}
                                    className="form-checkbox h-4 w-4 text-indigo-600"
                                />
                                <label
                                    htmlFor={field.name}
                                    className="ml-2 block text-sm text-gray-900"
                                >
                                    {field.label}
                                </label>
                            </div>
                        ) : field.type === "file" ? (
                            <input
                                type="file"
                                id={field.name}
                                name={field.name}
                                onChange={handleChange}
                                className={field.classNameInput || "mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"}
                            />
                        ) : (
                            <input
                                type={field.type}
                                id={field.name}
                                name={field.name}
                                value={formData[field.name] || ""}
                                onChange={handleChange}
                                placeholder={field.placeholder}
                                className={field.classNameInput || "mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"}
                            />
                        )}
                    </div>
                ))}
            </div>
            <div className="flex justify-center items-center">
                <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    {submitButtonText}
                </button>
            </div>
        </form>
    );
}
