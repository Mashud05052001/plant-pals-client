import DashboardLink from "@/src/components/shared/DashboardLink";
import { ReactNode } from "react";

type TProps = { children: ReactNode };

const Layout = ({ children }: TProps) => {
  return (
    <div>
      <div className="w-fit  space-x-6 ml-10 mb-10">
        <DashboardLink href={"/admin/dashboard"}>Dashboard</DashboardLink>
        <DashboardLink href={"/admin/dashboard/manage-category"}>
          Category
        </DashboardLink>
        <DashboardLink href={"/admin/dashboard/manage-users"}>
          Users
        </DashboardLink>
        <DashboardLink href={"/admin/dashboard/manage-posts"}>
          Posts
        </DashboardLink>
        <DashboardLink href={"/admin/dashboard/payments"}>
          Payments
        </DashboardLink>
      </div>
      <div className="mx-2 xl:mx-0">{children}</div>
    </div>
  );
};

export default Layout;
