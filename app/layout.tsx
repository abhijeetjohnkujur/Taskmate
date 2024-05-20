import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { siteconfig } from "@/config/site";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: siteconfig.name,
    template: `%s | ${siteconfig.name}`,
  },
  description: siteconfig.description,
  icons :[
    {
      url: "/logo.png",
      type: "/logo.png"
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
