"use client";
import adminLogo from "@/src/assets/verified.png";
import TableSkeleton from "@/src/components/shekeleton/TableSkeleton";
import envConfig from "@/src/config/envConfig";
import { useUserProvider } from "@/src/context/user.provider";
import {
  useChangeUserRole,
  useGetAllUsersForAdmin,
} from "@/src/hooks/user.mutate.hook"; // Create a hook for changing user roles
import { TAllUser } from "@/src/types";
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
import Image from "next/image";
import Link from "next/link";
import { useCallback } from "react";
import { FaLongArrowAltDown, FaLongArrowAltUp } from "react-icons/fa";

const columns = [
  { name: "NAME", uid: "name" },
  { name: "EMAIL", uid: "email" },
  { name: "ROLE", uid: "role" },
  { name: "IS VERIFIED", uid: "verified" },
  { name: "ACTIONS", uid: "actions" },
];

type ColumnKey = keyof TAllUser | "actions" | "role" | "verified";

const ManageUsers = () => {
  const { data: allUsersData, isLoading: alluserdataLoading } =
    useGetAllUsersForAdmin();
  const { user: currentloginUser } = useUserProvider();

  const {
    mutate: handleChangeUserRole,
    isLoading: isChangingRoleLoading,
    isSuccess,
  } = useChangeUserRole();
  const superAdminEmail = envConfig.superAdminEmail;

  const handleChangeRole = (userId: string, name: string) => {
    const confirm = window.confirm(
      `Are you sure to change ${name}'s person user role?`
    );
    if (confirm) {
      handleChangeUserRole(userId);
    }
  };

  const renderCell = useCallback(
    (user: TAllUser, columnKey: ColumnKey) => {
      switch (columnKey) {
        case "name":
          return (
            <Link href={`/users/${user._id}`}>
              <div className="hover:bg-gray-100 duration-150 rounded-md">
                <User
                  avatarProps={{
                    radius: "lg",
                    src: user.profilePicture,
                  }}
                  name={<strong className="ml-2">{user.name}</strong>}
                />
              </div>
            </Link>
          );
        case "email":
          return <p className="ml-2 text-sm">{user.email}</p>;
        case "role":
          return (
            <Chip
              className="capitalize"
              color={user.role === "ADMIN" ? "success" : "warning"}
              size="sm"
              variant="flat"
            >
              {user.role}
            </Chip>
          );
        case "verified":
          return (
            <Chip
              className="capitalize"
              color={user.isVerified ? "success" : "warning"}
              size="sm"
              variant="flat"
            >
              {user.isVerified ? "Verified" : "Not-Verified"}
            </Chip>
          );
        case "actions":
          // First check if the user is the super admin
          if (user?.email === superAdminEmail) {
            return (
              <div className="flex justify-center">
                <Tooltip
                  color="success"
                  content={`Super Admin`}
                  className="text-white"
                  closeDelay={50}
                >
                  <Image
                    src={adminLogo}
                    alt="Admin Logo"
                    width={28}
                    height={28}
                  />
                </Tooltip>
              </div>
            );
          }
          // Then check if the current user is trying to modify their own role
          if (user?.email === currentloginUser?.email) {
            return (
              <div className="flex justify-center">
                <Tooltip
                  color="danger"
                  content={`Cannot modify your own role`}
                  className="text-white"
                  closeDelay={50}
                >
                  <Image
                    src={adminLogo}
                    alt="Admin Logo"
                    width={28}
                    height={28}
                  />
                </Tooltip>
              </div>
            );
          } else {
            return (
              <div className="relative flex items-center gap-2 w-fit mx-auto">
                <Tooltip
                  color="danger"
                  content={`Change to ${
                    user.role === "ADMIN" ? "User" : "Admin"
                  }`}
                  className="text-white"
                  closeDelay={50}
                >
                  <Button
                    size="sm"
                    className="bg-gray-200 px-3 py-1 rounded-lg font-semibold cursor-pointer text-xs h-7"
                    isLoading={isChangingRoleLoading}
                    onClick={() => handleChangeRole(user?._id, user?.name)}
                  >
                    {user?.role === "ADMIN" ? (
                      <div className="flex ">
                        <FaLongArrowAltDown className="size-4" />
                        <p>Demote</p>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <FaLongArrowAltUp className="size-4 " />
                        <p>Promote</p>
                      </div>
                    )}
                  </Button>
                </Tooltip>
              </div>
            );
          }
        default:
          return null;
      }
    },
    [
      handleChangeUserRole,
      isChangingRoleLoading,
      superAdminEmail,
      currentloginUser,
      isSuccess,
    ]
  );
  if (alluserdataLoading) {
    return <TableSkeleton />;
  }
  if (isChangingRoleLoading) return <TableSkeleton loadingTxt="Updating" />;
  return (
    <Table aria-label="Manage users table">
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
      <TableBody items={!alluserdataLoading && allUsersData?.data}>
        {(user) => (
          <TableRow key={user._id}>
            {(columnKey) => (
              <TableCell>{renderCell(user, columnKey as ColumnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default ManageUsers;
