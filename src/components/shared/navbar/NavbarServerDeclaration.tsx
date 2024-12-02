"use server";

import { getCurrentUserFromDB } from "@/src/services/auth.mutate.service";
import { Navbar } from "./Navbar";

const NavbarServerDeclaration = async () => {
  const userData = (await getCurrentUserFromDB()) || null;

  return <Navbar userInfo={userData?.data} />;
};

export default NavbarServerDeclaration;
