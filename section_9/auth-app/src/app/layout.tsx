import type { Metadata } from "next";
import "./globals.css";
import { ProgressAppProvider } from "./providers";

export const metadata: Metadata = {
  title: "Next Auth",
  description: "Next.js Authentication",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ProgressAppProvider>{children}</ProgressAppProvider>
      </body>
    </html>
  );
}
