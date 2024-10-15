import { useAppSelector } from "@/hooks";
import AvatarSkeleton from "../../Atoms/AvatarSkeleton";
import InputSkeleton from "../../Atoms/InputSkeleton";
import LinksChip from "../../Atoms/LinkChip";
import UserPictureAndName from "../../Atoms/UserPictureAndName";
import { DEFAULT_IMAGE } from "@/constants";

export default function ProfileMockUp() {
  const user = useAppSelector((state) => state.user);
  return (
    <div className="p-8 space-y-6">
      {user?.detail?.username ? (
        <UserPictureAndName
          picture={user?.detail?.picture || DEFAULT_IMAGE}
          name={user?.detail?.username}
          email={user?.detail?.email}
        />
      ) : (
        <AvatarSkeleton />
      )}

      {user?.detail?.socialLinks?.length > 0 ? (
        <div className="space-y-4 flex flex-col gap-1">
          {user?.detail?.socialLinks?.map((item: any) => {
            return (
              <LinksChip key={item.id} type={item.platform} url={item?.url}>
                {item.platform}
              </LinksChip>
            );
          })}
        </div>
      ) : (
        <InputSkeleton />
      )}
    </div>
  );
}
