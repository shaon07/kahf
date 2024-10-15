import { Button } from "antd";
import React from "react";
import { IoLinkSharp } from "react-icons/io5";
import MainNavbarButtonGroup from "../../Atoms/MainNavbarButtonGroup";
import Link from "next/link";
import { FaEye } from "react-icons/fa";
import { useAppSelector } from "@/hooks";
import { useRequest } from "ahooks";
import { logoutUser } from "@/controllers/user.controller";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { clearUserDetails, logout } from "@/redux/userSlice";
import { useRouter } from "next/navigation";

export default function MainNavbar() {
  const router = useRouter();
  const { isUser } = useAppSelector((state) => state.user);
  const dispatch = useDispatch()
  const data = useRequest(() => logoutUser(),{
    manual: true,
    onSuccess: () => {
      Cookies.remove("token");
      Cookies.remove("isUser");
      dispatch(logout());
      dispatch(clearUserDetails())
      router.push("/login");
    },
    onError: () => {
      console.error("Failed to logout");
    },
  });
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

      <div className="flex items-center gap-2">
        <Link href="/preview">
          <Button color="primary" variant="outlined">
            <div className="hidden md:block">Preview</div>
            <FaEye className="block md:hidden" />
          </Button>
        </Link>

        {isUser && (
          <Button color="primary" onClick={data.run} loading={data.loading} disabled={data.loading}>
            <div className="hidden md:block">Logout</div>
            <FaEye className="block md:hidden" />
          </Button>
        )}
      </div>
    </nav>
  );
}
