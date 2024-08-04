import Link from "next/link";

export default function Logo({
    footer = false
}: {
    footer: boolean;
}) {
    return (
        <Link href={"/"} className=" flex flex-col text-center">
            {footer ? (
                <>
                    <h1 className="font-bold text-black text-4xl">UL LINE</h1>
                    <span className=" text-lg font-normal text-gray-400">BEAUTY STORE</span>
                </>
            ) : (
                <>
                    <h1 className="font-bold text-primary text-4xl">UL LINE</h1>
                    <span className=" text-lg font-normal text-gray-300">BEAUTY STORE</span>
                </>
            )}
        </Link>
    );
} 