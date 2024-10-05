import logo from "@/src/assets/plant_pals.png";
import { ThemeSwitch } from "@/src/components/theme-switch";
import { siteConfig } from "@/src/config/site";
import {
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuToggle,
  Navbar as NextUINavbar,
} from "@nextui-org/navbar";
import Image from "next/image";
import NavLink from "./NavLink";

export const Navbar = () => {
  return (
    <NextUINavbar maxWidth="xl" shouldHideOnScroll isBordered>
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
        <div>
          <ul className="hidden md:flex gap-2 sm:gap-4 justify-start ml-4 mt-3">
            {siteConfig.navItems.map((item) => (
              <NavbarItem key={item.href}>
                <NavLink href={item.href} className="px-1 py-1">
                  {item.label}
                </NavLink>
              </NavbarItem>
            ))}
          </ul>
        </div>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden md:flex gap-2">
          <ThemeSwitch />
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="md:hidden basis-1 pl-4" justify="end">
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        <div className="flex flex-col space-y-4 mt-3">
          {siteConfig.navItems.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              className="pl-4 py-1 w-32 hover:bg-common-50 rounded-sm duration-150"
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};
