"use client";

import UploadImage from "@/components/UploadImage";
import { useState } from "react";

export default function Home() {
  const [images, setImages] = useState<string[]>([]);

  console.log(images);

  return (
    <div>
      <h2></h2>
      <UploadImage setImages={setImages} />
    </div>
  );
}
