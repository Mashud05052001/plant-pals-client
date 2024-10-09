"use client";
import { useDeletePost } from "@/src/hooks/post.mutate.hook";
import { TCategory, TPost, TUser } from "@/src/types";
import {
  Chip,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
  User,
} from "@nextui-org/react";
import Link from "next/link";
import { useCallback, useState } from "react";
import { FaEye } from "react-icons/fa";
import { IoTrashSharp } from "react-icons/io5";
import { MdModeEdit } from "react-icons/md";

const columns = [
  { name: "TITLE", uid: "title" },
  { name: "CATEGORY", uid: "category" },
  { name: "STATUS", uid: "status" },
  { name: "ACTIONS", uid: "actions" },
];

type ColumnKey = keyof TPost | "actions" | "status";

const UserDashboardPosts = ({ userData }: { userData: TUser }) => {
  const [xp, setXp] = useState(false);
  const posts = userData?.myPosts as TPost[];
  const [deletedPostId, setDeletedPostId] = useState("");

  const { mutate: handleDeletePost, isLoading: isDeleteLoading } =
    useDeletePost();

  const handleDelete = (postId: string, postTitle: string) => {
    const confirm = window.confirm(`Are you sure to delete ${postTitle} post?`);
    if (confirm) {
      handleDeletePost(postId);
      setDeletedPostId(postId);
    }
  };

  const renderCell = useCallback(
    (post: TPost, columnKey: ColumnKey) => {
      switch (columnKey) {
        case "title":
          return (
            <User
              avatarProps={{
                radius: "lg",
                src: post.images?.[0],
              }}
              name={<strong className="ml-2">{post?.title}</strong>}
            />
          );
        case "category":
          return (
            <div className="flex flex-col">
              <p className="font-medium text-sm capitalize">
                {(post?.category as TCategory)?.name}
              </p>
            </div>
          );
        case "status":
          return (
            <Chip
              className="capitalize"
              color={post?.isVerified ? "success" : "warning"}
              size="sm"
              variant="flat"
            >
              {post?.isVerified ? "Verified" : "Not-Verified"}
            </Chip>
          );
        case "actions":
          return xp && post?._id === deletedPostId ? (
            <div className="flex justify-center w-full">
              <Spinner size="sm" />
            </div>
          ) : (
            <div className="relative flex items-center gap-4 w-fit mx-auto">
              <Link href={`/posts/${post?._id}`}>
                <Tooltip content="Details" closeDelay={50}>
                  <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                    <FaEye />
                  </span>
                </Tooltip>
              </Link>
              <Link
                href={`/posts/update-post/${post?._id}?redirect=/user/dashboard`}
              >
                <Tooltip content="Edit post" closeDelay={50}>
                  <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                    <MdModeEdit />
                  </span>
                </Tooltip>
              </Link>
              <Tooltip color="danger" content="Delete post" closeDelay={50}>
                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                  <IoTrashSharp
                    onClick={() => handleDelete(post._id, post.title)}
                  />
                </span>
              </Tooltip>
            </div>
          );
        default:
          return null;
      }
    },
    [isDeleteLoading, deletedPostId, xp]
  );

  return (
    <Table aria-label="Post table">
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={posts}>
        {(post) => (
          <TableRow key={post?._id}>
            {(columnKey) => (
              <TableCell>{renderCell(post, columnKey as ColumnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default UserDashboardPosts;