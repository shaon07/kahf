import AvatarSkeleton from "../../Atoms/AvatarSkeleton";
import InputSkeleton from "../../Atoms/InputSkeleton";
import LinksChip from "../../Atoms/LinkChip";

export default function ProfileMockUp() {
  return (
    <div className="p-8 space-y-6">
      <AvatarSkeleton />

      <div className="space-y-4">
        <LinksChip type="github">GitHub</LinksChip>
        <LinksChip type="youtube">YouTube</LinksChip>
        <LinksChip type="linkedin">LinkedIn</LinksChip>
      </div>

      <InputSkeleton />
    </div>
  );
}
