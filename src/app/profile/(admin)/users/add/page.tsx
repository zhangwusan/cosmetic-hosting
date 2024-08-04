"use client";

import { useRouter } from "next/navigation";
import { useUserContext } from "@/components/contexts/UserContext";
import AddManagement from "@/components/AddManagement";

const USER_FIELDS = [
    { name: "name", type: "text", label: "Name", required: true },
    { name: "email", type: "email", label: "Email", required: true },
    { name: "password", type: "password", label: "Password", required: true },
    { name: "phone", type: "text", label: "Phone" },
    { name: "address", type: "text", label: "Address" },
    { name: "city", type: "text", label: "City" },
    { name: "state", type: "text", label: "State" },
    { name: "postalCode", type: "text", label: "Postal Code" },
    { name: "country", type: "text", label: "Country" },
    { name: "urlImage", type: "text", label: "Profile Image URL" },
    { name: "userImage", type: "file", label: "Upload Image", className: "col-span-2", classNameInput: "w-60" },
    { name: "admin", type: "checkbox", label: "Admin" },
];

export default function AddUser() {
    const router = useRouter();
    const { addUser } = useUserContext();

    const handleSubmit = async (data: FormData) => {
        try {
            await addUser(data);
            router.push("/profile/users");
        } catch (error) {
            console.error("error " + error);
            alert("Failed to add user");
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-8 bg-gray-50 rounded-lg shadow-md my-10">
            <h2 className="text-2xl font-bold mb-4">Add New User</h2>
            <AddManagement
                fields={USER_FIELDS}
                initialValues={{}}
                onSubmit={handleSubmit}
                submitButtonText="Save User"
            />
        </div>
    );
}
