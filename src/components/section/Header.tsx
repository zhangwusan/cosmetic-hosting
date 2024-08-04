"use client"
import { useSession } from "next-auth/react";
import Link from "next/link";
import NavBar from "@/components/NavBar";
import { navbar_components } from "@/data/nav.definite";
import UserIcon from "@/public/svg/user.svg"
import Cart from "@/public/svg/cart.svg"
import Image from "next/image";
import Logo from "../Logo";

export default function Header({
    className,
}: {
    className?: string;
}) {
    const session = useSession();
    console.log(session.status);

    return (
        <div className={`${className}`}>
            <Logo footer={false}/>
            <NavBar components={navbar_components} className="flex justify-center items-center gap-5 mx-5" />
            <div className="flex gap-4">
                {session.status === "authenticated" && (
                    <>
                        <Link href={"/cart"}>
                            <Image
                                src={Cart}
                                alt="cart"
                            />
                        </Link>

                        <div className="flex gap-5">
                            <Link href={"/profile"}>
                                <Image
                                    src={UserIcon}
                                    alt="user"
                                />
                            </Link>
                        </div>
                    </>
                )}
                {session.status === "unauthenticated" && (
                    <div className="flex gap-4">
                        <button className="primary">
                            <Link href={"/login"}>Login</Link>
                        </button>
                        <button className="primary">
                            <Link href={"register"}>Register</Link>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );

}