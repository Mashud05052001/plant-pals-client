"use server";

import ProfileHeader from "@/src/components/modules/profile/ProfileHeader";
import ProfileTabs from "@/src/components/modules/profile/ProfileTabs";
import nexiosInstance from "@/src/lib/nexiosInstance";
import { TSuccess, TUser } from "@/src/types";

export default async function Page() {
  const response = await nexiosInstance.get(
    "/users/me?populate=myPosts,following,followers",
    {
      next: {
        tags: ["myprofile"],
        revalidate: 30,
      },
    }
  );
  const userData = (response?.data as TSuccess<TUser>).data;
  // const profilePicture = userData?.profilePicture || noProfileImage;

  return (
    <div>
      <ProfileHeader userData={userData} />
      <div className="mt-6">
        <ProfileTabs userData={userData} />
      </div>
    </div>
  );
}
