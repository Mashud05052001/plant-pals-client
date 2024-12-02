"use client";
import { TUser } from "@/src/types";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Chip,
  User,
} from "@nextui-org/react";
import Link from "next/link";
import { useCallback } from "react";

const columns = [
  { name: "NAME", uid: "name" },
  { name: "EMAIL", uid: "email" },
  { name: "IS VERIFIED", uid: "verified" },
];

type ColumnKey = keyof TUser | "verified";

const UserDashboardFollowers = ({ userData }: { userData: TUser }) => {
  const followers = userData?.followers as TUser[];

  const renderCell = useCallback((follower: TUser, columnKey: ColumnKey) => {
    switch (columnKey) {
      case "name":
        return (
          <Link href={`/users/${follower?._id}`}>
            <div className="hover:bg-gray-100 duration-150 rounded-md">
              <User
                avatarProps={{
                  radius: "lg",
                  src: follower?.profilePicture,
                }}
                name={<strong className="ml-2">{follower?.name}</strong>}
              />
            </div>
          </Link>
        );
      case "email":
        return <p className="ml-2 text-sm">{follower?.email}</p>;
      case "verified":
        return (
          <Chip
            className="capitalize"
            color={follower?.isVerified ? "success" : "warning"}
            size="sm"
            variant="flat"
          >
            {follower?.isVerified ? "Verified" : "Not-Verified"}
          </Chip>
        );
      default:
        return null;
    }
  }, []);

  return (
    <Table aria-label="Followers table">
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "verified" ? "center" : "start"}
          >
            {column?.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={followers}>
        {(follower) => (
          <TableRow key={follower?._id}>
            {(columnKey) => (
              <TableCell>
                {renderCell(follower, columnKey as ColumnKey)}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default UserDashboardFollowers;
