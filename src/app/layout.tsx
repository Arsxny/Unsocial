import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { HeightProvider } from "./elements/context/HeightContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Unsocial",
  description: "Connecting People, Cultivating Truth.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
        <body className={inter.className}>
            {children}
          </body>
    </html>
  );
}
