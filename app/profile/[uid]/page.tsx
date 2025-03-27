"use client";

import React from 'react'
import { useSession } from 'next-auth/react'
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const ProfilePage = () => {
    const router = useRouter();
    const { data: session, status } = useSession();
    if (status == "loading") {
        return (
            <div>Loading...</div>
        )
    }

    if (!session) {
        return (
            <div>You are not logged in.</div>
        )
    }

    return (
        <div>
            <p>{session.user?.name}</p>
            <p>{session.user?.email}</p>
            <button onClick={() => signOut()}>Logout</button>
            <button onClick={() => {
                router.push("/dashboard")
            }}>Dashboard</button>
        </div>
    )
}

export default ProfilePage