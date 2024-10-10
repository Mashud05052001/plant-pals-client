import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { BiSolidDownvote, BiSolidUpvote } from "react-icons/bi";
import { Button } from "@nextui-org/react";
import { IoMdShare } from "react-icons/io";
import { handleCopyToClipboard } from "@/src/utils/copyToClipboard";
import envConfig from "@/src/config/envConfig";
import PostCommentsModal from "../../modal/singleModal/PostCommentsModal";

type TProps = {
  postId: string;
  upvote: number;
  downvote: number;
  comments: string[];
};

export default function ProfilePostAction({
  postId,
  comments,
  downvote,
  upvote,
}: TProps) {
  return (
    <div className="flex items-center justify-between mt-4">
      <div className="flex items-center space-x-4">
        {/* Upvote Button */}
        <button className="flex items-center text-gray-500 hover:text-blue-500">
          <BiSolidUpvote className="size-5" />
          <span className="ml-1 text-lg font-semibold">{upvote}</span>
        </button>

        {/* Downvote Button */}
        <button className="flex items-center text-gray-500 hover:text-red-500">
          <BiSolidDownvote className="size-5" />
          <span className="ml-1 text-lg font-semibold">{downvote}</span>
        </button>
      </div>

      {/* Comment Count */}
      <div className="flex space-x-6 items-center">
        <PostCommentsModal postId={postId}>
          <p className="text-gray-500 cursor-pointer hover:underline ">
            {comments?.length} {comments?.length === 1 ? "Comment" : "Comments"}
          </p>
        </PostCommentsModal>

        <Button variant="faded" size="sm" className="border-none">
          <IoMdShare
            className="size-6 cursor-pointer"
            onClick={() => {
              handleCopyToClipboard(`${envConfig.baseURL}/posts/${postId}`);
            }}
          />
        </Button>
      </div>
    </div>
  );
}
