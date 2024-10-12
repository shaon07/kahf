"use client";

import { Button, message } from "antd";
import React from "react";
import { FiPlus } from "react-icons/fi";
import LinkListMenu from "../../Molecules/LinkListMenu";
import { linkSchema } from "@/schema/link.schema";

export default function ProfileLinkGenerator() {
  const [lists, setLists] = React.useState([] as any[]);

  const handleSaveData = (data: any) => {
    const prevData = lists?.find((item) => item?.id === data?.id);
    if (prevData) {
      prevData.link = data.link;
      setLists([...lists]);
      return;
    }

    setLists([...lists, data]);
  };

  const handleRemove = (data: any) => {
    const items = lists.filter((item) => {
      return item?.link !== data.link;
    });
    setLists(items);

    message.error("Link removed successfully");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      if (lists.length !== 0) {
        const data = linkSchema.safeParse(lists[lists.length - 1]);
        if (!data.success) {
          message.error(data.error?.issues[0]?.message);
          return;
        } else {
          message.success("Link added successfully");
        }
      }

      setLists([
        ...lists,
        { platform: "github", link: "", id: lists.length + 1 },
      ]);
    } catch (error: any) {
      console.log(error?.message);
    }
  };

  return (
    <form className="p-6" onSubmit={handleSubmit}>
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
        htmlType="submit"
      >
        <FiPlus />
        <span className="font-semibold">Add new link</span>
      </Button>

      {lists.length > 0 && (
        <div className="mt-6 flex flex-col gap-6">
          {[...lists].map((item) => (
            <LinkListMenu
              key={item.id}
              getData={handleSaveData}
              id={item.id}
              onRemove={handleRemove}
            />
          ))}
        </div>
      )}
    </form>
  );
}
