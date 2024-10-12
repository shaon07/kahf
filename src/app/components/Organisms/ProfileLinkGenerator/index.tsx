import { Button } from "antd";
import React from "react";
import { FiPlus } from "react-icons/fi";
import LinkListMenu from "../../Molecules/LinkListMenu";

export default function ProfileLinkGenerator() {
  return (
      <div className="p-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold ">Customize your links</h2>
          <p className="text-gray-500">
            Add/edit.remove links below and then share all your profile with the
            world!
          </p>
        </div>

        <Button
          color="primary"
          variant="outlined"
          className="w-full mt-6"
          size="large"
        >
          <FiPlus />
          <span className="font-semibold">Add new link</span>
        </Button>

        <div className="mt-6 flex flex-col gap-5">
          <LinkListMenu />
          <LinkListMenu />
        </div>
      </div>
  );
}
