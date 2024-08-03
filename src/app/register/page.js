"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
export default function page() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [creatingUser, setCreatingUser] = useState(false);
    const [userCreate, setUserCreate] = useState(false);
    const [error, setError] = useState(false);
    async function handleFormSubmit(ev) {
        ev.preventDefault();
        setCreatingUser(true)
        setError(false)
        setUserCreate(false)

        const response = await fetch('/api/register', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' },

        });
        if (response.ok) {
            setUserCreate(true)
        }
        else {
            setError(true)
        }
        setCreatingUser(false)


    }
    return (
        <section className="mt-7">
            <h1 className="text-center text-4xl text-primary mb-4">
                Register
            </h1>
            {userCreate && (
                <div className="my-4 text-center">
                    User created.<br />
                    Now you can {''}
                    <Link className="underline" href={'/login'}>Login &raquo;</Link>

                </div>
            )}
            {error && (
                <div className="my-4 text-center">
                    An error has ocurred .<br />
                    please try again later

                </div>
            )}
            <form className="block max-w-xs mx-auto" onSubmit={handleFormSubmit}>
                <input type="email" placeholder="email" value={email}
                    disabled={creatingUser}
                    onChange={ev => setEmail(ev.target.value)} />
                <input type="password" placeholder="password" value={password}
                    disabled={creatingUser}
                    onChange={ev => setPassword(ev.target.value)}
                />
                <button type="submit" disabled={creatingUser}>Register</button>
                <div className="mt-4 text-center text-gray-500">
                    or login with provider
                </div>
                <button onClick={() => signIn('google', { callbackUrl: '/' })}
                    className="mt-2 flex gap-4 justify-center ">
                    <Image src={'/google.png'} alt={''} width={24} height={32} />
                    login with google
                </button>
                <div className="text-center my-4 text-gray-500 border-t pt-4">
                    Existing account? {''}
                    <Link className="underline" href={'/login'}>Login here&raquo;</Link>
                </div>
            </form>
        </section>
    )

}