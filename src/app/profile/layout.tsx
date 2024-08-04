"use client";

import { signOut, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import Tabs from "@/components/Tabs";
import { redirect } from "next/navigation";
import Image from "next/image";
import ExitIcon from "@/public/svg/arrow-right-start.svg";
import SupplierContextProvider from "@/components/contexts/SupplierContext";
import UserContextProvider from "@/components/contexts/UserContext";

export default function Profile({
    children
}: {
    children: React.ReactNode;
}) {
    const { data: session, status } = useSession();

    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const user = session?.user;

    console.log(session)
    useEffect(() => {
        if (user?.admin) {
            setIsAdmin(user.admin);
        }
    }, [user]);

    useEffect(() => {
        if (status === "unauthenticated") {
            return redirect('/')
        }
    }, [status]);

    if (status === "loading") {
        return "Loading...";
    }

    return (

        <div className="flex w-full bg-secondary relative min-h-screen">
            <Tabs isAdmin={isAdmin} className="w-42 sm:w-52 lg:w-64 p-4" />
            <div className="items-center w-full border-l-2 border-black bg-secondary-light px-52 pt-12">
                <button className="primary rounded-full absolute right-10 top-0" onClick={() => signOut({
                    callbackUrl: '/',
                })}>
                    <Image src={ExitIcon} alt="exit button" />
                </button>
                <UserContextProvider>
                    <SupplierContextProvider>
                        {children}
                    </SupplierContextProvider>
                </UserContextProvider>
            </div>
        </div>
    );
}
