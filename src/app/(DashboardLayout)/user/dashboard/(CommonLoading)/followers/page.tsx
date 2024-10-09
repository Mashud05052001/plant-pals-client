"use server";
import UserDashboardFollowers from "@/src/components/modules/userDashboard/UserDashboardFollower";
import { getMyFollowingFollowers } from "@/src/services/user.fetch.service";
import { RiUserUnfollowFill } from "react-icons/ri";

const Page = async () => {
  const userData = await getMyFollowingFollowers();

  return (
    <div>
      {userData?.followers?.length === 0 ? (
        <div className="mt-20 flex flex-col justify-center items-center space-y-2 text-xl font-semibold pb-6">
          <RiUserUnfollowFill className="size-20 " />
          <p>NO Followers available</p>
        </div>
      ) : (
        <UserDashboardFollowers userData={userData} />
      )}
    </div>
  );
};

export default Page;
