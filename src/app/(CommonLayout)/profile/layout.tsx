import { ReactNode } from "react";

type TProps = {
  children: ReactNode;
};

export default function Layout({ children }: TProps) {
  return <div>{children}</div>;
}
