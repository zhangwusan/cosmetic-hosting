import Link from "next/link";

export interface NavBarComponentType {
    title: string;
    route: string;
}
interface NavBarProps {
    components: NavBarComponentType[];
    className?: string;
}

export default function NavBar({ components, className }: NavBarProps) {
    return (
        <nav className={`${className}`}>
            {components.map((component) => (
                <Link
                    key={component.route}
                    href={`${component.route}`}
                    className="nav-link"
                >
                    {component.title}
                </Link>
            ))}
        </nav>
    )
}