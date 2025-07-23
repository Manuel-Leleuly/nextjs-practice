import { PageLayout } from "@/models/models";

export default function NewsDetailLayout({
  children,
  modal,
}: PageLayout<["modal", "children"]>) {
  return (
    <>
      {modal}
      {children}
    </>
  );
}
