import { Select, SelectProps } from "antd";
import React, { ReactNode } from "react";
import { IoChevronDown } from "react-icons/io5";

type SelectBoxProps = {
  label?: ReactNode;
} & SelectProps;

export default function SelectBox(props: SelectBoxProps) {
  return (
    <div className="flex flex-col gap-1">
      {props.label && (
        <label className="text-gray-700 font-medium">{props.label}</label>
      )}
      <Select
        suffixIcon={<IoChevronDown className="text-dev-primary" size={15} />}
        {...props}
      />
    </div>
  );
}
