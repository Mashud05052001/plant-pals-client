"use client";
import noProfilePicture from "@/src/assets/no-profile.jpg";
import {
  useDeletePost,
  useManageFavouritePost,
} from "@/src/hooks/post.mutate.hook";
import { TCategory, TPlaneUser, TPost, TUser } from "@/src/types";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { Button, Divider, Tooltip } from "@nextui-org/react";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import { HiDotsVertical } from "react-icons/hi";
import { IoTrashSharp } from "react-icons/io5";
import { MdEdit, MdOutlineWorkspacePremium } from "react-icons/md";
import LoginConfirmationModal from "../../modal/singleModal/LoginConfirmationModal";
import PartialComponentGlassLoading from "../../shared/loading/PartialCompoentLoading";
import PremiumLogo from "../../shared/PremiumLogo";

type TProps = {
  post: TPost;
  type: "myPosts" | "myFavouritePosts" | "otherPosts";
  // For Favourite post section
  createdUserData?: Pick<
    TUser,
    "_id" | "name" | "email" | "role" | "profilePicture"
  >;
  // For Single user section
  loginUserData?: TPlaneUser | null;
  userId?: string;
};

export default function ProfilePostHeader({
  post,
  type,
  createdUserData,
  loginUserData,
  userId,
}: TProps) {
  const postId = post?._id,
    title = post?.title,
    category = (post?.category as TCategory).name,
    description = post?.description || "",
    createdAt = post?.createdAt;

  const [deletedPostId, setDeletedPostId] = useState("");
  const [isFavouriteAdding, setisfavouriteAdding] = useState<boolean>();
  const [favouritePostId, setFavouritePostId] = useState("");

  const {
    mutate: handleDeletePost,
    isSuccess: isDeleteSuccess,
    isError: isDeleteError,
  } = useDeletePost();
  const {
    mutate: handleManageFavouritePost,
    isSuccess: isFavouriteSuccess,
    isError: isFavouriteError,
  } = useManageFavouritePost();

  const handleDelete = (postId: string, postTitle: string) => {
    const confirm = window.confirm(`Are you sure to delete ${postTitle} post?`);
    if (confirm) {
      setDeletedPostId(postId);
      handleDeletePost(postId);
    }
  };

  const handleFavourite = (
    postId: string,
    postTitle: string,
    value: "add" | "remove"
  ) => {
    const confirm = window.confirm(
      value === "add"
        ? `Are you sure to add the ${postTitle} post into favourites?`
        : `Are you sure to remove the ${postTitle} post from favourites?`
    );
    if (confirm) {
      setisfavouriteAdding(value === "add" ? true : false);
      setFavouritePostId(postId);
      handleManageFavouritePost({ postId, value });
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setDeletedPostId("");
      setFavouritePostId("");
    }, 2000);
  }, [isDeleteSuccess, isDeleteError, isFavouriteError, isFavouriteSuccess]);

  const optionsButtons = (
    <Button
      variant="bordered"
      size="sm"
      style={{
        borderRadius: "50%",
        minHeight: "40px",
        minWidth: "40px",
        padding: 0,
      }}
      className="border-opacity-0 hover:border-opacity-80 duration-150"
    >
      <HiDotsVertical className="size-6" />
    </Button>
  );

  return (
    <div className="flex justify-between ">
      {deletedPostId === postId && (
        <PartialComponentGlassLoading className="rounded-lg">
          <p>Post is deleting</p>
        </PartialComponentGlassLoading>
      )}
      {favouritePostId === postId && (
        <PartialComponentGlassLoading className="rounded-lg">
          <p>
            Post is {isFavouriteAdding ? "adding into" : "removing from"}{" "}
            favourites
          </p>
        </PartialComponentGlassLoading>
      )}
      <div className="w-full">
        {/* Favourite Post Action Button */}
        {type === "myFavouritePosts" && (
          <>
            <div className="flex items-center justify-between relative ">
              <div className="flex items-center space-x-4">
                <div className="w-12 relative h-12 border-[1px] rounded-full border-common-600">
                  <Image
                    src={createdUserData?.profilePicture || noProfilePicture}
                    alt={`Profile-${createdUserData?.name}`}
                    fill
                    className="object-cover rounded-full p-0.5"
                  />
                </div>
                <h4 className="text-lg font-bold">{createdUserData?.name}</h4>
              </div>
              <Dropdown
                className="absolute right-[7rem]"
                style={{ minWidth: "225px" }}
                backdrop="opaque"
              >
                <DropdownTrigger>{optionsButtons}</DropdownTrigger>
                <DropdownMenu
                  aria-label="Static Actions"
                  style={{ minWidth: "220px" }}
                >
                  <DropdownItem
                    key="delete"
                    className="text-danger"
                    color="danger"
                    onClick={() => handleFavourite(postId, title, "remove")}
                    startContent={<IoTrashSharp className="size-4" />}
                  >
                    Remove From Favourites
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
            <Divider className="mb-4 mt-3 w-full bg-common-600 h-[1.1px] border-2" />
          </>
        )}
        <Link href={`/posts/${postId}`}>
          <div className="hover:bg-gray-100 rounded-lg duration-200 px-3 pb-3">
            <div className="flex items-end">
              <h3 className="font-semibold text-lg text-gray-800 ">{title}</h3>
              <h4 className="pl-1 text-sm pb-0.5"> ({category && category})</h4>
              {post?.isPremium && <PremiumLogo />}
            </div>
            <p className="text-sm text-gray-500 mb-3 mt-1">
              Date: {moment(createdAt).format(`DD-MM-YYYY`)}
            </p>

            {/* Post Description */}
            {/* //TODO : Rich text not working */}
            {/* <div
            className="text-gray-700 mb-4"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(description),
            }}
          /> */}
            {description}
          </div>
        </Link>
      </div>
      {/* My Posts ACtion Button */}
      {type === "myPosts" && (
        <Dropdown
          className="absolute right-0"
          style={{ width: "auto" }}
          backdrop="opaque"
        >
          <DropdownTrigger>{optionsButtons}</DropdownTrigger>
          <DropdownMenu aria-label="Static Actions">
            <DropdownItem key="edit">
              <Link
                href={`/posts/update-post/${postId}?redirect=/profile`}
                className="bg-red-200"
              >
                <div className="flex  items-center space-x-2">
                  <MdEdit className="size-4" />
                  <p>Edit</p>
                </div>
              </Link>
            </DropdownItem>
            <DropdownItem
              key={"edit"}
              onClick={() => handleFavourite(postId, title, "add")}
              startContent={<FcLike className="size-4 text-black" />}
            >
              Add To Favourites
            </DropdownItem>
            <DropdownItem
              key="delete"
              className="text-danger"
              color="danger"
              onClick={() => handleDelete(postId, title)}
              startContent={<IoTrashSharp className="size-4" />}
            >
              Delete
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      )}
      {type === "otherPosts" && (
        <div className="ml-10 mt-3 mr-3">
          {loginUserData ? (
            <>
              {loginUserData?.favouritePosts?.includes(postId) ? (
                <FaHeart
                  className="size-6 cursor-pointer text-red-600"
                  onClick={() => handleFavourite(postId, title, "remove")}
                />
              ) : (
                <FaRegHeart
                  className="size-6 cursor-pointer"
                  onClick={() => handleFavourite(postId, title, "add")}
                />
              )}
            </>
          ) : (
            <LoginConfirmationModal
              redirect={`${userId ? `/users/${userId}` : "/"}`}
            >
              <FaRegHeart className="size-6 cursor-pointer " />
            </LoginConfirmationModal>
          )}
        </div>
      )}
    </div>
  );
}
