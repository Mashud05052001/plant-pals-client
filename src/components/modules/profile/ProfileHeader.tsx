import noProfileImage from "@/src/assets/no-profile.jpg";
import { TUser } from "@/src/types";
import Image from "next/image";
import { FaEdit } from "react-icons/fa";
import { MdModeEditOutline, MdPassword } from "react-icons/md";
import EditProfileModel from "../../modal/profile/EditProfileModal";
import EditProfilePictureModel from "../../modal/profile/EditProfilePictureModal";
import FollowersFollowingModal from "../../modal/profile/FollowersFollowingModal";
import ChangePasswordModel from "../../modal/profile/ChangePasswordModal";

const ProfileHeader = ({ userData }: { userData: TUser }) => {
  const profilePicture = userData?.profilePicture || noProfileImage;

  return (
    <div className="flex gap-x-10 flex-col md:flex-row space-y-4 items-center select-none">
      {/* Profile Picture */}
      <div className="relative w-44 h-44 rounded-full border-common-600 border-[3px]">
        <Image
          src={profilePicture}
          fill
          className="object-cover object-center rounded-full p-1 "
          alt={`${userData?.name} cover picture`}
        />
        <div className="p-1 absolute bottom-2 right-1 bg-white rounded-full">
          <EditProfilePictureModel
            userID={userData?._id}
            currentImage={userData?.profilePicture}
          >
            <FaEdit className="size-7 z-10   text-common-600 hover:text-common-500 duration-100 cursor-pointer" />
          </EditProfilePictureModel>
        </div>
      </div>
      {/* Other Information */}
      <div className="space-y-4">
        <div className="space-y-1 flex flex-col md:flex-row items-center md:items-end md:space-x-12 justify-center">
          <div className="relative">
            <div className="flex items-end">
              <h2 className="text-3xl font-semibold">{userData.name}</h2>
              <p className="text-sm pl-1 mb-1">_{userData?.role}</p>
            </div>
            <h4 className="font-medium">{userData.email}</h4>
            {userData?.bio && (
              <div className="whitespace-pre-wrap">{userData?.bio}</div>
            )}
          </div>
          <div className="space-y-2">
            <div className="flex space-x-4">
              <EditProfileModel userData={userData}>
                <div className="flex items-center space-x-1 hover:text-green-600 duration-100">
                  <MdModeEditOutline className="size-4" />
                  <p>Edit Profile</p>
                </div>
              </EditProfileModel>
              <ChangePasswordModel>
                <div className="flex items-center space-x-2 hover:text-green-600 duration-100">
                  <MdPassword className="size-4" />
                  <p>Change Password</p>
                </div>
              </ChangePasswordModel>
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
      </div>
    </div>
  );
};

export default ProfileHeader;
