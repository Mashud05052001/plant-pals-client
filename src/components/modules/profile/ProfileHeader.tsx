import noProfileImage from "@/src/assets/no-profile.jpg";
import { TUser } from "@/src/types";
import Image from "next/image";
import { FaEdit } from "react-icons/fa";
import EditProfileModel from "../../modal/profile/EditProfileModal";
import EditProfilePictureModel from "../../modal/profile/EditProfilePictureModal";
import FollowersFollowingModal from "../../modal/profile/FollowersFollowingModal";

const ProfileHeader = ({ userData }: { userData: TUser }) => {
  const profilePicture = userData?.profilePicture || noProfileImage;
  return (
    <div className="flex gap-x-10 items-center select-none">
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
        <div className="space-y-1 flex items-end space-x-6">
          <div>
            <div className="flex items-end">
              <h2 className="text-3xl font-semibold">{userData.name}</h2>
              <p className="text-sm pl-1 mb-1">_{userData?.role}</p>
            </div>
            <h4 className="font-medium">{userData.email}</h4>
          </div>
          <div>mahi</div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
