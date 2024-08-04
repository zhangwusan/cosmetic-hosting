"use client";

import AddManagement from "@/components/AddManagement";
import UserImageEdit from "@/components/UserImageEdit";
import { UserDataForm, useUserContext } from "@/components/contexts/UserContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const USER_FIELDS = [
    { name: "name", type: "text", label: "Name", required: true },
    { name: "email", type: "email", label: "Email", required: true },
    { name: "phone", type: "text", label: "Phone" },
    { name: "street", type: "text", label: "Street" },
    { name: "city", type: "text", label: "City" },
    { name: "country", type: "text", label: "Country" },
    { name: "postalCode", type: "text", label: "Postal Code" },
    { name: "admin", type: "checkbox", label: "Admin" },
];

interface UpdateUserProps {
    params: { id: string };
}

export default function UpdateUser({ params }: UpdateUserProps) {
    const router = useRouter();
    const { id } = params;
    const { users, updateUserById } = useUserContext();
    const [dataForm, setDataForm] = useState<UserDataForm | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const foundUser = users.find((u) => u._id === params.id);
        if (foundUser) {
            console.log(foundUser)
            setDataForm({
                id: id,
                email: foundUser.email,
                name: foundUser.name,
                urlImage: foundUser.image as string,
                userImage: foundUser.image as string,
                phone: foundUser.phone as string,
                street: foundUser.street as string,
                city: foundUser.city as string,
                country: foundUser.country as string,
                postalCode: foundUser.postalCode as string,
                admin: foundUser.admin,
            });
            setLoading(false);
        } else {
            setError("User not found");
            setLoading(false);
        }
    }, [users, params.id]);

    const handleSubmit = async (data: FormData) => {
        try {
            await updateUserById(params.id, data);
            router.push("/profile/users");
        } catch (error) {
            console.error("Error updating user:", error);
            setError("Failed to update user");
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    if (!dataForm) {
        return <p>No data available</p>;
    }

    return (
        <div className="max-w-4xl mx-auto p-8 bg-gray-50 rounded-lg shadow-md my-10">
            <div className="flex flex-col justify-center items-center my-4">
                <h2 className="text-2xl font-bold mb-4">Update User</h2>
                <UserImageEdit dataForm={dataForm} setDataForm={setDataForm} />
            </div>
            <AddManagement
                fields={USER_FIELDS}
                initialValues={dataForm}
                onSubmit={handleSubmit}
                submitButtonText="Save User"
            />
        </div>
    );
}
