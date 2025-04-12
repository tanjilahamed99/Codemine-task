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

  const handleCurrentPage = (
    _event: React.ChangeEvent<unknown>,
    pageNumber: number
  ) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    const pageNeed = Math.ceil(images.length / perPageImage) || 1;
    setPage(pageNeed);

    // Reset to page 1 if the current page exceeds the available pages
    if (currentPage > pageNeed) {
      setCurrentPage(1);
    }
  }, [images, currentPage]);

  // Calculate start and end index for current page
  const startIndex = (currentPage - 1) * perPageImage;
  const endIndex = startIndex + perPageImage;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between">
      <Navbar />

      <main className="flex-1">
        <section className="container mx-auto px-4 lg:px-8 py-10">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">
              📷 Image Gallery
            </h2>
            <UploadImage setImages={setImages}/>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {images
              .slice(startIndex, endIndex)
              .map((img: string, idx: number) => (
                <div
                  key={idx}
                  className="relative rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200 bg-white"
                >
                  <Image
                    src={img}
                    alt={`Image ${idx}`}
                    height={500}
                    width={500}
                    className="w-full h-64 object-cover"
                  />

                  {/* Modal Button */}
                  <div className="absolute top-3 left-3">
                    <ImageModal img={img} />
                  </div>

                  {/* Delete Icon */}
                  <MdDelete
                    onClick={() => handleImageDelete(img)}
                    className="absolute top-3 right-3 text-3xl text-red-600 cursor-pointer hover:text-red-700 transition"
                  />
                </div>
              ))}
          </div>

          {/* Pagination */}
          {images.length > 0 && (
            <div className="flex justify-center mt-10">
              <Pagination
                onChange={handleCurrentPage}
                count={page}
                page={currentPage}
                color="primary"
              />
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
