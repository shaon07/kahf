"use client";

import React, { useState } from "react";
import { message, Upload, UploadFile, UploadProps } from "antd";
import { FiImage } from "react-icons/fi";
import Image from "next/image";
import { FileType } from "@/types";
import { getBase64 } from "@/utils";

const { Dragger } = Upload;

type UploaderProps = {
  onChange?: (file: UploadFile, url: string) => void;
};

const Uploader: React.FC = ({ onChange = () => {} }: UploaderProps) => {
  const [imageUrl, setImageUrl] = useState<string>();
  const props: UploadProps = {
    name: "file",
    multiple: false,
    async onChange(info) {
      const url = await getBase64(info.file.originFileObj as FileType);
      setImageUrl(url);
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        onChange(info.file, url);
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  return (
    <>
      <Dragger rootClassName="main-uploader" accept="image/*" {...props}>
        <div className="flex flex-col items-center justify-center relative w-full h-full">
          {imageUrl && (
            <Image
              src={imageUrl}
              alt="avatar"
              className="rounded-md w-full h-full object-cover"
              width={100}
              height={100}
            />
          )}

          <div
            className={`${
              imageUrl
                ? "absolute top-0 left-0 right-0 bottom-0 bg-[#000000B3]"
                : ""
            }`}
          >
            <div className="flex flex-col items-center justify-center w-full h-full p-6">
              <FiImage size={30} color={`${imageUrl ? "white" : "black"}`} />
              <p
                className={`${imageUrl ? "text-white" : "text-black"} text-md`}
              >
                {imageUrl ? "Change Image" : "Click or drag"}
              </p>
            </div>
          </div>
        </div>
      </Dragger>
    </>
  );
};

export default Uploader;
