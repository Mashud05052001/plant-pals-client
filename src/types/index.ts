export * from "./auth.types";
export * from "./response.types";

import { ReactNode, SVGProps } from "react";

export type TJwtUser = {
  name: string;
  email: string;
  role: "USER" | "ADMIN";
  iat: number;
  exp: number;
};

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type TChildrenProps = {
  children: ReactNode;
  className?: string;
};
