"use client";
import React, { useState } from "react";
import Image from "next/image";
import { signOut } from "next-auth/react";

export default function Home() {
  const [img, setImg] = useState("");

  const handleUpload = async () => {
    const fileInput = document.getElementById("imageInput") as HTMLInputElement;
    const file = fileInput.files?.[0];

    if (!file) {
      alert("Please select an image");
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

      console.log("Uploaded image URL: ", data.secure_url);
      setImg(data.secure_url);
    }
  }

  return (
    <div>
      <input type="file" id="imageInput" />
      <button onClick={handleUpload}>Upload Image</button>
      {
        img && <Image src={img} alt="image" width={200} height={200}></Image>
      }
      <button onClick={() => signOut}>Logout</button>
    </div>
  );
}
