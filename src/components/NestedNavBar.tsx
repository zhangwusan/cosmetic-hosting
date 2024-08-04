"use client";

import Link from "next/link";
import { useState } from "react";

export interface NestedNavBarComponentType {
    title: string;
    route: string;
    subroutes?: Array<{
        title: string;
        route: string;
    }>;
}

interface NavBarProps {
    components: NestedNavBarComponentType[];
    className?: string;
}

export default function NavBar({ components = [], className = "" }: NavBarProps) {
    const [active, setActive] = useState<string | null>(null);

    return (
        <nav className={`${className}`}>
            {components.map((component) => (
                <div key={component.route} className="relative group">
                    <Link
                        href={`/${component.route}`}
                        className={`block py-2 px-4 ${active === component.route ? 'bg-gray-300' : ''}`}
                        onMouseEnter={() => setActive(component.route)}
                        onMouseLeave={() => setActive(null)}
                    >
                        {component.title}
                    </Link>
                    {component.subroutes && (
                        <div
                            className={`absolute top-5 mt-3 hidden group-hover:block bg-white shadow-lg rounded`}
                            onMouseEnter={() => setActive(component.route)}
                            onMouseLeave={() => setActive(null)}
                        >
                            {component.subroutes.map((subroute) => (
                                <Link
                                    key={subroute.route}
                                    href={`/${component.route}/${subroute.route}`}
                                    className={`block py-2 px-4 whitespace-nowrap ${active === subroute.route ? 'bg-gray-300' : ''} hover:bg-gray-300`}
                                >
                                    {subroute.title}
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </nav>
    );
}
