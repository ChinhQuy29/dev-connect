"use client";

import React, { useState } from 'react'
import usePreviewImg from '../hooks/usePreviewImg';
import Image from 'next/image';
import PostModal from '@/components/PostModal';

const Dashboard = () => {
    const [showForm, setShowForm] = useState(false);
    const [showChat, setShowChat] = useState(false);
    const [loading, setLoading] = useState(false);
    const { imgUrl, setImgUrl, handleImageChange } = usePreviewImg();

    return (
        <div>
            <button onClick={() => setShowForm(!showForm)}>Create Post</button>
            <button onClick={() => setShowChat(!showChat)}>Chat</button>
            {showForm &&
                <PostModal />
            }
        </div>
    )
}

export default Dashboard