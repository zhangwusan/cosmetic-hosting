"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Tabs({
    isAdmin,
    className,
}: {
    isAdmin: boolean;
    className?: string;
}) {
    const path = usePathname();

    const routetable = [
        {
            name: "Products",
            url: "/profile/products"
        }, 
        {
            name: "Suppliers",
            url: "/profile/suppliers"
        },
        {
            name: "Users",
            url: "/profile/users"
        }
    ]

    return (
        <div className={`flex flex-col justify-start text-2xl space-y-4 tabs ${className}`}>
            <Link href="/profile" className={path === "/profile" ? "active" : ""}>
                Profile
            </Link>
            {isAdmin && routetable.map((route) => (
                <Link href={route.url} key={route.name} className={path === route.url ? "active" : ""}>
                    {route.name}
                </Link>
            ))}
        </div>
    )
}
