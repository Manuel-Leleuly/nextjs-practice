"use client";

import { PageParams } from "@/models/models";
import { NewsUtils } from "@/utils/newsUtils";
import { notFound, useRouter } from "next/navigation";
import { use } from "react";

type Props = PageParams<{ slug: string }>;

export default function InterceptedImagePage({ params }: Props) {
  const router = useRouter();
  const { slug: newsItemSlug } = use(params);

  const newsItem = NewsUtils.getAllNews().find(
    (newsItem) => newsItem.slug === newsItemSlug
  );

  if (!newsItem) notFound();

  return (
    <>
      <div className="modal-backdrop" onClick={router.back} />
      <dialog className="modal" open>
        <div className="fullscreen-image">
          <img src={`/images/news/${newsItem.image}`} alt={newsItem.title} />
        </div>
      </dialog>
    </>
  );
}
