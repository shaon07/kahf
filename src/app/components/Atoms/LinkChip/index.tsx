import React from "react";
import { BiChevronRight } from "react-icons/bi";
import { BsYoutube } from "react-icons/bs";
import { FaGithub } from "react-icons/fa";
import { LiaLinkedin } from "react-icons/lia";

type LinkChipProps = {
    type: "github" | "youtube" | "linkedin";
    children?: React.ReactNode;
};

export default function LinksChip({type, children}: LinkChipProps) {
    const chipBGColor = {
        github: "bg-black",
        youtube: "bg-red-500",
        linkedin: "bg-blue-600",
    }

    const chipsIcons = {
        github: <FaGithub className="w-5 h-5 mr-3" />,
        youtube: <BsYoutube className="w-5 h-5 mr-3" />,
        linkedin: <LiaLinkedin className="w-5 h-5 mr-3" />,
    }

  return (
    <button className={`flex items-center justify-between w-full px-4 py-3 ${chipBGColor[type]} text-white rounded-lg`}>
      <div className="flex items-center">
        {chipsIcons[type]}
        <span>{children || type}</span>
      </div>
      <BiChevronRight className="w-5 h-5" />
    </button>
  );
}
