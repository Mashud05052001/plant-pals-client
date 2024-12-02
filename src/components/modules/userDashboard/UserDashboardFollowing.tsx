"use client";
import { useFollowUser } from "@/src/hooks/user.mutate.hook";
import { TUser } from "@/src/types";
import {
  Button,
  Chip,
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
import { useCallback } from "react";
import { IoTrashSharp } from "react-icons/io5";

const columns = [
  { name: "NAME", uid: "name" },
  { name: "EMAIL", uid: "email" },
  { name: "IS VERIFIED", uid: "verified" },
  { name: "ACTIONS", uid: "actions" },
];

type ColumnKey = keyof TUser | "actions" | "verified";

const UserFollowing = ({ userData }: { userData: TUser }) => {
  const following = userData?.following as TUser[];
  const { mutate: handleFollowingUser, isLoading: isFollowingLoading } =
    useFollowUser();
  const handleUnfollow = (userId: string, userName: string) => {
    const confirm = window.confirm(
      `Are you sure you want to unfollow ${userName}?`
    );
    if (confirm) {
      handleFollowingUser(userId);
    }
  };

  const renderCell = useCallback(
    (followedUser: TUser, columnKey: ColumnKey) => {
      switch (columnKey) {
        case "name":
          return (
            <Link href={`/users/${followedUser?._id}`}>
              <div className="hover:bg-gray-100 duration-150 rounded-md">
                <User
                  avatarProps={{
                    radius: "lg",
                    src: followedUser?.profilePicture,
                  }}
                  name={<strong className="ml-2">{followedUser?.name}</strong>}
                />
              </div>
            </Link>
          );
        case "email":
          return <p className="ml-2 text-sm">{followedUser?.email}</p>;
        case "verified":
          return (
            <Chip
              className="capitalize"
              color={followedUser?.isVerified ? "success" : "warning"}
              size="sm"
              variant="flat"
            >
              {followedUser?.isVerified ? "Verified" : "Not-Verified"}
            </Chip>
          );
        case "actions":
          return (
            <div className="relative flex items-center gap-4 w-fit mx-auto">
              <Tooltip color="danger" content="Unfollow user" closeDelay={50}>
                <Button
                  size="sm"
                  className="bg-gray-200 px-3 py-1 rounded-lg font-semibold cursor-pointer text-xs h-7"
                  isLoading={isFollowingLoading}
                  onClick={() =>
                    handleUnfollow(followedUser?._id, followedUser?.name)
                  }
                >
                  <IoTrashSharp className="text-lg text-danger cursor-pointer active:opacity-50" />
                </Button>
              </Tooltip>
            </div>
          );
        default:
          return null;
      }
    },
    []
  );

  return (
    <Table aria-label="Following users table">
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
          >
            {column?.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={following}>
        {(followedUser) => (
          <TableRow key={followedUser?._id}>
            {(columnKey) => (
              <TableCell>
                {renderCell(followedUser, columnKey as ColumnKey)}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default UserFollowing;
