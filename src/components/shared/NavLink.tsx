"use client";
import { TChildrenProps } from "@/src/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MouseEventHandler } from "react";

type TProps = {
  href: string;
  onClick?: MouseEventHandler<HTMLAnchorElement> | undefined;
} & TChildrenProps;

const NavLink = ({ children, href, className, onClick }: TProps) => {
  const pathname = usePathname();

  const isActive = href === "/" ? pathname === href : pathname.startsWith(href);

  return (
    <Link
      className={`font-semibold ${
        isActive
          ? "active text-common-600 dark:text-common-500"
          : "text-black dark:text-white"
      } ${className}`}
      href={href}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

export default NavLink;
