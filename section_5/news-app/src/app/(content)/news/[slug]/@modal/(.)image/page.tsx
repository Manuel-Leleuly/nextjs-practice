import { ModalBackdrop } from "@/components/modal-backdrop";
import { PageParams } from "@/models/models";
import { NewsUtils } from "@/utils/newsUtils";
import { notFound } from "next/navigation";
import { use } from "react";

type Props = PageParams<{ slug: string }>;

export default async function InterceptedImagePage({ params }: Props) {
  const { slug: newsItemSlug } = use(params);

  const newsItem = await NewsUtils.getNewsItem(newsItemSlug);

  if (!newsItem) notFound();

  return (
    <>
      {/* TODO: fix routing error */}
      <ModalBackdrop />
      <dialog className="modal" open>
        <div className="fullscreen-image">
          <img src={`/images/news/${newsItem.image}`} alt={newsItem.title} />
        </div>
      </dialog>
    </>
  );
}
