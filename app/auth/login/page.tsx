"use client";

import React, { useEffect, useState } from 'react'
import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();
    const { data: session } = useSession();

    // useEffect(() => {
    //     if (session?.user?.id) {
    //         router.push(`/profile/${session.user.id}`)
    //     }
    // }, [session, router])

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        const res = await signIn("credentials", {
            email,
            password,
            redirect: false,
        })

        if (res?.error) {
            setError("Invalid credentials");
        }

        if (session?.user?.id) {
            router.push(`/profile/${session.user.id}`)
        }
    }

    return (
        <div>
            {error && <div>{error}</div>}
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='johndoe@gmail.com' />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='***********' />
            <button onClick={handleLogin}>Login</button>
        </div>
    )
}

export default LoginPage