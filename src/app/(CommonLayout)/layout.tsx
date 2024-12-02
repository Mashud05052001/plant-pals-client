"use server";
import { Navbar } from "@/src/components/shared/navbar/Navbar";
import CommonContainer from "@/src/components/UI/container/CommonContainer";
import { getCurrentUserFromDB } from "@/src/services/auth.mutate.service";
import { ReactNode } from "react";

type TProps = {
  children: ReactNode;
};
export default async function Layout({ children }: TProps) {
  const userData = await getCurrentUserFromDB();
  return (
    <div className="relative flex flex-col min-h-screen  dark:bg-gray-950">
      <Navbar userInfo={userData?.data || null} />
      {/* <NavbarServerDeclaration /> */}
      <CommonContainer className="flex-grow mt-8 pb-8">
        {children}
      </CommonContainer>
    </div>
  );
}
