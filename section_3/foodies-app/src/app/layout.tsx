import { ProgressAppProvider } from "@/app/providers";
import { Metadata } from "next";
import { MainHeader } from "../components/main-header/main-header";
import "./globals.css";

export const metadata: Metadata = {
  title: "NextLevel Food",
  description: "Delicious meals, shared by a food-loving community.",
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
          <MainHeader />
          {children}
        </ProgressAppProvider>
      </body>
    </html>
  );
}
