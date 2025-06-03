import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"; // Ensure you have this file or remove if not needed
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CRM Application", // You can customize this
  description: "Customer Relationship Management", // You can customize this
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
