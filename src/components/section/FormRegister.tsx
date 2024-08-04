"use client"

import { signIn } from "next-auth/react";
import Link from "next/link";
import { FormEvent, useState } from "react";

export default function FormRegister({
    className,
}: {
    className?: string;
}) {
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [comfirmPassword, setComfirmPassword] = useState<string>("");


    const [userCreating, setUserCreating] = useState<boolean>(false);
    const [userCreated, setUserCreated] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    const handleSubmitRegister = async (ev: FormEvent<HTMLFormElement>) => {
        ev.preventDefault();

        setUserCreating(true);
        setUserCreated(false);

        try {

            if (password !== comfirmPassword) {
                setUserCreating(false);
                setError(true);
                return;
            }

            const res = await fetch("/api/register", {
                method: "POST",
                body: JSON.stringify({
                    name:username,
                    email,
                    password,
                }),
            });

            const data = await res.json();

            if (data.error) {
                setUserCreating(false);
                setError(true);
                return;
            }

            setUserCreated(true);
        } catch (err) {
            setUserCreating(false);
            setError(true);
            return;
        }
    }

    return (
        <div className={` ${className} text-center`}>
            <span className="text-3xl my-3 text-blue-600 font-bold" >Register</span>
            {userCreated && (
                <span> <br /> User is created seccessfull. <br /> Go to <Link className="text-blue-600 underline underline-offset-2" href={"/login"}>Login</Link> </span>
            )}
            <form className="block max-w-sm mx-auto" onSubmit={handleSubmitRegister} method="post">
                <input
                    type="text"
                    placeholder="Username"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    disabled={userCreating}
                />

                <input
                    type="email"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={userCreating}
                />

                <input
                    type="password"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={userCreating}
                />

                <input
                    type="password"
                    placeholder="Comfirm Password"
                    required
                    value={comfirmPassword}
                    onChange={(e) => setComfirmPassword(e.target.value)}
                    disabled={userCreating}
                />
                <div className="flex flex-col space-y-4">
                    <button
                        type="submit"
                    >
                        Register
                    </button>
                    <span>
                        or login with provider
                    </span>
                    <button onClick={() => signIn('google', {
                        callbackUrl: '/'
                    })}
                        className="border border-black px-3 py-2 rounded-2xl hover:shadow-lg hover:shadow-gray-400 hover:scale-105"
                    >
                        Google
                    </button>
                    <span className="pb-4">Have you a account already! <Link className="text-blue-600 underline underline-offset-2" href={"/login"}>visit Login</Link> </span>
                    {error && (
                        <span className="mb-4text-red-600 mt-2">Creating account isn&apos;t successfull</span>
                    )}
                </div>

            </form>
        </div>
    );
}