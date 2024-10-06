import Footer from "@/src/components/shared/Footer";
import { Navbar } from "@/src/components/shared/Navbar";
import CommonContainer from "@/src/components/UI/container/CommonContainer";
import { ReactNode } from "react";

type TProps = {
  children: ReactNode;
};
export default function Layout({ children }: TProps) {
  return (
    <div className="relative flex flex-col h-screen">
      <Navbar />
      <CommonContainer className="flex-grow mt-8 pb-8">
        {children}
      </CommonContainer>
    </div>
  );
}
