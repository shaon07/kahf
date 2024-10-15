import Image from "next/image";
import React from "react";

type UserPictureAndNameProps = {
  picture: string;
  name: string;
  email: string;
};

export default function UserPictureAndName({
  email,
  name,
  picture,
}: UserPictureAndNameProps) {
  return (
    <div className="flex flex-col items-center space-y-4">
      <Image
        src={`${picture}`}
        width={200}
        height={200}
        alt="user"
        className="w-24 h-24 rounded-full object-cover border-4 border-dev-primary"
      />

      <div className="flex flex-col items-center">
        <h2 className="text-xl font-semibold">{name}</h2>
        <p className="text-md font-medium text-gray-400">{email}</p>
      </div>
    </div>
  );
}
