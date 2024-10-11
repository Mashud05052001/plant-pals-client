import noProfilePicture from "@/src/assets/no-profile.jpg";
import verified from "@/src/assets/verified.png";
import {
  useDeletePost,
  useManageFavouritePost,
} from "@/src/hooks/post.mutate.hook";
import { useFollowUser } from "@/src/hooks/user.mutate.hook";
import { TCategory, TPlaneUser, TPost, TUser } from "@/src/types";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { Button, Divider } from "@nextui-org/react";
import { Tooltip } from "@nextui-org/tooltip";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";
import { IoTrashSharp } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import LoginConfirmationModal from "../../modal/singleModal/LoginConfirmationModal";
import PartialComponentGlassLoading from "../../shared/loading/PartialCompoentLoading";
import PremiumLogo from "../../shared/PremiumLogo";
import DOMPurify from "dompurify";

type TProps = {
  post: TPost;
  loginUserData: TPlaneUser | null;
  currentLoginUserEmail?: string | null;
  setAllStaticPosts: Dispatch<SetStateAction<TPost[]>>;
  setTotalPostsCount: Dispatch<SetStateAction<number>>;
};

export default function NewsFeedHeader({
  post,
  loginUserData,
  setAllStaticPosts,
  setTotalPostsCount,
  currentLoginUserEmail,
}: TProps) {
  const [deletedPostId, setDeletedPostId] = useState("");
  const [favouritePostId, setFavouritePostId] = useState("");
  const [isFavouriteAdding, setisfavouriteAdding] = useState<boolean>();
  const createdUserData = post?.user as TUser;
  const postCategory = (post?.category as TCategory)?.name;
  const isPostUserFollowing =
    currentLoginUserEmail &&
    loginUserData?.following.includes(createdUserData._id);
  const userProfileLink =
    currentLoginUserEmail === createdUserData?.email
      ? `/profile`
      : `/users/${createdUserData?._id}`;

  const {
    mutate: handleDeletePost,
    isSuccess: isDeleteSuccess,
    isError: isDeleteError,
  } = useDeletePost();
  const { mutate: handleFollowingUser, isLoading: isFollowingLoading } =
    useFollowUser();
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
  const handleFollow = (
    userId: string,
    userName: string,
    value: "add" | "remove"
  ) => {
    const confirm = window.confirm(
      value === "add"
        ? `Are you sure to follow the ${userName}?`
        : `Are you sure to unfollow the ${userName}?`
    );
    if (confirm) {
      handleFollowingUser(userId);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setDeletedPostId("");
      setFavouritePostId("");
    }, 2000);
  }, [isDeleteSuccess, isDeleteError, isFavouriteError, isFavouriteSuccess]);

  useEffect(() => {
    if (isDeleteSuccess) {
      setAllStaticPosts((prev) => {
        const remainingPosts = prev.filter(
          (post) => post?._id !== deletedPostId
        );
        return remainingPosts;
      });
      setTotalPostsCount((prev) => prev - 1);
    }
  }, [isDeleteSuccess]);

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
      {/* Loading Spinner */}
      <>
        {deletedPostId === post?._id && (
          <PartialComponentGlassLoading className="rounded-lg">
            <p className="dark:text-gray-200">Post is deleting</p>
          </PartialComponentGlassLoading>
        )}

        {favouritePostId === post?._id && (
          <PartialComponentGlassLoading className="rounded-lg">
            <p className="dark:text-gray-200">
              Post is {isFavouriteAdding ? "adding into" : "removing from"}{" "}
              favourites
            </p>
          </PartialComponentGlassLoading>
        )}
      </>
      <div className="w-full">
        {/* Favourite Post Action Header */}

        <div>
          {/* Creater Infos */}
          <div className="flex items-center justify-between relative">
            {/* Post Created By User Information */}
            <div className="flex items-center space-x-4">
              <div className="w-12 relative h-12 border-[1px] rounded-full border-common-600 dark:border-gray-500">
                <Image
                  src={createdUserData?.profilePicture || noProfilePicture}
                  alt={`Profile-${createdUserData?.name}`}
                  fill
                  className="object-cover rounded-full p-0.5"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Link href={userProfileLink}>
                  <h4 className="text-lg font-bold dark:text-gray-100">
                    {createdUserData?.name}
                  </h4>
                </Link>
                {/* Verified Tag */}
                <div>
                  {(post?.user as TUser).isVerified && (
                    <Tooltip content={`Verified`} closeDelay={50}>
                      <Image
                        src={verified}
                        alt="verified-logo"
                        height={25}
                        width={25}
                      />
                    </Tooltip>
                  )}
                </div>
                {/* Follow | Unfollow */}
                <div className="pl-2">
                  {loginUserData &&
                    (post?.user as TUser)._id !== loginUserData?._id && (
                      <>
                        {isPostUserFollowing ? (
                          <Tooltip
                            content="Already followed. Click to unfollow"
                            closeDelay={50}
                          >
                            <Button
                              size="sm"
                              className="bg-gray-200 dark:bg-gray-600 dark:text-gray-200 px-3 py-1 rounded-lg font-semibold cursor-pointer text-xs h-7"
                              isLoading={isFollowingLoading}
                              onClick={() =>
                                handleFollow(
                                  (post?.user as TUser)._id,
                                  (post?.user as TUser).name,
                                  "remove"
                                )
                              }
                            >
                              Followed
                            </Button>
                          </Tooltip>
                        ) : (
                          <Tooltip content="Click to follow" closeDelay={50}>
                            <Button
                              size="sm"
                              className="bg-blue-500 dark:bg-blue-700 text-white px-3 py-1 rounded-lg font-semibold cursor-pointer text-xs h-7"
                              isLoading={isFollowingLoading}
                              onClick={() =>
                                handleFollow(
                                  (post?.user as TUser)._id,
                                  (post?.user as TUser).name,
                                  "add"
                                )
                              }
                            >
                              Follow
                            </Button>
                          </Tooltip>
                        )}
                      </>
                    )}
                </div>
              </div>
            </div>

            {/* News Feed Action Button */}

            <div className="flex items-center space-x-3">
              {/* News feed add to favourite button */}
              <div>
                {loginUserData ? (
                  <>
                    {loginUserData?.favouritePosts?.includes(post?._id) ? (
                      <FaHeart
                        className="size-6 cursor-pointer text-red-600"
                        onClick={() =>
                          handleFavourite(post?._id, post?.title, "remove")
                        }
                      />
                    ) : (
                      <FaRegHeart
                        className="size-6 cursor-pointer dark:text-gray-300"
                        onClick={() =>
                          handleFavourite(post?._id, post?.title, "add")
                        }
                      />
                    )}
                  </>
                ) : (
                  <LoginConfirmationModal>
                    <FaRegHeart className="size-6 cursor-pointer dark:text-gray-300" />
                  </LoginConfirmationModal>
                )}
              </div>
              {/* News Feed Dropdown button */}
              {createdUserData?.email === currentLoginUserEmail && (
                <Dropdown
                  className="absolute right-[7rem]"
                  style={{ minWidth: "225px" }}
                  backdrop="opaque"
                >
                  <DropdownTrigger>{optionsButtons}</DropdownTrigger>
                  <DropdownMenu
                    aria-label="Static Actions"
                    style={{ minWidth: "220px" }}
                    className="dark:bg-gray-700 dark:text-gray-300"
                  >
                    <DropdownItem key="edit">
                      <Link
                        href={`/posts/update-post/${post?._id}?redirect=/profile`}
                        className="bg-red-200 dark:bg-gray-600"
                      >
                        <div className="flex items-center space-x-2">
                          <MdEdit className="size-4 dark:text-gray-200" />
                          <p>Edit My Post</p>
                        </div>
                      </Link>
                    </DropdownItem>
                    <DropdownItem
                      key="delete"
                      className="text-danger"
                      color="danger"
                      onClick={() => handleDelete(post?._id, post?.title)}
                      startContent={
                        <IoTrashSharp className="size-4 dark:text-red-500" />
                      }
                    >
                      Delete My Post
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              )}
            </div>
          </div>
          <Divider className="mb-4 mt-3 w-full bg-common-600 dark:bg-gray-500 h-[1.1px] border-2" />
        </div>

        {/* Action Header */}
        <Link href={`/posts/${post?._id}`}>
          <div className="hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg duration-200 px-3 pb-3">
            <div className="flex items-end cursor-pointer w-fit">
              <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200">
                {post?.title}
                <span className="pl-2 text-sm pb-0.5 dark:text-gray-400">
                  ({postCategory && postCategory})
                </span>
              </h3>
              {post?.isPremium && <PremiumLogo />}
            </div>

            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 mt-1">
              Date: {moment(post?.createdAt).format(`DD-MM-YYYY`)}
            </p>

            {/* Post Description */}
            <div className="article-content dark:text-gray-300">
              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(post?.description as string),
                }}
              />
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
