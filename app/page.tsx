"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import UploadImage from "@/components/UploadImage";
import Image from "next/image";
import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import Swal, { SweetAlertResult } from "sweetalert2";
import ImageModal from "@/components/Modal";
import Pagination from "@mui/material/Pagination";

export default function Home() {
  const [images, setImages] = useState<string[]>([]);
  const [page, setPage] = useState(1); // default to 1 page
  const [currentPage, setCurrentPage] = useState(1);
  const perPageImage = 6;

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
        setImages(existingUrl); // no need to spread again
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  const handleCurrentPage = (_event: React.ChangeEvent<unknown>, pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    const pageNeed = Math.ceil(images.length / perPageImage) || 1;
    setPage(pageNeed);

    // Reset to page 1 if the current page exceeds the available pages
    if (currentPage > pageNeed) {
      setCurrentPage(1);
    }
  }, [images]);

  // Calculate start and end index for current page
  const startIndex = (currentPage - 1) * perPageImage;
  const endIndex = startIndex + perPageImage;

  return (
    <div>
      <Navbar />
      <h2 className="text-2xl md:text-3xl font-semibold text-center mt-5">
        Image Gallery
      </h2>

      <div className="flex justify-between container mx-auto px-2 lg:px-0 mt-5">
        <div></div>
        <UploadImage setImages={setImages} images={images} />
      </div>

      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-5 px-2 lg:px-0">
        {images.slice(startIndex, endIndex).map((img: string, idx: number) => (
          <div key={idx} className="relative border border-gray-700 w-full h-[300px]">
            <Image
              src={img}
              alt={idx + " not found"}
              height={500}
              width={500}
              className="w-full h-full object-cover"
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
        <Pagination
          onChange={handleCurrentPage}
          count={page}
          page={currentPage}
          color="primary"
        />
      </div>

      <Footer />
    </div>
  );
}
