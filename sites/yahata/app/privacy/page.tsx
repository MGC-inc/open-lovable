import type { Metadata } from "next";

import PageHero from "@/components/PageHero";
import { privacyBody } from "@/data/privacy";

export const metadata: Metadata = { title: "プライバシーポリシー" };

export default function PrivacyPage() {
  return (
    <article className="l-content">
      <PageHero src="/assets/img/privacy/img_kv.jpg" />
      <div className="l-main p-privacy">
        <section className="p-section js-anime">
          <div className="p-section__inner c-inner">
            <h1 className="p-section__title">
              <em>PRIVACY</em>
              <span>プライバシーポリシー</span>
            </h1>
            <div className="p-section__content" dangerouslySetInnerHTML={{ __html: privacyBody }} />
          </div>
        </section>
      </div>
    </article>
  );
}
