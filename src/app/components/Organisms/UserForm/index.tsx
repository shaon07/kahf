import React from "react";
import InputBox from "../../Atoms/InputBox";

export default function UserForm() {
  return (
    <div className="bg-gray-100 rounded-md p-4 flex flex-col gap-4">
      <div className="flex items-center">
        <span className="text-gray-500 font-medium text-md flex-1">
          First Name*
        </span>
        <div className="flex-1">
          <InputBox size="large" className="w-full" />
        </div>
      </div>

      <div className="flex items-center">
        <span className="text-gray-500 font-medium text-md flex-1">
          Last Name*
        </span>
        <div className="flex-1">
          <InputBox size="large" className="w-full" />
        </div>
      </div>

      <div className="flex items-center">
        <span className="text-gray-500 font-medium text-md flex-1">
          Email*
        </span>
        <div className="flex-1">
          <InputBox type="email" size="large" className="w-full" />
        </div>
      </div>
    </div>
  );
}
