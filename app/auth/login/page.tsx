"use client";

import React, { useState } from 'react'
import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    const router = useRouter();
    const { data: session } = useSession();

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const res = await signIn("credentials", {
            email,
            password,
            redirect: false,
        })

        if (res?.error) {
            setError("Invalid credentials");
            return;
        }

        if (session?.user?.id) {
            router.push(`/profile/${session.user.id}`);
        }
    }

    return (
        <div>
            {error && <div style={{ color: "red" }}>{error}</div>}
            <form onSubmit={handleLogin}>
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='johndoe@gmail.com' />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='***********' />
            </form>
            <button type='submit'>Login</button>
        </div>
    )
}

export default LoginPage