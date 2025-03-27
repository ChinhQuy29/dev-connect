"use client";

import React, { useState } from 'react'
import usePreviewImg from '../hooks/usePreviewImg';
import Image from 'next/image';

const Dashboard = () => {
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const { imgUrl, setImgUrl, handleImageChange } = usePreviewImg();

    const handleUpload = async () => {
        const fileInput = document.getElementById("imageInput") as HTMLInputElement;
        const file = fileInput.files?.[0];

        if (!file) {
            alert("Please select an image.");
            return;
        }

        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = async () => {
            const base64Image = reader.result as string;
            const response = await fetch("/api/upload", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ image: base64Image }),
            });

            const data = await response.json();
            if (data) {
                setImgUrl(data.secure_url);
            } else {
                alert("Failed uploading image.");
            }
        }
    }

    return (
        <div>
            <button onClick={() => setShow(!show)}>Create Post</button>
            {show && <div>
                <input type="file" id="imageInput" onChange={handleImageChange} />
                {imgUrl && <div>
                    <Image src={imgUrl} alt='Preview' width={200} height={200} />
                    <button onClick={() => setImgUrl("")}>Close Image</button>
                </div>}
                <button onClick={handleUpload}>Upload</button>
            </div>}
        </div>
    )
}

export default Dashboard