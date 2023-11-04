import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import ConnectionStatus from "./components/ConnectionStatus";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ChatWave",
  description: "Your Next Chat MVP",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ConnectionStatus />
        <main>{children}</main>
      </body>
    </html>
  );
}
