"use client";

import Navbar from "@/components/Navbar";
import UploadImage from "@/components/UploadImage";
import Image from "next/image";
import { useState } from "react";
import { MdDelete } from "react-icons/md";
import Swal, { SweetAlertResult } from "sweetalert2";

export default function Home() {
  const [images, setImages] = useState<string[]>([]);
  console.log(images);

  const handleImageDelete = (url: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result: SweetAlertResult) => {
      if (result.isConfirmed) {
        const existingUrl = images.filter((i) => i !== url);
        setImages([...existingUrl]);
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };

  return (
    <div>
      <Navbar />
      <h2 className="text-3xl font-semibold text-center mt-5">Image Gallery</h2>
      <div className="flex justify-between container mx-auto">
        <div></div>
        <UploadImage setImages={setImages} />
      </div>

      <div className="container mx-auto grid grid-cols-3 gap-5 mt-5">
        {images?.map((img: string, idx: number) => (
          <div key={idx} className="relative">
            <Image
              src={"https://i.ibb.co.com/1CZbb3F/appointment.jpg"}
              alt={idx + "not found"}
              height={500}
              width={500}
            />
            <MdDelete
              onClick={() => handleImageDelete(img)}
              className="absolute text-2xl text-red-600 top-2 right-3 cursor-pointer"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
