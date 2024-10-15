"use client"
import Image from "next/image";
import React from "react";
import LinksChip from "../../Atoms/LinkChip";
import { useAppSelector } from "@/hooks";
import { DEFAULT_IMAGE } from "@/constants";

export default function PreviewDetail() {
  const user = useAppSelector((state) => state.user);
  console.log(user)

  return (
    <div className="bg-white md:rounded-md p-6 flex flex-col items-center gap-4 w-full">
      <Image
        src={
          user?.detail?.picture ||
          DEFAULT_IMAGE
        }
        alt="Logo"
        width={100}
        height={100}
        className="rounded-full w-24 h-24 object-cover border-4 border-dev-primary"
      />
      <h2 className="text-3xl font-semibold">{user?.detail?.username}</h2>
      <p className="text-gray-500 font-medium">{user?.detail?.email}</p>

      <div className="flex flex-col gap-2 w-full mt-6">
        {user?.detail?.socialLinks?.map((item: any) => {
          return (
            <LinksChip key={item.id} type={item.platform} url={item?.url}>
              {item.platform}
            </LinksChip>
          );
        })}
      </div>
    </div>
  );
}
