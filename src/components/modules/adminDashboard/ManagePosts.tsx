// "use client";
// import { useDeletePost } from "@/src/hooks/post.mutate.hook";
// import { TCategory, TPost, TUser } from "@/src/types";
// import {
//   Button,
//   Chip,
//   Spinner,
//   Table,
//   TableBody,
//   TableCell,
//   TableColumn,
//   TableHeader,
//   TableRow,
//   Tooltip,
//   User,
// } from "@nextui-org/react";
// import Link from "next/link";
// import { useCallback, useEffect, useState } from "react";
// import { FaEye, FaTrash } from "react-icons/fa";
// import { MdModeEdit } from "react-icons/md";

// const columns = [
//   { name: "USER INFO", uid: "user" },
//   { name: "POST INFO", uid: "title" },
//   { name: "CATEGORY", uid: "category" },
//   { name: <p className="text-center">UPVOTE</p>, uid: "upvote" },
//   { name: <p className="text-center">DOWNVOTE</p>, uid: "downvote" },
//   { name: "IS PREMIUM", uid: "isPremium" },
//   { name: "POST DATE", uid: "postDate" },
//   { name: "ACTIONS", uid: "actions" },
// ];

// type ColumnKey =
//   | keyof TPost
//   | "user"
//   | "actions"
//   | "postDate"
//   | "upvote"
//   | "downvote"
//   | "isPremium";

// const ManagePosts = ({ allPosts }: { allPosts: TPost[] }) => {
//   const [deletedPostId, setDeletedPostId] = useState("");

//   const { mutate: handleDeletePost, isLoading, isSuccess } = useDeletePost();

//   const handleDelete = (postId: string, postTitle: string) => {
//     const confirm = window.confirm(`Are you sure to delete ${postTitle} post?`);
//     if (confirm) {
//       setDeletedPostId(postId);
//       handleDeletePost(postId);
//     }
//   };

//   useEffect(() => {
//     if (isSuccess) {
//       setDeletedPostId("");
//     }

//   }, [isSuccess, isLoading]);

//   const renderCell = useCallback(
//     (post: TPost, columnKey: ColumnKey) => {
//       switch (columnKey) {
//         case "user":
//           return (
//             <Link href={`/users/${(post?.user as TUser)?._id}`}>
//               <div className="hover:bg-gray-100 duration-150 rounded-md">
//                 <User
//                   avatarProps={{
//                     radius: "lg",
//                     src: (post?.user as TUser)?.profilePicture,
//                   }}
//                   name={<strong>{(post?.user as TUser)?.name}</strong>}
//                   description={(post?.user as TUser)?.email}
//                 />
//               </div>
//             </Link>
//           );
//         case "title":
//           return (
//             <User
//               avatarProps={{
//                 radius: "lg",
//                 src: post.images?.[0],
//               }}
//               name={<strong className="ml-2">{post.title}</strong>}
//             />
//           );
//         case "category":
//           return (
//             <div className="flex flex-col">
//               <p className="font-medium text-sm capitalize">
//                 {(post.category as TCategory)?.name}
//               </p>
//             </div>
//           );
//         case "upvote":
//           return (
//             <strong className="text-green-600 text-center w-full flex justify-center">
//               {post?.upvote}
//             </strong>
//           );
//         case "downvote":
//           return (
//             <strong className="text-red-600 text-center w-full flex justify-center">
//               {post?.downvote}
//             </strong>
//           );
//         case "isPremium":
//           return (
//             <Chip
//               className="capitalize"
//               color={post.isPremium ? "success" : "default"}
//               size="sm"
//               variant="flat"
//             >
//               {post.isPremium ? (
//                 <p className=" px-1">Premium</p>
//               ) : (
//                 <p className=" px-1">Normal</p>
//               )}
//             </Chip>
//           );
//         case "postDate":
//           return (
//             <p>
//               {new Date(post.createdAt).toLocaleDateString("en-US", {
//                 year: "numeric",
//                 month: "short",
//                 day: "numeric",
//               })}
//             </p>
//           );
//         case "actions":
//           return deletedPostId === post._id ? (
//             <div className="flex justify-center w-full">
//               <Spinner size="sm" />
//             </div>
//           ) : (
//             <div className="relative flex items-center gap-4 w-fit mx-auto">
//               <Link href={`/posts/${post._id}`}>
//                 <Tooltip content="Details" closeDelay={50}>
//                   <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
//                     <FaEye />
//                   </span>
//                 </Tooltip>
//               </Link>
//               {/* Replace with actual delete logic */}
//               <Tooltip color="danger" content="Delete" closeDelay={50}>
//                 <span className="text-lg text-danger cursor-pointer active:opacity-50">
//                   <FaTrash onClick={() => handleDelete(post._id, post.title)} />
//                 </span>
//               </Tooltip>
//             </div>
//           );
//         default:
//           return null;
//       }
//     },
//     [deletedPostId]
//   );

//   return (
//     <Table aria-label="Admin Post Table">
//       <TableHeader columns={columns}>
//         {(column) => (
//           <TableColumn
//             key={column.uid}
//             align={column.uid === "actions" ? "center" : "start"}
//           >
//             {column.name}
//           </TableColumn>
//         )}
//       </TableHeader>
//       <TableBody items={allPosts}>
//         {(post) => (
//           <TableRow key={post._id}>
//             {(columnKey) => (
//               <TableCell>{renderCell(post, columnKey as ColumnKey)}</TableCell>
//             )}
//           </TableRow>
//         )}
//       </TableBody>
//     </Table>
//   );
// };

// export default ManagePosts;

"use client";
import { useUserProvider } from "@/src/context/user.provider";
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
import { useCallback, useEffect, useState } from "react";
import { FaEye, FaTrash } from "react-icons/fa";
import { toast } from "sonner"; // Import toast

const columns = [
  { name: "USER INFO", uid: "user" },
  { name: "POST INFO", uid: "title" },
  { name: "CATEGORY", uid: "category" },
  { name: <p className="text-center">UPVOTE</p>, uid: "upvote" },
  { name: <p className="text-center">DOWNVOTE</p>, uid: "downvote" },
  { name: "IS PREMIUM", uid: "isPremium" },
  { name: "POST DATE", uid: "postDate" },
  { name: "ACTIONS", uid: "actions" },
];

type ColumnKey =
  | keyof TPost
  | "user"
  | "actions"
  | "postDate"
  | "upvote"
  | "downvote"
  | "isPremium";

const ManagePosts = ({ allPosts }: { allPosts: TPost[] }) => {
  const [loadingId, setLoadingId] = useState<number | string>("");
  const [deletedPostId, setDeletedPostId] = useState("");
  const { user } = useUserProvider();

  const {
    mutate: handleDeletePost,
    isSuccess,
    isError,
    error,
  } = useDeletePost();

  const handleDelete = (postId: string, postTitle: string) => {
    const confirm = window.confirm(`Are you sure to delete ${postTitle} post?`);
    if (confirm) {
      setDeletedPostId(postId);
      const loading = toast.loading(`Deleting ${postTitle}...`);
      setLoadingId(loading);
      handleDeletePost(postId);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Post deleted successfully!", { id: loadingId });
      setLoadingId("");
      setDeletedPostId("");
    }
    if (isError) {
      toast.error(`Failed to delete post. ${error?.message}`, {
        id: loadingId,
      });
      setLoadingId("");
      setDeletedPostId("");
    }
  }, [isSuccess, isError]);

  const renderCell = useCallback(
    (post: TPost, columnKey: ColumnKey) => {
      switch (columnKey) {
        case "user":
          /*
          user?.email === createdUserData?.email
            ? `/profile`
            : `/users/${createdUserData?._id}`;
          */
          return (
            // <Link href={`/users/${(post?.user as TUser)?._id}`}>
            <Link
              href={
                user?.email === (post?.user as TUser)?.email
                  ? `/profile`
                  : `/users/${(post?.user as TUser)?._id}`
              }
            >
              <div className="hover:bg-gray-100 duration-150 rounded-md">
                <User
                  avatarProps={{
                    radius: "lg",
                    src: (post?.user as TUser)?.profilePicture,
                  }}
                  name={<strong>{(post?.user as TUser)?.name}</strong>}
                  description={(post?.user as TUser)?.email}
                />
              </div>
            </Link>
          );
        case "title":
          return (
            <User
              avatarProps={{
                radius: "lg",
                src: post.images?.[0],
              }}
              name={<strong className="ml-2">{post.title}</strong>}
            />
          );
        case "category":
          return (
            <div className="flex flex-col">
              <p className="font-medium text-sm capitalize">
                {(post.category as TCategory)?.name}
              </p>
            </div>
          );
        case "upvote":
          return (
            <strong className="text-green-600 text-center w-full flex justify-center">
              {post?.upvote}
            </strong>
          );
        case "downvote":
          return (
            <strong className="text-red-600 text-center w-full flex justify-center">
              {post?.downvote}
            </strong>
          );
        case "isPremium":
          return (
            <Chip
              className="capitalize"
              color={post.isPremium ? "success" : "default"}
              size="sm"
              variant="flat"
            >
              {post.isPremium ? (
                <p className=" px-1">Premium</p>
              ) : (
                <p className=" px-1">Normal</p>
              )}
            </Chip>
          );
        case "postDate":
          return (
            <p>
              {new Date(post.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </p>
          );
        case "actions":
          return deletedPostId === post._id ? (
            <div className="flex justify-center w-full">
              <Spinner size="sm" />
            </div>
          ) : (
            <div className="relative flex items-center gap-4 w-fit mx-auto">
              <Link href={`/posts/${post._id}`}>
                <Tooltip content="Details" closeDelay={50}>
                  <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                    <FaEye />
                  </span>
                </Tooltip>
              </Link>
              <Tooltip color="danger" content="Delete" closeDelay={50}>
                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                  <FaTrash onClick={() => handleDelete(post._id, post.title)} />
                </span>
              </Tooltip>
            </div>
          );
        default:
          return null;
      }
    },
    [deletedPostId]
  );

  return (
    <Table aria-label="Admin Post Table">
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
      <TableBody items={allPosts}>
        {(post) => (
          <TableRow key={post._id}>
            {(columnKey) => (
              <TableCell>{renderCell(post, columnKey as ColumnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default ManagePosts;
