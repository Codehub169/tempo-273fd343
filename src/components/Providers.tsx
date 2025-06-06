'use client';

import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';

// TODO: Import and apply custom theme if available
// import { theme } from '@/theme'; 

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    // <ChakraProvider theme={theme}>
    <ChakraProvider> {/* Using default theme for now */}
      {children}
    </ChakraProvider>
  );
}
