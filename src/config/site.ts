export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Plant Pals",
  description:
    "Plant Pals is a social platform where gardening enthusiasts share experiences, tips, and tricks to grow their passion for plants.",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
  ],
  navMenuItems: [
    {
      label: "Profile",
      href: "/profile",
    },
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
  links: {},
};
