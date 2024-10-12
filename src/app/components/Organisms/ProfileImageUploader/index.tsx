import React from "react";
import ImageUploader from "../../Molecules/ImageUploader";

export default function ProfileImageUploader() {
  return (
    <div className="flex flex-col md:flex-row gap-2 items-center justify-between bg-gray-100 rounded-md p-4">
      <p className="text-gray-500 text-md flex-1">Profile Image</p>
      <div className="flex-1">
        <ImageUploader />
      </div>
    </div>
  );
}
