"use client";

import React, { useEffect } from "react";
import { RiEqualFill } from "react-icons/ri";
import SelectBox from "../../Atoms/SelectBox";
import InputBox from "../../Atoms/InputBox";
import { LiaLinkSolid } from "react-icons/lia";
import { FaGithub, FaLinkedin, FaYoutube } from "react-icons/fa";
import { Tooltip } from "antd";

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
  serial?: number | string;
  link?: string;
  platform?: string;
  onLoad?: (data?: any) => void;
  onRemove?: (data?: any) => void;
  dragProps?: any;
  disabled?: boolean;
};

export default function LinkListMenu({
  serial = 0,
  link = "",
  disabled = false,
  platform = "",
  onLoad = () => {},
  getData = () => {},
  onRemove = () => {},
  dragProps = {},
}: LinkListMenuProps) {
  const [selectedLink, setSelectedLink] = React.useState(linkOptions[0].value);
  const [inputValue, setInputValue] = React.useState(link);

  const data = {
    platform: platform || selectedLink,
    url: link || inputValue,
    serial,
  };

  useEffect(() => {
    onLoad(data);
  }, []);

  return (
    <div className="bg-gray-100 rounded-md p-3">
      <div className="flex items-center justify-between mb-2">
        {!!serial && (
          <Tooltip title="Drag to reorder">
            <div className="flex items-center gap-2" {...dragProps}>
              <RiEqualFill color="gray" />
              <span className="font-semibold">Link #{serial}</span>
            </div>
          </Tooltip>
        )}

        {link && !!serial && (
          <button
            onClick={() => onRemove(data)}
            type="button"
            className="text-gray-400 font-semibold"
          >
            <Tooltip title="Remove Link">Remove</Tooltip>
          </button>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <SelectBox
          label="Platform"
          value={platform || selectedLink}
          options={linkOptions}
          size="large"
          disabled={disabled}
          onChange={(value) => {
            setSelectedLink(value);
            getData({
              platform: value,
              url: inputValue,
              serial,
            });
          }}
        />

        <InputBox
          value={link || inputValue}
          label="Link"
          prefix={<LiaLinkSolid size={16} color="gray" />}
          size="large"
          disabled={disabled}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setInputValue(event.target.value);
            getData({
              platform: selectedLink,
              url: event.target.value,
              serial,
            });
          }}
        />
      </div>
    </div>
  );
}
