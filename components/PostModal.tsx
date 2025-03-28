"use client";

import React, { useState } from 'react'
import usePreviewImg from '@/app/hooks/usePreviewImg';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

const PostModal = () => {
    const [text, setText] = useState<string>("");
    const { imgUrl, setImgUrl, handleImageChange } = usePreviewImg();
    const { data: session } = useSession();

    const handlePost = async () => {
        const fileInput = document.getElementById("imageInput") as HTMLInputElement;
        const file = fileInput.files?.[0];

        if (!text && !file) {
            alert("Need at least text or image to create a post.");
            return
        }

        let img = "";

        if (file) {
            img = await new Promise<string>((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);

                reader.onload = () => {
                    resolve(reader.result as string);
                };

                reader.onerror = (error) => {
                    reject(error);
                };
            });
        }

        const response = await fetch("/api/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ postedBy: session?.user.id, text, img })
        })

        const data = await response.json();
        if (data) {
            setImgUrl(data.img);
        } else {
            alert("Posting failed.");
        }
    }

    return (
        <div>
            <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder='I love DevConnect.' />
            <input type="file" id='imageInput' onChange={handleImageChange} />
            {imgUrl &&
                <Image src={imgUrl} alt='Preview' width={200} height={200} />
            }
            <button onClick={handlePost}>Post</button>
        </div>
    )
}

export default PostModal