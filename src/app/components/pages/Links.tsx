import React from "react";
import LinkPageTemplate from "../templates/LinkPage";
import ProfileLinkGenerator from "../Organisms/ProfileLinkGenerator";

export default function LinksContainer() {
  return (
    <LinkPageTemplate>
      <ProfileLinkGenerator />
    </LinkPageTemplate>
  );
}
