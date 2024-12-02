"use client";
import { useUserProvider } from "@/src/context/user.provider";
import { logoutUser } from "@/src/services/auth.mutate.service";
import { protectedRoutes } from "@/src/utils/protectedRoutes";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { Avatar } from "@nextui-org/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import envConfig from "@/src/config/envConfig";

const NavbarDropdown = ({ profilePic }: { profilePic: string | undefined }) => {
  const { user, setIsLoading } = useUserProvider();
  const router = useRouter();
  const dashboardLink =
    user?.role === "ADMIN" ? "/admin/dashboard" : "/user/dashboard";
  const pathname = usePathname();

  const handleLogout = () => {
    if (protectedRoutes.some((route) => pathname.match(route)))
      router.push("/");
    logoutUser();
    setIsLoading(true);
  };

  return (
    <div className="flex items-center gap-4">
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Avatar
            isBordered
            as="button"
            className="transition-transform"
            // src={profilePic || user?.profilePicture || envConfig?.noProfilePic}
            src={profilePic || envConfig?.noProfilePic}
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions" variant="flat">
          <DropdownItem key="profile-info" className="h-14 gap-2">
            <p className="font-semibold">Signed in as</p>
            <p className="font-semibold">{user?.email}</p>
          </DropdownItem>
          <DropdownItem key="my-profile" className="p-0">
            <Link href={"/profile"} className="">
              <button className="w-full flex justify-start p-2">
                My Profile
              </button>
            </Link>
          </DropdownItem>
          <DropdownItem key="dashboard" className="p-0">
            <Link href={dashboardLink} className="">
              <button className="w-full flex justify-start p-2">
                Dashboard
              </button>
            </Link>
          </DropdownItem>
          <DropdownItem key="logout" color="danger" className="p-0">
            <button className=" w-full p-2" onClick={handleLogout}>
              <p className="flex">Log Out</p>
            </button>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default NavbarDropdown;
