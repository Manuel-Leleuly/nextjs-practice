import { Header } from "@/components/header";
import { Metadata } from "next";
import "./globals.css";
import { ProgressAppProvider } from "./providers";

export const metadata: Metadata = {
  title: "Next.js Caching",
  description: "Learn how Next.js caching works",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ProgressAppProvider>
          <Header />
          <main>{children}</main>
        </ProgressAppProvider>
      </body>
    </html>
  );
}
