import { MainHeader } from "@/components/main-header";
import { Metadata } from "next";
import "../globals.css";
import { ProgressAppProvider } from "./providers";

export const metadata: Metadata = {
  title: "Next.js Page Routing & Rendering",
  description: "Learn how to route to different pages.",
};

export default function ContentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ProgressAppProvider>
          <div id="page">
            <MainHeader />
            {children}
          </div>
        </ProgressAppProvider>
      </body>
    </html>
  );
}
