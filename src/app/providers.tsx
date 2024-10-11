"use client";

import { NextUIProvider } from "@nextui-org/system";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import { useRouter } from "next/navigation";
import * as React from "react";
import { Toaster } from "sonner";
import UserProvider from "../context/user.provider";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();
  const queryClient = new QueryClient();

  return (
    <UserProvider>
      <QueryClientProvider client={queryClient}>
        <NextUIProvider navigate={router.push}>
          <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
          <Toaster position="bottom-right" duration={2000} />
        </NextUIProvider>
      </QueryClientProvider>
    </UserProvider>
  );
}
