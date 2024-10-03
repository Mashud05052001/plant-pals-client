import { ReactNode } from "react";

type TProps = {
  children: ReactNode;
  className?: string;
};

export default function CommonContainer({ children, className = "" }: TProps) {
  return (
    <section className={`${className} container max-w-7xl mx-auto`}>
      {children}
    </section>
  );
}
