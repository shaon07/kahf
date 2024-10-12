import PreviewNavbar from "@/app/components/Molecules/PreviewNavbar";
import React from "react";

export default function PreviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-dev-primary md:p-3 min-h-[calc(100vh/2.5)] flex flex-col md:gap-2 relative">
      <PreviewNavbar />
      {children}
    </div>
  );
}
