import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { BiSolidDownvote, BiSolidUpvote } from "react-icons/bi";

type TProps = {
  upvote: number;
  downvote: number;
  comments: string[];
};

export default function ProfilePostAction({
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
      <p className="text-gray-500">
        {comments.length} {comments.length === 1 ? "Comment" : "Comments"}
      </p>
    </div>
  );
}
