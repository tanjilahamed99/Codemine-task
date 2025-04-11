"use client";

import axios from "axios";
import { useState } from "react";

const UploadImage = ({ img, setImages }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState("");

  // Drop file function
  const handleDrop = async (event) => {
    event.preventDefault();
    setIsDragging(false);
    const files = event.dataTransfer.files;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      // get secure url from our server
      const { data } = await axios(`${BASE_URL}/aws/s3Url`);
      console.log(data?.url);

      // post the image directly to the s3 bucket
      await fetch(data?.url, {
        method: "PUT",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: file,
      });

      const imageUrl = data?.url.split("?")[0];
      if (imageUrl) {
        //         setImages((prevImages) => [imageUrl, ...prevImages]);
      } else {
        setError("There was an error");
      }
    }
  };

  // Handle drag over
  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  // Handle drag leave
  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleFileChangeAws = async (event) => {
    const files = event.target.files;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      // get secure url from our server
      const { data } = await axios(`${BASE_URL}/aws/s3Url`);

      // post the image directly to the s3 bucket
      await fetch(data?.url, {
        method: "PUT",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: file,
      });

      const imageUrl = data?.url.split("?")[0];

      if (imageUrl) {
        setImages((prevImages) => [imageUrl, ...prevImages]);
      } else {
        setError("There was an error");
      }
    }
  };

  return (
    <section className="drag-drop mt-2 full">
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className="relative border-2 border-dashed border-gray-400 p-6 bg-white rounded-lg hover:bg-gray-100 hover:border-gray-600 hover:shadow-lg transition-all duration-300"
      >
        <div className="upload-info">
          <div className="mx-auto flex w-full flex-col items-center justify-center space-y-3">
            {isDragging ? (
              <div className="text-center h-[118px] flex items-center justify-center">
                <h5 className="text-2xl font-semibold">Drop here</h5>
              </div>
            ) : (
              <>
                <svg
                  width={50}
                  version="1.1"
                  id="Layer_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 42 32"
                  enableBackground="new 0 0 42 32"
                  xmlSpace="preserve"
                  fill="#000000"
                  className="hover:hidden"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <g>
                      <path
                        fill="black"
                        d="M33.958,12.988C33.531,6.376,28.933,0,20.5,0C12.787,0,6.839,5.733,6.524,13.384 C2.304,14.697,0,19.213,0,22.5C0,27.561,4.206,32,9,32h6.5c0.276,0,0.5-0.224,0.5-0.5S15.776,31,15.5,31H9c-4.262,0-8-3.972-8-8.5 C1,19.449,3.674,14,9,14h1.5c0.276,0,0.5-0.224,0.5-0.5S10.776,13,10.5,13H9c-0.509,0-0.99,0.057-1.459,0.139 C7.933,7.149,12.486,1,20.5,1C29.088,1,33,7.739,33,14v1.5c0,0.276,0.224,0.5,0.5,0.5s0.5-0.224,0.5-0.5V14 c0-0.003,0-0.006,0-0.009c3.019,0.331,7,3.571,7,8.509c0,3.826-3.691,8.5-8,8.5h-7.5c-3.238,0-4.5-1.262-4.5-4.5V12.783l4.078,4.07 C25.176,16.951,25.304,17,25.432,17s0.256-0.049,0.354-0.146c0.195-0.195,0.195-0.513,0-0.707l-4.461-4.452 c-0.594-0.592-1.055-0.592-1.648,0l-4.461,4.452c-0.195,0.194-0.195,0.512,0,0.707s0.512,0.195,0.707,0L20,12.783V26.5 c0,3.804,1.696,5.5,5.5,5.5H33c4.847,0,9-5.224,9-9.5C42,17.333,37.777,13.292,33.958,12.988z"
                      ></path>
                    </g>
                  </g>
                </svg>
                <div className="text-center">
                  <h5 className="whitespace-nowrap text-lg font-medium tracking-tight hover:hidden">
                    {type === "pdf" ? "Upload image or PDF" : "Upload image"}
                  </h5>
                  <h5 className="whitespace-nowrap text-lg font-medium tracking-tight hidden hover:inline-block">
                    Upload
                  </h5>
                  {type === "pdf" ? (
                    <p className="text-sm text-gray-500 hover:hidden">
                      drop a file here <br /> ctrl + v to paste pdf
                    </p>
                  ) : (
                    <p className="text-sm text-gray-500 hover:hidden">
                      or drop an image here <br /> ctrl + V to paste Image or
                    </p>
                  )}
                </div>
              </>
            )}
          </div>
        </div>

        <input
          type="file"
          hidden
          id={name}
          onChange={handleFileChangeAws}
          accept=".jpg,.png,.pdf,.docx,.pptx,.txt,.xlsx,.webp" // Added .webp to the accept list
          multiple
        />
        <label
          htmlFor={name}
          className="absolute h-[180px] w-full top-0"
        ></label>
      </div>
    </section>
  );
};

export default UploadImage;
