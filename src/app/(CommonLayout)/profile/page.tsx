"use server";

import ProfileHeader from "@/src/components/modules/profile/ProfileHeader";
import ProfileTabs from "@/src/components/modules/profile/ProfileTabs";
import { getMyProfile } from "@/src/services/user.fetch.service";

export default async function Page() {
  const userData = await getMyProfile();
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
