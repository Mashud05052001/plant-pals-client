"use client";
import noProfileImage from "@/src/assets/no-profile.jpg";
import { useFollowUser } from "@/src/hooks/user.mutate.hook";
import { TUser } from "@/src/types";
import Image from "next/image";
import Link from "next/link";
import { ReactNode, useState } from "react";
import { IoTrashSharp } from "react-icons/io5";
import { RiUserUnfollowFill } from "react-icons/ri";
import ModalContainer from "../ModalContainer";

type TProps = {
  children: ReactNode;
  title: "Following" | "Followers";
  users: TUser[];
};

const FollowersFollowingModal = ({ title, children, users }: TProps) => {
  const [openModal, setOpenModal] = useState(false);
  const { mutate: handleRemoveUserFromFollowersOrFollowing } = useFollowUser();

  const handleRemove = (userID: string, userName: string) => {
    const confirm = window.confirm(
      `Are you sure to remove ${userName} from your ${title.toLowerCase()} list?`
    );
    if (confirm) {
      handleRemoveUserFromFollowersOrFollowing(userID);
    }
  };

  return (
    <div className="relative">
      <ModalContainer
        isOpen={openModal}
        setIsOpen={setOpenModal}
        triggerElement={children}
        title={title}
        backdrop="opaque"
        outsideClickToCloseModal={true}
        hideCloseButton={false}
        placement="top"
      >
        <div>
          {users?.length > 0 ? (
            <div className="space-y-3 pb-4">
              {users.map((user) => (
                <div
                  key={user._id}
                  className="flex border-b-[1px] border-b-common-600 p-2 shadow-md rounded-md justify-between items-center"
                >
                  <div className="flex">
                    <div className="relative w-10 h-10 rounded-full">
                      <Image
                        src={
                          user?.profilePicture !== ""
                            ? user?.profilePicture
                            : noProfileImage
                        }
                        alt="User Image"
                        fill
                        className="object-cover object-center rounded-full"
                      />
                    </div>
                    <div className="ml-6">
                      <Link
                        href={`/user/${user?._id}`}
                        className="hover:underline"
                      >
                        {user?.name}
                      </Link>
                    </div>
                  </div>
                  {title === "Following" && (
                    <div className="pr-3">
                      <IoTrashSharp
                        className="size-6  hover:text-red-600 duration-200 cursor-pointer"
                        onClick={() => handleRemove(user?._id, user?.name)}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-6 flex flex-col justify-center items-center space-y-2 text-xl font-medium text-red-700 pb-6">
              <RiUserUnfollowFill className="size-20 " />
              <p>NO {title} available</p>
            </div>
          )}
        </div>
      </ModalContainer>
    </div>
  );
};

export default FollowersFollowingModal;
