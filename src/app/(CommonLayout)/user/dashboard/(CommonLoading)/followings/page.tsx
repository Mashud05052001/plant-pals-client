"use server";
import UserDashboardFollowings from "@/src/components/modules/userDashboard/UserDashboardFollowing";
import { getMyFollowingFollowers } from "@/src/services/user.fetch.service";
import { RiUserUnfollowFill } from "react-icons/ri";

const Page = async () => {
  const userData = await getMyFollowingFollowers();

  return (
    <div>
      {userData?.following?.length === 0 ? (
        <div className="mt-20 flex flex-col justify-center items-center space-y-2 text-xl font-semibold pb-6">
          <RiUserUnfollowFill className="size-20 " />
          <p>NO Followings available</p>
        </div>
      ) : (
        <UserDashboardFollowings userData={userData} />
      )}
    </div>
  );
};

export default Page;
