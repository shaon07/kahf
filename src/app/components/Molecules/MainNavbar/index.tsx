import { Button } from "antd";
import React from "react";
import { IoLinkSharp } from "react-icons/io5";
import MainNavbarButtonGroup from "../../Atoms/MainNavbarButtonGroup";
import Link from "next/link";
import { FaEye } from "react-icons/fa";

export default function MainNavbar() {
  return (
    <nav className="flex items-center justify-between bg-white shadow-sm p-4">
      <div className="flex items-center gap-1">
        <span className="bg-purple-600 p-1 rounded-md text-white">
          <IoLinkSharp />
        </span>
        <h6 className="font-semibold text-2xl hidden md:block">devlinks</h6>
      </div>

      <div className="flex items-center gap-2">
        <MainNavbarButtonGroup />
      </div>

      <div>
        <Link href="/preview">
          <Button color="primary" variant="outlined">
            <div className="hidden md:block">Preview</div>
            <FaEye className="block md:hidden" />
          </Button>
        </Link>
      </div>
    </nav>
  );
}
