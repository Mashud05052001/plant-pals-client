"use client";
import { TChildrenProps } from "@/src/types";
import Link from "next/link";
import { usePathname } from "next/navigation";

type TProps = {
  href: string;
} & TChildrenProps;

const NavLink = ({ children, href, className }: TProps) => {
  const pathname = usePathname();

  const isActive = href === "/" ? pathname === href : pathname.startsWith(href);

  return (
    <Link
      className={`font-semibold ${
        isActive ? "active text-common-600" : "text-black"
      } ${className}`}
      href={href}
    >
      {children}
    </Link>
  );
};

export default NavLink;
