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

type LinkListMenuProps = {
  getData?: (data?: any) => void;
  id?: number;
  onLoad?: (data?: any) => void;
  onRemove?: (data?: any) => void;
};

export default function LinkListMenu({
  id = 0,
  onLoad = () => {},
  getData = () => {},
  onRemove = () => {},
}: LinkListMenuProps) {
  const [selectedLink, setSelectedLink] = React.useState(linkOptions[0].value);
  const [inputValue, setInputValue] = React.useState("");

  const data = {
    platform: selectedLink,
    link: inputValue,
    id,
  };

  React.useEffect(() => {
    onLoad(data);
  }, []);

  return (
    <div className="bg-gray-100 rounded-md p-3">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <RiEqualFill color="gray" />
          <span className="font-semibold">Link #{id}</span>
        </div>

        <button
          onClick={() => onRemove(data)}
          className="text-gray-400 font-semibold"
        >
          Remove
        </button>
      </div>

      <div className="flex flex-col gap-2">
        <SelectBox
          label="Platform"
          value={selectedLink}
          options={linkOptions}
          size="large"
          onChange={(value) => {
            setSelectedLink(value);
            getData({
              platform: value,
              link: inputValue,
              id,
            });
          }}
        />

        <InputBox
          value={inputValue}
          label="Link"
          prefix={<LiaLinkSolid size={16} color="gray" />}
          size="large"
          required
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setInputValue(event.target.value);
            getData({
              platform: selectedLink,
              link: event.target.value,
              id,
            });
          }}
        />
      </div>
    </div>
  );
}
