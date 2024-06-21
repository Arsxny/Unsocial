import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { HeightProvider } from "./elements/context/HeightContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Social App",
  description: "The new Social Network",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
        <body className={inter.className}>
          <HeightProvider>
            {children}
          </HeightProvider>
          </body>
    </html>
  );
}
