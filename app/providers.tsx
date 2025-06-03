"use client";

import { ChakraProvider } from "@chakra-ui/react";
// Optional: Import your custom Chakra theme if you have one
// import theme from "./theme"; // e.g., src/theme.ts

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    // If using a custom theme, pass it to ChakraProvider: <ChakraProvider theme={theme}>
    <ChakraProvider>
      {children}
    </ChakraProvider>
  );
}
