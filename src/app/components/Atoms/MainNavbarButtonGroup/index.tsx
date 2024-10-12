"use client";
import { Button } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { CgProfile } from "react-icons/cg";
import { IoLinkSharp } from "react-icons/io5";

export default function MainNavbarButtonGroup() {
  const pathname = usePathname();

  const ButtonProvider = ({
    type,
    children,
  }: {
    type: string;
    children: React.ReactNode;
  }) => {
    switch (type) {
      case "inactive":
        return (
          <Button color="default" variant="text">
            {children}
          </Button>
        );
      case "active":
        return (
          <Button color="primary" variant="filled">
            {children}
          </Button>
        );
      default:
        return (
          <Button color="primary" variant="filled">
            {children}
          </Button>
        );
    }
  };
  return (
    <>
      <Link href="/links">
        <ButtonProvider type={pathname === "/links" ? "active" : "inactive"}>
          <IoLinkSharp />
          <div className="hidden md:block">Links</div>
        </ButtonProvider>
      </Link>

      <Link href="/profile-detail">
        <ButtonProvider
          type={pathname === "/profile-detail" ? "active" : "inactive"}
        >
          <CgProfile />
          <div className="hidden md:block">Profile Detail</div>
        </ButtonProvider>
      </Link>
    </>
  );
}
