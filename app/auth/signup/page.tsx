"use client"

import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const SignupPage = () => {
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    const router = useRouter();

    const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const res = await fetch("/api/auth/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username, email, password
            }),
        });

        if (!res.ok) {
            const data = await res.json()
            setError(data.error);
            return
        }

        return router.push("/auth/login");
    }

    return (
        <div>
            {error && <div style={{ color: "red" }}>{error}</div>}
            <form onSubmit={handleSignup}>
                <input type="text" value={username} placeholder='John Doe' onChange={(e) => setUsername(e.target.value)} required />
                <input type="email" value={email} placeholder='johndoe@gmail.com' onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" value={password} placeholder='********' onChange={(e) => setPassword(e.target.value)} required />
            </form>
            <button type='submit'>Signup</button>
        </div>
    )
}

export default SignupPage