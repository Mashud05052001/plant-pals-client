"use client";
import { useEffect, useState } from "react";
import noProfile from "@/src/assets/no-profile.jpg";
import { TComment, TUser } from "@/src/types";
import { Textarea } from "@nextui-org/input";
import Image from "next/image";
import { IoMdSend } from "react-icons/io";
import CommentsSkeleton from "../../shekeleton/CommentsSkeleton";
import PPButton from "../../UI/button/PPButton";
import {
  useCreateComments,
  useDeleteComment,
  useGetCommentsOfAPost,
  useUpdateComment,
} from "@/src/hooks/comments.hook";
import moment from "moment";
import { useUserProvider } from "@/src/context/user.provider";
import Link from "next/link";
import { IoTrashSharp } from "react-icons/io5";
import { MdModeEdit } from "react-icons/md";
import { Spinner } from "@nextui-org/react";

type TProps = {
  postId: string;
};

const SinglePostComments = ({ postId }: TProps) => {
  const { user } = useUserProvider();
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState<[] | TComment[]>([]);
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [deletingCommentId, setdeletingCommentId] = useState<string | null>(
    null
  );
  const [editedCommentText, setEditedCommentText] = useState<string>("");
  const {
    data: commentsResponse,
    isLoading: getCommentsLoading,
    isSuccess: getCommentsSuccess,
  } = useGetCommentsOfAPost(postId, true);
  const {
    mutate: handleCreateComment,
    isLoading: commentCreateLoading,
    isSuccess: commentCreateSuccess,
    data: commentCreateData,
  } = useCreateComments();
  const {
    mutate: handleEditComment,
    isLoading: commentEditLoading,
    isSuccess: commentEditSuccess,
  } = useUpdateComment();
  const {
    mutate: handleDeleteComment,
    isLoading: commentDeleteLoading,
    isSuccess: commentDeleteSuccess,
  } = useDeleteComment();

  const createAComment = () => {
    const payload = {
      post: postId,
      message: newComment,
    };
    handleCreateComment(payload);
  };
  const editAComment = () => {
    const payload = {
      commentId: editingCommentId as string,
      payload: { message: editedCommentText as string },
    };
    handleEditComment(payload);
  };

  const deleteAComment = (commentId: string) => {
    const confirm = window.confirm("Are you sure to delete this comment?");
    if (confirm) {
      setdeletingCommentId(commentId);
      handleDeleteComment(commentId);
    }
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setEditedCommentText("");
  };
  //   console.log(editingCommentId, editedCommentText);
  useEffect(() => {
    if (!getCommentsLoading && getCommentsSuccess) {
      setComments(commentsResponse?.data);
    }
  }, [getCommentsSuccess, getCommentsLoading]);

  useEffect(() => {
    if (!commentCreateLoading && commentCreateSuccess) {
      const newComment = commentCreateData?.data;
      setComments((prev) => [newComment, ...prev]);
      setNewComment("");
    }
  }, [commentCreateLoading, commentCreateSuccess]);

  useEffect(() => {
    if (!commentEditLoading && commentEditSuccess) {
      setComments((prev) => {
        const newComments = prev.map((comment) =>
          comment?._id === editingCommentId
            ? { ...comment, message: editedCommentText }
            : comment
        );
        return newComments;
      });
      setEditingCommentId(null);
      setEditedCommentText("");
    }
  }, [commentEditLoading, commentEditSuccess]);
  useEffect(() => {
    if (!commentDeleteLoading && commentDeleteSuccess) {
      setComments((prev) => {
        const newComments = prev.filter(
          (comment) => comment?._id !== deletingCommentId
        );

        return newComments;
      });
      setdeletingCommentId(null);
    }
  }, [commentDeleteLoading, commentDeleteSuccess]);

  return (
    <div className="p-4">
      {/* Add Comment Input */}
      <div className="space-y-4 mb-8">
        <Textarea
          type="text"
          className="w-full border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder={
            !user?.email
              ? "Please login to comment on any post"
              : "Write a comment..."
          }
        />
        <div className="flex space-x-4">
          {!user?.email ? (
            <Link
              href={`/login`}
              className="text-sm cursor-pointer hover:underline dark:text-blue-400"
            >
              Click here to go to the login page
            </Link>
          ) : (
            <PPButton
              buttonText={<IoMdSend className="size-7" />}
              className="px-4"
              isLoading={commentCreateLoading}
              onClick={createAComment}
            />
          )}
        </div>
      </div>
      {/* Comments Section */}
      <div>
        {comments?.length > 0 ? (
          comments?.map((comment) => (
            <div key={comment?._id} className="flex space-x-5 mb-2">
              <div className="w-10 h-10 relative">
                <Image
                  src={(comment?.user as TUser)?.profilePicture || noProfile}
                  alt="profile-picture"
                  fill
                  className="rounded-full object-cover object-center"
                />
              </div>
              <div className="mb-2 border-b pb-2 flex-grow dark:border-gray-600">
                <div className="flex justify-between items-center">
                  <div>
                    <strong className="dark:text-gray-200">
                      {(comment?.user as TUser)?.name || "Anonymous"}
                    </strong>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {moment(comment?.createdAt).format("DD-MM-YYYY LT")}
                    </p>
                  </div>
                  {user?.email &&
                    user.email === (comment?.user as TUser)?.email && (
                      <div className="flex space-x-4">
                        {editingCommentId === comment?._id ? (
                          <>
                            {commentEditLoading ? (
                              <Spinner size="sm" />
                            ) : (
                              <button
                                className="cursor-pointer text-blue-600 dark:text-blue-400"
                                onClick={editAComment}
                              >
                                Save
                              </button>
                            )}
                            {commentDeleteLoading ? (
                              <Spinner size="sm" color="danger" />
                            ) : (
                              <button
                                className="cursor-pointer text-red-600 dark:text-red-400"
                                onClick={handleCancelEdit}
                              >
                                Cancel
                              </button>
                            )}
                          </>
                        ) : (
                          <>
                            <p className="cursor-pointer">
                              <MdModeEdit
                                className="size-6 hover:text-blue-600 duration-100 dark:hover:text-blue-400"
                                onClick={() => {
                                  setEditingCommentId(comment?._id);
                                  setEditedCommentText(comment?.message);
                                }}
                              />
                            </p>
                            <p>
                              <IoTrashSharp
                                className="size-6 hover:text-red-600 duration-100 cursor-pointer dark:hover:text-red-400"
                                onClick={() => deleteAComment(comment?._id)}
                              />
                            </p>
                          </>
                        )}
                      </div>
                    )}
                </div>
                {editingCommentId === comment?._id ? (
                  <Textarea
                    value={editedCommentText}
                    onChange={(e) => setEditedCommentText(e.target.value)}
                    className={`w-full border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 ${
                      commentEditLoading && "animate-pulse"
                    }`}
                  />
                ) : (
                  <p className="p-2 mt-1 bg-gray-200 w-full rounded-md dark:bg-gray-700 dark:text-gray-300">
                    {comment?.message}
                  </p>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="dark:text-gray-300">
            No comments yet. Be the first to comment!
          </p>
        )}
      </div>
    </div>
  );
};

export default SinglePostComments;
