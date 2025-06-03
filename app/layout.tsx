import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css"; // Assuming globals.css is in the app/ directory or a root CSS import

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "CRM Application",
  description: "A modern Customer Relationship Management platform.",
  // Consider adding viewport and icons for better PWA/mobile experience
  // viewport: 'width=device-width, initial-scale=1',
  // icons: { icon: '/favicon.ico' }, // Example: if you have a favicon
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
