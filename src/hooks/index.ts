"use client";
import { AppDispatch, RootState } from "@/redux/store";
import { message } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

export function useDimension() {
  const [width, setWidth] = React.useState(0);
  const [height, setHeight] = React.useState(0);

  React.useEffect(() => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);

    function handleResize() {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return {
    width,
    height,
  };
}

export default function useMessage() {
  const [messageApi, contextHolder] = message.useMessage();

  const success = () => {
    messageApi.open({
      type: "success",
      content: "This is a success message",
    });
  };

  const error = () => {
    messageApi.open({
      type: "error",
      content: "This is an error message",
    });
  };

  const warning = () => {
    messageApi.open({
      type: "warning",
      content: "This is a warning message",
    });
  };

  return {
    messageApi,
    contextHolder,
    success,
    error,
    warning,
  };
}


export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()