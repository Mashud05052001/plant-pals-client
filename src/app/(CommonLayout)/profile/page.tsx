"use server";
import noProfileImage from "@/src/assets/no-profile.jpg";
import FollowersFollowingModal from "@/src/components/modal/profile/FollowersFollowingModal";
import ProfileTabs from "@/src/components/modules/profile/ProfileTabs";
import nexiosInstance from "@/src/lib/nexiosInstance";
import { TSuccess, TUser } from "@/src/types";
import Image from "next/image";
import { FaEdit } from "react-icons/fa";

export default async function Page() {
  const response = await nexiosInstance.get(
    "/users/me?populate=myPosts,following,followers,favouritePosts.user",
    {
      next: {
        tags: ["myprofile"],
        revalidate: 30,
      },
    }
  );
  const userData = (response?.data as TSuccess<TUser>).data;
  // const profilePicture = userData?.profilePicture || noProfileImage;
  const profilePicture = noProfileImage;

  return (
    <div>
      <div className="flex gap-x-10 items-center ">
        {/* Profile Picture */}
        <div className="relative w-44 h-44 rounded-full border-common-600 border-[3px]">
          <Image
            src={profilePicture}
            fill
            className="object-cover object-center rounded-full p-1 "
            alt={`${userData?.name} cover picture`}
          />

          <div className="p-1 absolute bottom-2 right-1 bg-white rounded-full">
            <FaEdit className="size-7 z-10   text-common-600 hover:text-common-500 duration-100 cursor-pointer" />
          </div>
        </div>
        {/* Other Information */}
        <div className="space-y-4">
          <div className="space-y-1">
            <div>
              <h2 className="text-3xl font-semibold">{userData.name}</h2>
            </div>
            <h4 className="font-medium">{userData.email}</h4>
          </div>
          <div className="flex space-x-8">
            <p>{userData?.myPosts.length} Posts</p>
            <FollowersFollowingModal
              title="Followers"
              users={userData?.followers as TUser[]}
            >
              <p className="cursor-pointer">
                {userData?.followers.length} Followers
              </p>
            </FollowersFollowingModal>
            <FollowersFollowingModal
              title="Following"
              users={userData?.following as TUser[]}
            >
              <p className="cursor-pointer">
                {userData?.following.length} Following
              </p>
            </FollowersFollowingModal>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <ProfileTabs userData={userData} />
      </div>
    </div>
  );
}
