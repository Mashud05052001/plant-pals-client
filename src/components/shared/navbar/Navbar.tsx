"use client";
import logo from "@/src/assets/plant_pals.png";
import { ThemeSwitch } from "@/src/components/theme-switch";
import { siteConfig } from "@/src/config/site";
import { useUserProvider } from "@/src/context/user.provider";
import { TUser } from "@/src/types";
import {
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuToggle,
  Navbar as NextUINavbar,
} from "@nextui-org/navbar";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { LuLogIn } from "react-icons/lu";
import NavLink from "../NavLink";
import NavbarDropdown from "./NavbarDropdown";

export const Navbar = ({ userInfo }: { userInfo: TUser | null }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useUserProvider();

  const toggleNavbarDropdown = (
    <>
      {user?.role ? (
        <NavbarDropdown profilePic={userInfo?.profilePicture} />
      ) : (
        <Link
          href={"/login"}
          className="p-2 rounded-full duration-100 hover:text-common-600"
        >
          <LuLogIn className="size-6 " />
        </Link>
      )}
    </>
  );

  const userVerified = userInfo?.isVerified || false;
  const navItems = siteConfig?.navItems;
  return (
    <NextUINavbar
      maxWidth="xl"
      shouldHideOnScroll
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <div className=" flex items-center space-x-4">
        <NavbarContent>
          <NavbarBrand as="li" className="gap-3 max-w-fit">
            <NavLink className="flex justify-start items-center" href="/">
              {/* <Logo /> */}
              <Image
                src={logo}
                alt="Website Logo"
                width={40}
                height={40}
                className="mb-3"
              />
              <p className="font-bold -ml-2.5 -mb-1.5">
                <span className="text-3xl text-common-500">lant</span>
                <span className="text-xl pl-0.5 text-common-500">Pals</span>
              </p>
            </NavLink>
          </NavbarBrand>
          {/* NavLinks */}
        </NavbarContent>
        <NavbarContent>
          <div>
            <ul className="hidden md:flex gap-2 sm:gap-4 justify-start ml-4 mt-3">
              {navItems.map((item) => (
                <NavbarItem key={item.href}>
                  <NavLink href={item.href} className="px-1 py-1">
                    {item.label}
                  </NavLink>
                </NavbarItem>
              ))}
              {userVerified && (
                <NavbarItem>
                  <NavLink href="/premium-news-feed" className="px-1 py-1">
                    Premium News
                  </NavLink>
                </NavbarItem>
              )}
            </ul>
          </div>
        </NavbarContent>
      </div>
      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full mt-2"
        justify="end"
      >
        <NavbarItem className="hidden md:flex gap-5">
          <ThemeSwitch />
          {toggleNavbarDropdown}
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="md:hidden basis-1 pl-4 space-x-2" justify="end">
        <ThemeSwitch />
        {toggleNavbarDropdown}
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        <div className="flex flex-col space-y-2 mt-3">
          {navItems?.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              className="pl-4 py-2 rounded-md w-52 hover:bg-common-50  duration-150 dark:hover:bg-gray-700"
              onClick={() => {
                setIsMenuOpen(false);
              }}
            >
              {item.label}
            </NavLink>
          ))}
          {userVerified && (
            <NavLink
              href={"/premium-news-feed"}
              className="pl-4 py-2 rounded-md w-52 hover:bg-common-50  duration-150 dark:hover:bg-gray-700"
              onClick={() => {
                setIsMenuOpen(false);
              }}
            >
              Premium News
            </NavLink>
          )}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};
