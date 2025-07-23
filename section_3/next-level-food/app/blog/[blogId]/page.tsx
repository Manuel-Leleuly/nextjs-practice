import { PageParams } from "@/app/models/models";

interface Props extends PageParams<{ blogId: string }> {}

export default async function BlogPostPage({ params }: Props) {
  const { blogId } = await params;

  return (
    <main>
      <h1>Blog Post</h1>
      <p>{blogId}</p>
    </main>
  );
}
