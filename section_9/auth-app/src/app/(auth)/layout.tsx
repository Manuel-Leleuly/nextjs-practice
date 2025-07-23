import { logout } from "@/actions/auth-actions";
import { PageLayout } from "@/models/models";
import { Metadata } from "next";
import "../globals.css";
import { ProgressAppProvider } from "../providers";

export const metadata: Metadata = {
  title: "Next Auth",
  description: "Next.js Authentication",
};

export default function AuthRootLayout({ children }: PageLayout) {
  return (
    <>
      <ProgressAppProvider>
        <header id="auth-header">
          <p>Welcome back!</p>
          <form action={logout}>
            <button>Logout</button>
          </form>
        </header>
        {children}
      </ProgressAppProvider>
    </>
  );
}
