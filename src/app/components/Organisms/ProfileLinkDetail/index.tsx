import React from "react";

export default function ProfileLinkDetail({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md bg-white rounded-md overflow-hidden">
        {children}
      </div>
    </div>
  );
}
