"use client";

import React from "react";
import { RiEqualFill } from "react-icons/ri";
import SelectBox from "../../Atoms/SelectBox";
import InputBox from "../../Atoms/InputBox";
import { LiaLinkSolid } from "react-icons/lia";
import { FaGithub, FaLinkedin, FaYoutube } from "react-icons/fa";

const linkOptions = [
  {
    label: (
      <span className="font-semibold flex items-center gap-1">
        <FaGithub />
        GitHub
      </span>
    ),
    value: "github",
  },
  {
    label: (
      <span className="font-semibold flex items-center gap-1">
        <FaYoutube />
        YouTube
      </span>
    ),
    value: "youtube",
  },
  {
    label: (
      <span className="font-semibold flex items-center gap-1">
        <FaLinkedin />
        LinkedIn
      </span>
    ),
    value: "linkedin",
  },
];

export default function LinkListMenu() {
  const [selectedLink, setSelectedLink] = React.useState(linkOptions[0].value);
  const [inputValue, setInputValue] = React.useState("");

  console.log(inputValue)

  return (
    <div className="bg-gray-100 rounded-md p-3">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <RiEqualFill color="gray" />
          <span className="font-semibold">Link #1</span>
        </div>

        <button className="text-gray-400 font-semibold">Remove</button>
      </div>

      <div className="flex flex-col gap-2">
        <SelectBox
          label="Platform"
          value={selectedLink}
          options={linkOptions}
          size="large"
          onChange={(value) => setSelectedLink(value)}
        />

        <InputBox
        //   value={inputValue}
          label="Link"
          defaultValue={`https://${selectedLink}.com/`}
          prefix={<LiaLinkSolid size={16} color="gray" />}
          size="large"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setInputValue(event.target.value)
          }
        />
      </div>
    </div>
  );
}
