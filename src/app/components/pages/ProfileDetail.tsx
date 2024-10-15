
import React from "react";
import ProfileDetailPageTemplate from "../templates/ProfileDetailPage";
import ProfileImageUploader from "../Organisms/ProfileImageUploader";
import UserForm from "../Organisms/UserForm";

export default function ProfileDetailContainer() {
  return (
    <ProfileDetailPageTemplate>
      <div className="p-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-bold">Profile Details</h2>
          <p className="text-gray-600">
            Add your details to create personal touch to your profile.
          </p>
        </div>

        <div className="mt-6">
            <ProfileImageUploader />
        </div>

        <div className="mt-6">
          <UserForm />
        </div>
      </div>
    </ProfileDetailPageTemplate>
  );
}
