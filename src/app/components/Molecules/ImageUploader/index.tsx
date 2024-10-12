import React from "react";
import Uploader from "../../Atoms/Uploader";

export default function ImageUploader() {
  return (
    <div className="flex flex-col md:flex-row items-center gap-4">
      <div className="w-40 h-40">
      <Uploader />
      </div>
      <div className="flex flex-col">
        <p className="text-gray-500 text-md">Image Must be below 1024X1024px</p>
        <p className="text-gray-500 text-md">Use PNG, JPG or BMP Format</p>
      </div>
    </div>
  );
}
