"use client";

import { signIn } from "next-auth/react";
import { FormEvent, useState } from "react";

export default function FormLogin({
    className,
}: {
    className?: string;
}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userLogging, setUserLogging] = useState<boolean>(false);

    const handleLogin = async (ev: FormEvent<HTMLFormElement>) => {
        ev.preventDefault();
        setUserLogging(true);

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.match(emailRegex)) {
            setUserLogging(false);
            throw new Error("Invalid email");
        }

        const result = await signIn('credentials', {
            email,
            password,
            callbackUrl: '/',
        });

        if (result?.error) {
            setUserLogging(false);
            alert(result.error);
        }

        setUserLogging(false);
    };

    return (
        <div className={`${className} text-center`}>
            <span className="text-3xl my-3 text-blue-600 font-bold">Login</span>
            <form className="block max-w-sm mx-auto" onSubmit={handleLogin}>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full mb-4 p-2 border border-gray-300 rounded"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full mb-4 p-2 border border-gray-300 rounded"
                />
                <button className="w-full bg-blue-500 text-white p-2 rounded" type="submit" disabled={userLogging}>
                    Login
                </button>
                <span className="block my-4">or login with provider</span>
                <button
                    type="button"
                    onClick={() => signIn('google', { callbackUrl: '/' })}
                    className="w-full border border-black px-3 py-2 my-4 rounded-2xl hover:shadow-lg hover:shadow-gray-400 hover:scale-105"
                >
                    Google
                </button>
            </form>
        </div>
    );
}
