import type { Metadata } from "next";

import NewsList from "@/components/NewsList";
import PageHero from "@/components/PageHero";
import { news } from "@/data/news";

export const metadata: Metadata = { title: "新着情報" };

export default function NewsIndexPage() {
  return (
    <article className="l-content">
      <PageHero src="/assets/img/news/img_kv.jpg" />
      <div className="l-main p-company">
        <section className="p-section js-anime">
          <div className="p-section__inner c-inner">
            <h1 className="p-section__title">
              <em>NEWS</em>
              <span>新着情報</span>
            </h1>
            <div className="p-section__content">
              <div className="p-news__archive">
                <NewsList items={news} />
                <div className="wp-pagenavi" role="navigation">
                  <span aria-current="page" className="current">
                    1
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </article>
  );
}
