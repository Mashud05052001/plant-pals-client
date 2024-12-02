"use client";
import { useUserProvider } from "@/src/context/user.provider";
import { TPayment, TUser } from "@/src/types";
import {
  Chip,
  User as NextUser,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import Link from "next/link";
import { useCallback } from "react";

const columns = [
  { name: "USER INFO", uid: "user" },
  { name: "TRANSACTION ID", uid: "transactionId" },
  { name: "PHONE NUMBER", uid: "userPhone" },
  { name: "AMOUNT", uid: "amount" },
  { name: "PAID STATUS", uid: "isPaid" },
];

type ColumnKey =
  | keyof TPayment
  | "user"
  | "actions"
  | "transactionId"
  | "userPhone"
  | "isPaid"
  | "amount";

const ManagePayments = ({ allPayments }: { allPayments: TPayment[] }) => {
  const { user } = useUserProvider();

  const renderCell = useCallback(
    (payment: TPayment, columnKey: ColumnKey) => {
      switch (columnKey) {
        case "user":
          return (
            <Link
              href={
                user?.email === (payment?.user as TUser)?.email
                  ? `/profile`
                  : `/users/${(payment?.user as TUser)?._id}`
              }
            >
              <div className="hover:bg-gray-100 duration-150 rounded-md">
                <NextUser
                  avatarProps={{
                    radius: "lg",
                    src: (payment?.user as TUser)?.profilePicture,
                  }}
                  name={<strong>{(payment?.user as TUser)?.name}</strong>}
                  description={(payment?.user as TUser)?.email}
                />
              </div>
            </Link>
          );
        case "transactionId":
          return <p>{payment.transactionId}</p>;
        case "userPhone":
          return <p>{payment.userPhone}</p>;
        case "amount":
          return <p>${payment.amount.toFixed(2)}</p>;
        case "isPaid":
          return (
            <Chip
              className="capitalize"
              color={payment.isPaid ? "success" : "default"}
              size="sm"
              variant="flat"
            >
              {payment.isPaid ? (
                <p className=" px-1">Paid</p>
              ) : (
                <p className=" px-1">Not Paid</p>
              )}
            </Chip>
          );
        default:
          return null;
      }
    },
    [user]
  );

  return (
    <Table aria-label="Manage Payments Table">
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.uid}>{column?.name}</TableColumn>}
      </TableHeader>
      <TableBody items={allPayments}>
        {(payment) => (
          <TableRow key={payment._id}>
            {(columnKey) => (
              <TableCell>
                {renderCell(payment, columnKey as ColumnKey)}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default ManagePayments;
