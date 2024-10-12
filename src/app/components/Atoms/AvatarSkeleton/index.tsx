import React from "react";

export default function AvatarSkeleton() {
  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="w-24 h-24 bg-gray-200 rounded-full" />
      <div className="space-y-2">
        <div className="h-4 w-48 bg-gray-200 rounded mx-auto" />
        <div className="h-3 w-32 bg-gray-200 rounded mx-auto" />
      </div>
    </div>
  );
}
