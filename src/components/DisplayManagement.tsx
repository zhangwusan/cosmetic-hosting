"use client";

import AddIcon from "@/public/svg/add.svg";
import Image from 'next/image';
import Link from 'next/link';

interface Field {
    key: string;
    label: string;
    render?: (value: any) => React.ReactNode;
}

interface DisplayManagementProps {
    name: string;
    object: { [key: string]: any }[];
    deleteObjectByIdMethod: (id: string) => void;
    fields: Field[];
}

const DisplayManagement = ({
    name,
    object,
    deleteObjectByIdMethod,
    fields
}: DisplayManagementProps) => {
    return (
        <div>
            <div className='flex justify-between items-center border-b-2 pb-5 border-black'>
                <h1>Management {name}</h1>
                <Link href={`/profile/${name}/add`}>
                    <Image src={AddIcon} alt="add" width={48} height={48} />
                </Link>
            </div>
            <table className="min-w-full divide-y divide-gray-200">
                {/* Header table */}
                <thead className='bg-gray-50'>
                    <tr>
                        {fields.map(field => (
                            <th key={field.key} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                {field.label}
                            </th>
                        ))}
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Action
                        </th>
                    </tr>
                </thead>
                {/* Body table */}
                <tbody className="bg-white divide-y divide-gray-200">
                    {object && object.map((obj, index) => (
                        <tr key={index}>
                            {fields.map(field => (
                                <td key={field.key} className="px-6 py-4 whitespace-nowrap">
                                    {field.render ? field.render(obj[field.key]) : (obj[field.key] ?? 'N/A')}
                                </td>
                            ))}
                            <td className="px-6 py-4 whitespace-nowrap">
                                <Link href={`/profile/${name}/edit/${String(obj._id)}`} className="text-indigo-600 hover:text-indigo-900">Edit</Link>
                                <button
                                    onClick={() => deleteObjectByIdMethod(String(obj._id))}
                                    className="ml-4 text-red-600 hover:text-red-900"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DisplayManagement;
