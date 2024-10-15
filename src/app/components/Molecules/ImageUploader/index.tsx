"use client";

import React from "react";
import Uploader from "../../Atoms/Uploader";
import { useRequest } from "ahooks";
import { updateUser } from "@/controllers/user.controller";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { setUserDetails } from "@/redux/userSlice";

type ImageUploaderProps = {
  onChange?: (file: any, url: string) => void;
};

export default function ImageUploader({
  onChange = () => {},
}: ImageUploaderProps) {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const data = useRequest((data) => updateUser(user.detail.id, data), {
    manual: true,
    onSuccess: (response) => {
      dispatch(setUserDetails(response?.data));
    },
  });

  const handleChange = (info: any, url: string) => {
    onChange(info, url);
    data.run({
      picture: info,
    });
  };

  return (
    <div className="flex flex-col md:flex-row items-center gap-4">
      <div className="w-40 h-40">
        <Uploader onChange={(data, url) => handleChange(data, url)} />
      </div>
      <div className="flex flex-col">
        <p className="text-gray-500 text-md">Image Must be below 1024X1024px</p>
        <p className="text-gray-500 text-md">Use PNG, JPG or BMP Format</p>
      </div>
    </div>
  );
}
