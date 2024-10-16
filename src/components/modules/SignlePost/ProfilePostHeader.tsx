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
import { Button, Divider } from "@nextui-org/react";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import { HiDotsVertical } from "react-icons/hi";
import { IoTrashSharp } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import LoginConfirmationModal from "../../modal/singleModal/LoginConfirmationModal";
import PartialComponentGlassLoading from "../../shared/loading/PartialCompoentLoading";
import PremiumLogo from "../../shared/PremiumLogo";
import DOMPurify from "dompurify";

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
    category = (post?.category as TCategory)?.name,
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
    <div className="flex justify-between">
      {deletedPostId === postId && (
        <PartialComponentGlassLoading className="rounded-lg">
          <p className="dark:text-gray-200">Post is deleting</p>
        </PartialComponentGlassLoading>
      )}
      {favouritePostId === postId && (
        <PartialComponentGlassLoading className="rounded-lg">
          <p className="dark:text-gray-200">
            Post is {isFavouriteAdding ? "adding into" : "removing from"}{" "}
            favourites
          </p>
        </PartialComponentGlassLoading>
      )}
      <div className="w-full dark:bg-dark-900">
        {/* Favourite Post Action Button */}
        {type === "myFavouritePosts" && (
          <>
            <div className="flex items-center justify-between relative">
              <div className="flex items-center space-x-4">
                <div className="w-12 relative h-12 border-[1px] rounded-full border-common-600 dark:border-gray-600">
                  <Image
                    src={createdUserData?.profilePicture || noProfilePicture}
                    alt={`Profile-${createdUserData?.name}`}
                    fill
                    className="object-cover rounded-full p-0.5"
                  />
                </div>
                <h4 className="text-lg font-bold dark:text-gray-200">
                  {createdUserData?.name}
                </h4>
              </div>
              <Dropdown
                className="absolute right-[7rem] dark:bg-dark-700"
                style={{ minWidth: "225px" }}
                backdrop="opaque"
              >
                <DropdownTrigger>{optionsButtons}</DropdownTrigger>
                <DropdownMenu
                  aria-label="Static Actions"
                  style={{ minWidth: "220px" }}
                  className="dark:bg-dark-700 dark:text-gray-200"
                >
                  <DropdownItem
                    key="delete"
                    className="text-danger dark:text-red-500"
                    color="danger"
                    onClick={() => handleFavourite(postId, title, "remove")}
                    startContent={<IoTrashSharp className="size-4" />}
                  >
                    Remove From Favourites
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
            <Divider className="mb-4 mt-3 w-full bg-common-600 h-[1.1px] border-2 dark:bg-gray-700" />
          </>
        )}
        <Link href={`/posts/${postId}`}>
          <div className=" hover:bg-gray-100 dark:hover:bg-gray-700  rounded-lg duration-200 px-3 pb-3">
            <div className="flex items-end">
              <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-100">
                {title}
                <span className="pl-2 text-sm pb-0.5 dark:text-gray-400">
                  ({category && category})
                </span>
              </h3>
              {post?.isPremium && <PremiumLogo />}
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 mt-1">
              Date: {moment(createdAt).format(`DD-MM-YYYY`)}
            </p>

            {/* Post Description */}
            <div className="article-content dark:text-gray-300">
              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(description as string),
                }}
              />
            </div>
          </div>
        </Link>
      </div>
      {/* My Posts Action Button */}
      {type === "myPosts" && (
        <Dropdown
          className="absolute right-0 dark:bg-dark-700"
          style={{ width: "auto" }}
          backdrop="opaque"
        >
          <DropdownTrigger>{optionsButtons}</DropdownTrigger>
          <DropdownMenu
            aria-label="Static Actions"
            className="dark:bg-dark-700 dark:text-gray-200"
          >
            <DropdownItem key="edit">
              <Link
                href={`/posts/update-post/${postId}?redirect=/profile`}
                className="bg-red-200 dark:bg-red-800"
              >
                <div className="flex items-center space-x-2">
                  <MdEdit className="size-4" />
                  <p>Edit</p>
                </div>
              </Link>
            </DropdownItem>
            <DropdownItem
              key={"edit"}
              onClick={() => handleFavourite(postId, title, "add")}
              startContent={
                <FcLike className="size-4 text-black dark:text-white" />
              }
            >
              Add To Favourites
            </DropdownItem>
            <DropdownItem
              key="delete"
              className="text-danger dark:text-red-500"
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
                  className="size-6 cursor-pointer dark:text-gray-400"
                  onClick={() => handleFavourite(postId, title, "add")}
                />
              )}
            </>
          ) : (
            <LoginConfirmationModal
              redirect={`${userId ? `/users/${userId}` : "/"}`}
            >
              <FaRegHeart className="size-6 cursor-pointer dark:text-gray-400" />
            </LoginConfirmationModal>
          )}
        </div>
      )}
    </div>
  );
}
