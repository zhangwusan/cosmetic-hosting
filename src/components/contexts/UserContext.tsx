import { UserType } from "@/models/User";
import React, { createContext, useEffect, useState } from "react";


export interface UserDataForm {
    [key: string]: string | File | boolean | undefined;
    email: string,
    name: string,
    urlImage: string,
    userImage: string,
    phone: string,
    street: string,
    city: string,
    country: string,
    postalCode: string,
    admin: boolean,
    id?: string,
}

interface UserProps {
    users: UserType[];
    updateUserById: (id: string, user: UserDataForm | FormData) => void;
    deleteUserById: (id: string) => void;
    addUser: (user: UserDataForm | FormData) => void;
}

const UserContext = createContext<UserProps | null>(null);


export const useUserContext = () => {
    const context = React.useContext(UserContext);
    if (!context) {
        throw new Error("useUserContext must be used within a UserContextProvider");
    }
    return context;
};
class UserService {
    async getAllUsers(): Promise<UserType[]> {
        const response = await fetch("/api/users");
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    }

    async createUser(user: UserDataForm | FormData): Promise<UserType> {
        const data = user instanceof FormData ? user : this.convertToFormData(user);
        const response = await fetch("/api/users", {
            method: "POST",
            body: data,
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    }

    async updateUser(id: string, user: UserDataForm | FormData): Promise<UserType> {
        const data = user instanceof FormData ? user : this.convertToFormData(user);
        const response = await fetch(`/api/users/${id}`, {
            method: "PUT",
            body: data,
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    }

    async deleteUser(id: string): Promise<string> {
        const response = await fetch(`/api/users/${id}`, {
            method: "DELETE",
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return "User deleted successfully";
    }

    private convertToFormData(user: UserDataForm): FormData {
        const data = new FormData();
        Object.keys(user).forEach((key) => {
            const user_key = user[key];
            if (typeof user_key === 'boolean') {
                data.append(key, user_key.toString());
            } else if (user_key instanceof File) {
                data.append(key, user_key, user_key.name);
            } else if (typeof user_key === 'string') {
                data.append(key, user_key);
            } else {
                // Handle other types if needed
                console.error(`Unsupported type for key: ${key}`);
            }
        });
        return data;
    }
}
export default function UserContextProvider({
    children
}: {
    children: React.ReactNode;
}) {
    const [users, setUsers] = useState<UserType[]>([]);
    const userService = new UserService();

    const refreshUsers = async () => {
        const usersDoc = await userService.getAllUsers();
        setUsers(usersDoc);
    }
    const addUser = async (formData: UserDataForm | FormData) => {
        const newUser = await userService.createUser(formData);
        refreshUsers();
    }
    const updateUserById = async (id: string, formData: UserDataForm | FormData) => {
        const updatedUser = await userService.updateUser(id, formData);
        refreshUsers();
    }
    const deleteUserById = async (id: string) => {
        await userService.deleteUser(id);
        refreshUsers();
    }


    useEffect(() => {
        refreshUsers();
    }, []);


    return (
        <UserContext.Provider value={{ users, addUser, deleteUserById, updateUserById }}>
            {children}
        </UserContext.Provider>
    );
}
