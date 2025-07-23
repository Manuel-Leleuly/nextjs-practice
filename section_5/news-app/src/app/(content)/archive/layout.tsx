import { PageLayout } from "@/models/models";

export default function ArchiveLayout({
  archive,
  latest,
}: PageLayout<["archive", "latest", "children"]>) {
  return (
    <div>
      <h1>News Archive</h1>
      <section id="archive-filter">{archive}</section>
      <section id="archive-latest">{latest}</section>
    </div>
  );
}
