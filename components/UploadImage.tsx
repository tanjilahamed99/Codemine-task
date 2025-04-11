"use client";

import React from "react";
import axios from "axios";

const BASE_URL = "https://api.imgbb.com/1/upload";

type UploadImagesProps = {
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
};

const UploadImage: React.FC<UploadImagesProps> = ({ setImages }) => {

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const uploadedImageUrls: string[] = [];

    for (const file of Array.from(files)) {
      const formData = new FormData();
      formData.append("image", file);

      try {
        const response = await axios.post(
          `${BASE_URL}?key=${process.env.NEXT_PUBLIC_IMAGEBB_KEY}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        const imageUrl = response.data.data.url;
        uploadedImageUrls.push(imageUrl);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }

    setImages(prev => [...uploadedImageUrls, ...prev]);
  };

  return (
    <div className="flex flex-col md:flex-row justify-between gap-5">
      <div>
        <label htmlFor="type3-2-upload" className="flex w-full max-w-[170px]">
          <p className="w-max truncate rounded-full hover:shadow-[0px_0px_4px_0.5px] border-[3px] border-green-500 px-6 py-1.5 font-medium text-green-500 shadow-md">
            CHOOSE FILES
          </p>
        </label>
        <input
          onChange={handleImageUpload}
          className="hidden"
          type="file"
          name="upload"
          id="type3-2-upload"
          accept="image/*"
          multiple
        />
      </div>
    </div>
  );
};

export default UploadImage;
