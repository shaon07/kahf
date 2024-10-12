import React from "react";
import PreviewPageTemplate from "../templates/PreviewPage";
import PreviewDetail from "../Organisms/PreviewDetail";

export default function PreviewContainer() {
  return (
    <PreviewPageTemplate className="md:absolute top-[10rem] left-0 right-0 w-full flex justify-center">
      <div className="w-full md:max-w-[300px] md:shadow-lg md:rounded-lg">
        <PreviewDetail />
      </div>
    </PreviewPageTemplate>
  );
}
