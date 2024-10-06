import noProfilePicture from "@/src/assets/no-profile.jpg";
import {
  useDeletePost,
  useManageFavouritePost,
} from "@/src/hooks/post.mutate.hook";
import { TUser } from "@/src/types";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { Button, Divider } from "@nextui-org/react";
import DOMPurify from "dompurify";
import moment from "moment";
import Image from "next/image";
import { useEffect, useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { IoTrashSharp } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import { FcLike } from "react-icons/fc";
import PartialComponentGlassLoading from "../../shared/loading/PartialCompoentLoading";

type TProps = {
  postId: string;
  title: string;
  createdAt: Date;
  description: string;
  createdUserData?: Pick<
    TUser,
    "_id" | "name" | "email" | "role" | "profilePicture"
  >;
  type: "myPosts" | "myFavouritePosts";
};

export default function ProfilePostHeader({
  postId,
  title,
  description,
  createdAt,
  type,
  createdUserData,
}: TProps) {
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

        <div>
          <h2 className="font-semibold text-lg text-gray-800 ">{title}</h2>
          <p className="text-sm text-gray-500 mb-3">
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
            <DropdownItem
              key="edit"
              startContent={<MdEdit className="size-4" />}
            >
              Edit
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
    </div>
  );
}
