"use client";

import { Button, message } from "antd";
import React from "react";
import { FiPlus } from "react-icons/fi";
import LinkListMenu from "../../Molecules/LinkListMenu";
import { linkSchema } from "@/schema/link.schema";
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
  KeyboardSensor,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

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
    const items = lists.filter((item) => item?.id !== data.id);
    setLists(items);
    message.error("Link removed successfully");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
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

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setLists((prevLists) => {
        const oldIndex = prevLists.findIndex((item) => item.id === active.id);
        const newIndex = prevLists.findIndex((item) => item.id === over.id);
        return arrayMove(prevLists, oldIndex, newIndex);
      });
    }
  };

  return (
    <form className="p-6" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold ">Customize your links</h2>
        <p className="text-gray-500">
          Add/edit/remove links below and then share all your profile with the
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
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={lists.map((item) => item.id)} // Pass the array of item ids to SortableContext
            strategy={verticalListSortingStrategy}
          >
            <div className="mt-6 flex flex-col gap-6">
              {lists.map((item) => (
                <MemoizedSortableItem
                  key={item.id}
                  id={item.id}
                  item={item}
                  handleSaveData={handleSaveData}
                  handleRemove={handleRemove}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </form>
  );
}

const SortableItem = ({ id, item, handleSaveData, handleRemove }: any) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-white p-4 border border-gray-300 rounded-md"
    >
      <LinkListMenu
        key={item.id}
        getData={handleSaveData}
        id={item.id}
        dragProps={{ ...attributes, ...listeners }}
        onRemove={handleRemove}
      />
    </div>
  );
};

const MemoizedSortableItem = React.memo(SortableItem);
