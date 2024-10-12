import Image from "next/image";
import React from "react";
import LinksChip from "../../Atoms/LinkChip";

export default function PreviewDetail() {
  return (
    <div className="bg-white md:rounded-md p-6 flex flex-col items-center gap-4 w-full">
      <Image
        src={
          "https://yt3.googleusercontent.com/g3j3iOUOPhNxBCNAArBqiYGzHzCBIzr_Al8mdvtBJeZMGFDblnU5rlVUt6GY01AUwm7Cp70J=s900-c-k-c0x00ffffff-no-rj"
        }
        alt="Logo"
        width={100}
        height={100}
        className="rounded-full border-4 border-dev-primary"
      />
      <h2 className="text-3xl font-semibold">Oggy</h2>
      <p className="text-gray-500 font-medium">oggy@gmail.com</p>

      <div className="flex flex-col gap-2 w-full mt-6">
        <LinksChip type="github" />
        <LinksChip type="youtube" />
        <LinksChip type="linkedin" />
      </div>
    </div>
  );
}
