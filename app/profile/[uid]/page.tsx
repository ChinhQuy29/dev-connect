import React from 'react'
import { useSession } from 'next-auth/react'
import { useParams } from 'next/navigation'

const ProfilePage = () => {
    const { param } = useParams();
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
        </div>
    )
}

export default ProfilePage