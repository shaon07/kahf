"use client";

import { Button, message } from "antd";
import React, { useState } from "react";
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
import { useAppDispatch, useAppSelector } from "@/hooks";
import { storeSocialLinks } from "@/redux/userSlice";
import { LinkType } from "@/types";

export default function ProfileLinkGenerator() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const [list, setList] = useState({} as LinkType);
  const finalList = [...user.detail.socialLinks];
  const [lists, setLists] = useState<LinkType[]>([...finalList]);

  const handleSaveData = (data: any) => {
    const exist = lists.find((l) => l.platform === data.platform);

    if (exist?.serial) {
      setList(data);
      return;
    }
    setList({ ...data, serial: String(finalList.length + 1) });
  };

  const handleSubmit = () => {
    const isListValid = linkSchema.safeParse(list);

    if (!isListValid.success) {
      message.error(isListValid.error?.issues[0]?.message);
      return;
    }

    const prevData = lists.find((l) => l.platform === list.platform);

    if (prevData?.serial) {
      const updatedData = lists?.filter((l) => l.platform !== list.platform);
      const newData = [...updatedData, { ...list, serial: String(prevData?.serial) }];
      setLists(newData);
      dispatch(
        storeSocialLinks(newData)
      );
      return;
    }

    dispatch(storeSocialLinks([...lists, list]));
    setLists([...lists, list]);
  };

  const handleRemove = (data: LinkType) => {
    const items = finalList.filter((item) => item?.serial !== data.serial);
    dispatch(storeSocialLinks(items));
    setLists(items);
    message.error("Link removed successfully");
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.serial !== over.serial) {
      setLists((prevLists) => {
        const oldIndex = prevLists.findIndex((item) => item.serial === active.serial);
        const newIndex = prevLists.findIndex((item) => item.serial === over.serial);
        return arrayMove(prevLists, oldIndex, newIndex);
      });
    }
  };

  return (
    <div className="p-6">
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
        // disabled={finalList.length === 0}
        onClick={handleSubmit}
      >
        <FiPlus />
        <span className="font-semibold">Add new link</span>
      </Button>

      <div className="mt-4">
        <LinkListMenu getData={handleSaveData} link={list.url} />
      </div>

      {lists.length > 0 && (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={lists.map((item) => item.serial)}
            strategy={verticalListSortingStrategy}
          >
            <div className="mt-6 flex flex-col gap-6">
              {lists.map((item) => (
                <MemoizedSortableItem
                  key={item.serial}
                  serial={item.serial}
                  url={item.url}
                  item={item}
                  disabled={true}
                  platform={item.platform}
                  handleSaveData={handleSaveData}
                  handleRemove={handleRemove}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
}

const SortableItem = ({
  serial,
  item,
  disabled,
  handleSaveData,
  url,
  platform,
  handleRemove,
  onLoad,
}: any) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id:serial });

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
        key={item.serial}
        getData={handleSaveData}
        serial={item.serial}
        link={url}
        platform={platform}
        onLoad={onLoad}
        disabled={disabled}
        dragProps={{ ...attributes, ...listeners }}
        onRemove={handleRemove}
      />
    </div>
  );
};

const MemoizedSortableItem = React.memo(SortableItem);
