import React, { useState } from "react"

const usePreviewImg = () => {
    const [imgUrl, setImgUrl] = useState("");
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImgUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            console.error("The selected file is not an image.")
        }
    };

    return { imgUrl, setImgUrl, handleImageChange }
}

export default usePreviewImg