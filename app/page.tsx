"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import UploadImage from "@/components/UploadImage";
import Image from "next/image";
import { useState } from "react";
import { MdDelete } from "react-icons/md";
import Swal, { SweetAlertResult } from "sweetalert2";
import ImageModal from "@/components/Modal";
import Pagination from "@mui/material/Pagination";

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
      <h2 className="text-2xl md:text-3xl font-semibold text-center mt-5">
        Image Gallery
      </h2>
      <div className="flex justify-between container mx-auto px-2 lg:px-0 mt-5">
        <div></div>
        <UploadImage setImages={setImages} />
      </div>

      <div className="container mx-auto  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-5 px-2 lg:px-0">
        {images?.map((img: string, idx: number) => (
          <div
            key={idx}
            className="relative border border-gray-700 w-full h-[300px]"
          >
            <Image
              src={img}
              alt={idx + "not found"}
              height={500}
              width={500}
              className="w-full h-full"
            />
            <div className="absolute top-2 left-3">
              <ImageModal img={img} />
            </div>
            <MdDelete
              onClick={() => handleImageDelete(img)}
              className="absolute text-2xl text-red-600 top-2 right-3 cursor-pointer"
            />
          </div>
        ))}
      </div>
      <div className="flex justify-center mb-5">
        <Pagination count={10} color="primary" />
      </div>
      <Footer />
    </div>
  );
}
