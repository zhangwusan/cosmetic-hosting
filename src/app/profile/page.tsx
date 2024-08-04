"use client";

import { signOut, useSession } from "next-auth/react";
import React, { FormEvent, useEffect, useState } from "react";

import UserImageEdit from "@/components/UserImageEdit";
import { useRouter } from "next/navigation";

export default function Profile() {
    const { data: session, status } = useSession<any>();
    const [dataForm, setDataForm] = useState({
        id: "",
        email: "",
        username: "",
        userImage: "",
        phone: "",
        street: "",
        city: "",
        country: "",
        postalCode: "",
        isAdmin: false,
    });
    const [isSaving, setIsSaving] = useState(false);
    const [isSaved, setIsSaved] = useState(false);

    const router = useRouter();

    const getUserById = async (id: string) => {
        const response = await fetch(`/api/users/${id}`);
        if (response.ok) {
            const { user } = await response.json();
            return user;
        } else {
            throw new Error("Failed to fetch user");
        }
    };

    useEffect(() => {
        const fetchUserData = async () => {
            if (!session || !session.user || !session.user._id) {
                return;
            }
            try {
                const userDoc = await getUserById(session.user._id as string);
                console.log(userDoc)
                setDataForm({
                    id: userDoc._id ?? "",
                    email: userDoc.email ?? "",
                    username: userDoc.name ?? "",
                    userImage: userDoc.image ?? "",
                    phone: userDoc.phone ?? "",
                    street: userDoc.street ?? "",
                    city: userDoc.city ?? "",
                    country: userDoc.country ?? "",
                    postalCode: userDoc.postalCode ?? "",
                    isAdmin: userDoc.isAdmin ?? false,
                });
            } catch (error) {
                console.error("Failed to fetch user data:", error);
            }
        };

        if (session?.user?._id) {
            fetchUserData();
        }
    }, [session?.user, router]);

    if (status === "loading") {
        return "Loading...";
    }

    if (status === "unauthenticated") {
        router.push('/');
        return null;
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setDataForm(prevData => ({
            ...prevData,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handleSubmitUpdate = async (ev: FormEvent<Element>) => {
        ev.preventDefault();
        setIsSaving(true);

        const response = await fetch("/api/profile", {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dataForm)
        });

        setIsSaving(false);

        if (response.ok) {
            setIsSaved(true);
            setTimeout(() => {
                setIsSaved(false);
            }, 2000);
        } else {
            alert("Failed to update profile");
        }
    };

    return (
        <>
            <div className="flex flex-col justify-center items-center space-y-4">
                {isSaved && (
                    <h4 className="border bg-green-300 w-64 text-center px-4 py-3 rounded-lg">Profile saved!</h4>
                )}
                {isSaving && (
                    <h4 className="border bg-blue-300 w-64 text-center px-4 py-3 rounded-lg">Saving...</h4>
                )}
                <UserImageEdit dataForm={dataForm} setDataForm={setDataForm} />
            </div>
            <form onSubmit={handleSubmitUpdate} className="flex flex-col justify-center items-center space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 mt-2">
                    <div className="col-span-2">
                        <label>User Name</label>
                        <input
                            type="text"
                            name="username"
                            value={dataForm.username}
                            onChange={handleChange}
                            className="border border-gray-300 p-2 rounded-lg w-full"
                        />
                    </div>
                    <div>
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={dataForm.email}
                            disabled
                            className="border border-gray-300 p-2 rounded-lg w-full"
                        />
                    </div>
                    <div>
                        <label>Phone</label>
                        <input
                            type="tel"
                            name="phone"
                            value={dataForm.phone}
                            onChange={handleChange}
                            className="border border-gray-300 p-2 rounded-lg w-full"
                        />
                    </div>
                    <div>
                        <label>Street</label>
                        <input
                            type="text"
                            name="street"
                            value={dataForm.street}
                            onChange={handleChange}
                            className="border border-gray-300 p-2 rounded-lg w-full"
                        />
                    </div>
                    <div>
                        <label>Postal Code</label>
                        <input
                            type="text"
                            name="postalCode"
                            value={dataForm.postalCode}
                            onChange={handleChange}
                            className="border border-gray-300 p-2 rounded-lg w-full"
                        />
                    </div>
                    <div>
                        <label>City</label>
                        <input
                            type="text"
                            name="city"
                            value={dataForm.city}
                            onChange={handleChange}
                            className="border border-gray-300 p-2 rounded-lg w-full"
                        />
                    </div>
                    <div>
                        <label>Country</label>
                        <input
                            type="text"
                            name="country"
                            value={dataForm.country}
                            onChange={handleChange}
                            className="border border-gray-300 p-2 rounded-lg w-full"
                        />
                    </div>
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg w-1/6">
                    Save
                </button>
            </form>
        </>
    );
}
