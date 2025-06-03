'use client';

import { ChakraProvider } from "@chakra-ui/react";
import React from "react";

// TODO: Import and apply custom theme if available. 
// For example, if you create a theme file at 'src/theme/index.ts' or similar:
// import theme from "@/theme"; 

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    // <ChakraProvider theme={theme}> // Uncomment this line if you have a custom theme
    <ChakraProvider> {/* Using default Chakra theme for now */}
      {children}
    </ChakraProvider>
  );
}
