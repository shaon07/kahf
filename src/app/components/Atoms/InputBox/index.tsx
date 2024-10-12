import { Input, InputProps } from "antd";
import React, { ReactNode } from "react";

type InputBoxProps = {
  label?: ReactNode;
} & InputProps;

export default function InputBox(props: InputBoxProps) {
  return (
    <div className="flex flex-col gap-1">
        {
            props?.label && <label className="text-gray-700 font-medium">{props?.label}</label>
        }
      <Input {...props} />
    </div>
  );
}
