"use client";
import envConfig from "@/src/config/envConfig";
import { useUserProvider } from "@/src/context/user.provider";
import { useVoatingPost } from "@/src/hooks/post.mutate.hook";
import { TPlaneUser, TPost, TUser } from "@/src/types";
import { handleCopyToClipboard } from "@/src/utils/copyToClipboard";
import { Button, Spinner } from "@nextui-org/react";
import { useState } from "react";
import { BiSolidDownvote, BiSolidUpvote } from "react-icons/bi";
import { IoMdShare } from "react-icons/io";
import { toast } from "sonner";
import LoginConfirmationModal from "../../modal/singleModal/LoginConfirmationModal";
import PostCommentsModal from "../../modal/singleModal/PostCommentsModal";

type TProps = {
  post: TPost;
  loginUserData: TPlaneUser | null;
  showCommentsModal?: boolean;
};

export default function SinglePostAction({
  post,
  loginUserData,
  showCommentsModal = false,
}: TProps) {
  const { user } = useUserProvider();
  const currentLoginUserEmail = user?.email || null;

  const [votingInfo, setVotingInfo] = useState<{
    user: string;
    value: 1 | -1;
  } | null>(null);

  const {
    mutate: handleVoteUser,
    isSuccess: isVoteSuccess,
    isLoading: isVoteLoading,
  } = useVoatingPost();
  const hasVoted = post?.voatingUsers.find(
    (item) => item.user === loginUserData?._id
  );
  const isPostOwner = (post.user as TUser)._id === loginUserData?._id;

  const generateUpvoteButton = (
    type: "voted" | "notVoted" | "ownPost" | "none"
  ) => {
    const upvoteButtonInnerElem = (
      <div className="flex  items-center">
        <BiSolidUpvote className="size-5" />
        <span className="ml-1 text-lg font-semibold">{post?.upvote}</span>
      </div>
    );
    if (type === "ownPost") {
      return (
        <button
          className="text-gray-500 hover:text-blue-500 cursor-default"
          onClick={() => toast.error("You cann't upvote your own post")}
        >
          {upvoteButtonInnerElem}
        </button>
      );
    }
    if (type === "voted") {
      const toastMessage =
        hasVoted?.value === 1
          ? "You already upvote this post. Cann't upvote again"
          : "You already downvote this post. Cann't change to upvote";
      return (
        <button
          className={` cursor-default ${
            hasVoted?.value === 1 && "text-blue-500"
          }`}
          onClick={() => toast.error(toastMessage)}
        >
          {upvoteButtonInnerElem}
        </button>
      );
    }
    if (type === "notVoted") {
      return (
        <button
          className=" text-gray-500 hover:text-blue-500 "
          onClick={() => handleVote(post?._id, post?.title, 1)}
        >
          {upvoteButtonInnerElem}
        </button>
      );
    }
    return (
      <button className=" text-gray-500 hover:text-blue-500 ">
        {upvoteButtonInnerElem}
      </button>
    );
  };
  const generateDownvoteButton = (
    type: "voted" | "notVoted" | "ownPost" | "none"
  ) => {
    const downvoteButtonInnerElem = (
      <div className="flex items-center font-semibold">
        <BiSolidDownvote className="size-5" />
        <span className="ml-1 text-lg">{post?.downvote}</span>
      </div>
    );
    if (type === "ownPost") {
      return (
        <button
          className="text-gray-500 hover:text-red-500 cursor-default"
          onClick={() => toast.error("You cann't downvote your own post")}
        >
          {downvoteButtonInnerElem}
        </button>
      );
    }
    if (type === "voted") {
      const toastMessage =
        hasVoted?.value === -1
          ? "You already downvote this post. Cann't downvote again"
          : "You already upvote this post. Cann't change to downvote";
      return (
        <button
          className={`cursor-default ${
            hasVoted?.value === -1 && "text-red-500"
          }`}
          onClick={() => toast.error(toastMessage)}
        >
          {downvoteButtonInnerElem}
        </button>
      );
    }
    if (type === "notVoted") {
      return (
        <button
          className="flex items-center text-gray-500 hover:text-red-500"
          onClick={() => handleVote(post?._id, post?.title, -1)}
        >
          {downvoteButtonInnerElem}
        </button>
      );
    }
    return (
      <button className=" text-gray-500 hover:text-red-500 ">
        {downvoteButtonInnerElem}
      </button>
    );
  };

  const handleVote = (postId: string, postTitle: string, value: 1 | -1) => {
    const confirm = window.confirm(
      `Are you sure to ${
        value === 1 ? "UPVOTE" : "DOWNVOTE"
      } the ${postTitle} post?`
    );
    if (confirm) {
      const payload = { postId, value };
      handleVoteUser(payload);
      const voteInfo = { user: loginUserData?._id as string, value };
      setVotingInfo(voteInfo);
    }
  };

  return (
    <div className="flex items-center justify-between py-2 mt-4 px-2 relative ">
      {isVoteLoading && (
        <div className="w-full absolute bg-gray-200 z-10 top-0 h-full rounded-lg animate-pulse">
          <Spinner className="ml-7 mt-1" />
        </div>
      )}
      <div className="flex items-center space-x-6">
        {/* UPVOTE BUTTON */}
        {currentLoginUserEmail ? (
          isPostOwner ? (
            generateUpvoteButton("ownPost")
          ) : hasVoted ? (
            generateUpvoteButton("voted")
          ) : (
            generateUpvoteButton("notVoted")
          )
        ) : (
          <LoginConfirmationModal>
            {generateUpvoteButton("none")}
          </LoginConfirmationModal>
        )}
        {/* DOWNVOTE BUTTON */}
        {currentLoginUserEmail ? (
          isPostOwner ? (
            generateDownvoteButton("ownPost")
          ) : hasVoted ? (
            generateDownvoteButton("voted")
          ) : (
            generateDownvoteButton("notVoted")
          )
        ) : (
          <LoginConfirmationModal>
            {generateDownvoteButton("none")}
          </LoginConfirmationModal>
        )}
      </div>

      <div className="flex space-x-6 items-center">
        {showCommentsModal ? (
          <PostCommentsModal postId={post?._id}>
            <p className="text-gray-500 cursor-pointer hover:underline ">
              {post?.comments.length}{" "}
              {post?.comments.length === 1 ? "Comment" : "Comments"}
            </p>
          </PostCommentsModal>
        ) : (
          <p className="text-gray-500">
            {post?.comments.length}{" "}
            {post?.comments.length === 1 ? "Comment" : "Comments"}
          </p>
        )}
        <Button
          variant="faded"
          size="sm"
          className="border-none dark:bg-gray-700"
        >
          <IoMdShare
            className="size-6 cursor-pointer"
            onClick={() => {
              handleCopyToClipboard(`${envConfig.baseURL}/posts/${post?._id}`);
            }}
          />
        </Button>
      </div>
    </div>
  );
}
