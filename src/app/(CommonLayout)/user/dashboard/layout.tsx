import DashboardLink from "@/src/components/shared/DashboardLink";
import { ReactNode } from "react";
import Loading from "./loading";

type TProps = { children: ReactNode };

export const userDashboardNavlinks = (
  <div className="w-fit  space-x-6 ml-10 mb-10">
    <DashboardLink href={"/user/dashboard"}>Dashboard</DashboardLink>
    <DashboardLink href={"/user/dashboard/posts"}>My Posts</DashboardLink>
    <DashboardLink href={"/user/dashboard/followings"}>
      Followings
    </DashboardLink>
    <DashboardLink href={"/user/dashboard/followers"}>Followers</DashboardLink>
  </div>
);

const Layout = ({ children }: TProps) => {
  return (
    <div>
      {userDashboardNavlinks}
      <div className="mx-2 xl:mx-0">{children}</div>
    </div>
  );
};

export default Layout;
