// "use client";

// import { useUserProvider } from "@/src/context/user.provider";
// import { useFollowUser } from "@/src/hooks/user.mutate.hook";
// import { TUser } from "@/src/types";

// type TProps = {
//   loginUserData: TUser | null;
//   profileUserId : string;
// };
// const RandomPersonProfileFollow = ({ loginUserData,profileUserId }: TProps) => {
//     const { mutate: handleFollowingUser, isLoading: isFollowingLoading } =
//     useFollowUser();
//   const { user } = useUserProvider();
//   const currentLoginUserEmail = user?.email;
//   return (
//     <div>
//       <h1 className="text-2xl"> Follow </h1>
//     </div>
//   );
// };

// export default RandomPersonProfileFollow;

"use client";

import { useUserProvider } from "@/src/context/user.provider";
import { useFollowUser } from "@/src/hooks/user.mutate.hook";
import { TUser } from "@/src/types";
import { Button } from "@nextui-org/react";
import { Tooltip } from "@nextui-org/tooltip";
import { useEffect, useState } from "react";

type TProps = {
  loginUserData: TUser | null;
  profileUserId: string;
  profileUserName: string;
};

const RandomPersonProfileFollow = ({
  loginUserData,
  profileUserId,
  profileUserName,
}: TProps) => {
  const { mutate: handleFollowingUser, isLoading: isFollowingLoading } =
    useFollowUser();
  const { user } = useUserProvider();
  const currentLoginUserEmail = user?.email;
  const [isFollowing, setIsFollowing] = useState<boolean>(false);

  const isPostUserFollowing =
    currentLoginUserEmail &&
    (loginUserData?.following as string[])?.includes(profileUserId);

  useEffect(() => {
    if (
      loginUserData &&
      (loginUserData?.following as string[])?.includes(profileUserId)
    ) {
      setIsFollowing(true);
    } else {
      setIsFollowing(false);
    }
  }, [loginUserData, profileUserId]);

  const handleFollow = (value: "add" | "remove") => {
    const confirm = window.confirm(
      value === "add"
        ? `Are you sure to follow the ${profileUserName}?`
        : `Are you sure to unfollow the ${profileUserName}?`
    );
    if (confirm) {
      handleFollowingUser(profileUserId);
    }
  };

  return (
    <div>
      {isPostUserFollowing ? (
        <Tooltip content="Already followed. Click to unfollow" closeDelay={50}>
          <Button
            size="sm"
            className="bg-gray-200 dark:bg-gray-600 dark:text-gray-200  px-3 py-1 rounded-lg font-semibold cursor-pointer text-xs h-7"
            isLoading={isFollowingLoading}
            onClick={() => handleFollow("remove")}
          >
            Followed
          </Button>
        </Tooltip>
      ) : (
        <Tooltip content="Click to follow" closeDelay={50}>
          <Button
            size="sm"
            className="bg-blue-500 text-white px-3 py-1 rounded-lg font-semibold cursor-pointer text-xs h-7"
            isLoading={isFollowingLoading}
            onClick={() => handleFollow("add")}
          >
            Follow
          </Button>
        </Tooltip>
      )}
    </div>
  );
};

export default RandomPersonProfileFollow;
