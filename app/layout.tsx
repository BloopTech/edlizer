import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
  title: "EDLIZER BEAUTY | Beauty On Your Terms — Ghana's Premier Beauty Outlet",
  description:
    "We empower you to express yourself freely and be whoever you want to be. Unleash your inner beauty with 100% genuine cosmetics and clinical skincare.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased scroll-smooth">
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=boska@400,500,700,900,400i,700i&f[]=satoshi@300,400,500,700,900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-[#ffffff] text-[#201c17]">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
