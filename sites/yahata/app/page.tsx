import Link from "next/link";

import AboutVideo from "@/components/AboutVideo";
import KvSlider from "@/components/KvSlider";
import NewsList from "@/components/NewsList";
import { latestNews } from "@/data/news";

const ABOUT_PARAGRAPHS = [
  "弊社では、高性能の「設備・機械」と「技術力」がかけ合わさってはじめてお客様に高付加価値のサービス製品を提供できると考え、常に最新鋭の設備を配備しております。",
  "一般車検・整備業に加え、トラックの荷台の製造を行っております。この経験と実績で、お客様の要望に応じたトラックの販売・トラック荷台の製造・アフターまで、一貫したサービスの提供ができます。",
  "また、サービス事業本部においては、時代の変遷とともに自動車の安全運転支援システムも高度に進化し続けている中、ヤハタにおいてもユーザー様の「安全・安心」に応えるべく特定整備制度や OBD 検査への対応も進めています。",
  "また、製造事業本部の各過程において（根太・架装・木工・電装・塗装）検査を実施し作業漏れはないか、品質に問題はないか、検証を重ね最終的に検収を行い、見事検査に合格した商品をお届け致しております。ヤハタの情熱がお客様に少しでも伝わるように妥協することなく品質管理を徹底していきます。信頼を得る事は妥協することなく、実績を積み上げる日々の努力、年月のかかるものであり 1 つの仕事を大切に感謝し続ける事をモットーとしています。"
];

const DIVISIONS = [
  {
    href: "/service",
    image: "/assets/img/home/img_service.jpg",
    en: "SERVICE",
    ja: "本社/サービス事業本部",
    text: "独自の高い技術力でお客様の大切な車両の車検・点検・一般整備を行っております。すべての行程の中で常にお客様を意識した取り組みを徹底することで、お客様に満足いただけるように心掛けております。車両の稼働率を下げないよう、スピーディに、正確に、確実に、車両状況に適した整備計画をご提案します。"
  },
  {
    href: "/products",
    image: "/assets/img/home/img_product.jpg",
    en: "PRODUCTS",
    ja: "製造事業本部",
    text: "物流の多様化に伴い、運送会社様ごとのニーズに応えるべく、また物流の最適化に対応できるよう、車両の提案から製造まで一貫したサービスをご提供いたします。お客様の声に細部まで応えたこだわりのボデーを作り上げます。"
  }
];

export default function HomePage() {
  return (
    <article className="l-content">
      <KvSlider />
      <div className="l-main p-home">
        <section className="p-section -line01 js-anime">
          <div className="p-section__inner c-inner">
            <h2 className="p-section__title">
              <em>ABOUT</em>
              <span>ヤハタとは</span>
            </h2>
            <div className="p-section__content">
              <AboutVideo />
              <div className="p-home_about">
                <div className="p-home_about__txt">
                  <h3 className="p-home_about__ttl">ワンストップサービスと品質</h3>
                  {ABOUT_PARAGRAPHS.map((paragraph) => (
                    <p key={paragraph.slice(0, 12)}>{paragraph}</p>
                  ))}
                </div>
                <figure className="p-home_about__img hidden-tb">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/assets/img/home/img_about.png" alt="" />
                </figure>
              </div>
            </div>
          </div>
          <div className="p-section__img">
            <figure className="c-ofi">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/img/home/bg_about.jpg" alt="" className="c-ofi__img" />
            </figure>
          </div>
        </section>

        <section className="p-section -line02 js-anime">
          <div className="p-section__inner c-inner">
            <h2 className="p-section__title">
              <em>DIVISION</em>
              <span>部門</span>
            </h2>
            <div className="p-section__content">
              <div className="c-flex">
                <div className="p-home_division">
                  {DIVISIONS.map((division) => (
                    <section className="p-home_division__block" key={division.href}>
                      <Link href={division.href} className="p-home_division__link">
                        <figure className="p-home_division__img">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={division.image} alt={division.ja} />
                        </figure>
                        <h3 className="p-home_division__ttl">
                          <em>{division.en}</em>
                          <span>{division.ja}</span>
                        </h3>
                        <div className="p-home_division__txt">{division.text}</div>
                      </Link>
                    </section>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="p-section__img">
            <figure className="c-ofi">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/img/home/bg_division.jpg" alt="" className="c-ofi__img" />
            </figure>
          </div>
        </section>

        <section className="p-section -line03 js-anime">
          <div className="p-section__inner c-inner">
            <h2 className="p-section__title">
              <em>NEWS</em>
              <span>新着情報</span>
            </h2>
            <div className="p-section__content">
              <div className="p-home_news">
                <div className="p-home_news__list">
                  <NewsList items={latestNews(3)} />
                </div>
                <div className="p-home_news__btn">
                  <Link href="/news" className="c-btn_pl">
                    READ MORE
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
