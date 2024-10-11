import DashboardLink from "@/src/components/shared/DashboardLink";
import { ReactNode } from "react";

type TProps = { children: ReactNode };

const Layout = ({ children }: TProps) => {
  return (
    <div>
      <div className="w-fit  space-x-6 ml-10 mb-10">
        <DashboardLink href={"/user/dashboard"}>Dashboard</DashboardLink>
        <DashboardLink href={"/user/dashboard/posts"}>My Posts</DashboardLink>
        <DashboardLink href={"/user/dashboard/followings"}>
          Followings
        </DashboardLink>
        <DashboardLink href={"/user/dashboard/followers"}>
          Followers
        </DashboardLink>
      </div>
      <div className="mx-2 xl:mx-0">{children}</div>
    </div>
  );
};

export default Layout;
