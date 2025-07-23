import { Header } from "@/components/header";
import "./globals.css";
import { ProgressAppProvider } from "./providers";

export const metadata = {
  title: "NextPosts",
  description: "Browse and share amazing posts.",
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
