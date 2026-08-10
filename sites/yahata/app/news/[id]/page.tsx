import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import PageHero from "@/components/PageHero";
import { findNews, news } from "@/data/news";

type Params = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return news.map((post) => ({ id: String(post.id) }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const post = findNews(Number((await params).id));
  return { title: post ? post.title : "新着情報" };
}

export default async function NewsDetailPage({ params }: Params) {
  const post = findNews(Number((await params).id));
  if (!post) notFound();

  return (
    <article className="l-content">
      <PageHero src="/assets/img/news/img_kv.jpg" />
      <div className="l-main p-company">
        <section className="p-section js-anime">
          <div className="p-section__inner c-inner">
            <div className="p-section__title">
              <em>NEWS</em>
              <span>新着情報</span>
            </div>
            <div className="p-section__content">
              <div className="p-news__detail">
                <div className="p-news__head">
                  <time dateTime={post.date}>{post.label}</time>
                  <h1>{post.title}</h1>
                </div>
                <div className="p-news__body">
                  <div className="wp-editor" dangerouslySetInnerHTML={{ __html: post.body }} />
                </div>
                <div className="p-news__foot">
                  <Link href="/news" className="c-btn_pl">
                    BACK
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </article>
  );
}
