import { Metadata } from "next";
import "../globals.css";
import { ProgressAppProvider } from "./providers";

export const metadata: Metadata = {
  title: "Next.js Page Routing & Rendering",
  description: "Learn how to route to different pages.",
};

// export default function MarketingLayout({ children }: PageLayout) {
//   return (
//     <main>
//       <ProgressAppProvider>{children}</ProgressAppProvider>
//     </main>
//   );
// }

export default function MarketingLayout({
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
