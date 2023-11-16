"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { store } from "../store";
import { Provider } from "react-redux";
import Alert from "../global/alert/Alert";
import "./globals.css";
import ConnectionStatus from "./components/ConnectionStatus";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "ChatWave",
//   description: "Your Next Chat MVP",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`relative ${inter.className}`}>
        <Provider store={store}>
          <Alert />
          <ConnectionStatus />
          <main>{children}</main>
        </Provider>
      </body>
    </html>
  );
}
