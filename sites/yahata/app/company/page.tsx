import type { Metadata } from "next";

import MultilineText from "@/components/MultilineText";
import PageHero from "@/components/PageHero";
import { accessOffices } from "@/data/access";
import { companyHistory, companyProfile } from "@/data/company";

export const metadata: Metadata = { title: "会社情報" };

const IDENTITY = [
  "「開発・開拓・改善」の創業理念を基本に",
  "培ってきた技術力とお客様を大切にする心で",
  "お客様からの高い満足と信頼を獲得し",
  "社業の安定成長を達成し、",
  "永く、高く、広く社会に貢献します。"
];

const MESSAGE = [
  "株式会社ヤハタは創業以来、整備事業と製造事業の二本柱で常にお客様に満足して頂ける仕事、お客様に感動して頂ける仕事を心に刻み展開してまいります。",
  "今後、我々を取り巻く環境は益々厳しくかつ変化が大きくなると思いますが、今まで以上にお客様に寄り添いニーズを先取りしたサービスや商品を提供してまいります。",
  "その為にもお客様だけでなく地域、取引先、従業員すべてに対して感謝の気持ちを込めて仕事をする『まちいちばんのあたたかい会社 ヤハタ』を合言葉に地域に根ざした小さくともキラリと光る良い会社を目指してまいる所存です。",
  "今後とも変わらぬご愛顧を賜ります様よろしくお願い申し上げます。"
];

export default function CompanyPage() {
  return (
    <article className="l-content">
      <PageHero src="/assets/img/company/img_kv.jpg" />
      <div className="l-main p-company">
        <section className="p-section js-anime">
          <div className="p-section__inner c-inner">
            <h1 className="p-section__title -hasImage -img_sm">
              <em>COMPANY</em>
              <span>会社情報</span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/img/company/img_ttl.png" alt="" />
            </h1>
            <div className="p-section__content">
              <div className="p-company__block">
                <section className="p-company_identity js-anime">
                  <div className="p-company_identity__ttl">
                    <h2 className="c-ttl_sup u-mgb0">
                      <em>Corporate Identity</em>
                      <span>経営理念</span>
                    </h2>
                  </div>
                  <figure className="p-company_identity__img">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/assets/img/company/img_identity.jpg" alt="" />
                  </figure>
                  <div className="p-company_identity__txt">
                    <p>
                      <MultilineText lines={IDENTITY} />
                    </p>
                  </div>
                </section>
              </div>

              <div className="p-company__block">
                <section className="p-company_message js-anime">
                  <div className="p-company_message__ttl">
                    <h2 className="c-ttl_sup u-mgb0">
                      <em>Message from President</em>
                      <span>社長メッセージ</span>
                    </h2>
                  </div>
                  <div className="p-company_message__img">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/assets/img/company/img_message.jpg" alt="" />
                  </div>
                  <div className="p-company_message__txt">
                    <p>
                      <MultilineText lines={MESSAGE} />
                    </p>
                    <aside>
                      <span>代表取締役社長</span>
                      <em>河西　昭次</em>
                    </aside>
                  </div>
                </section>
              </div>

              <div className="p-company__block">
                <section className="p-company_profile js-anime">
                  <h2 className="c-ttl_sup">
                    <em>Company profile</em>
                    <span>会社概要</span>
                  </h2>
                  <div className="p-company_profile__sheet">
                    <table>
                      <tbody>
                        {companyProfile.map((row) => (
                          <tr key={row.label}>
                            <th>{row.label}</th>
                            <td>
                              <MultilineText lines={row.values} />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              </div>

              <div className="p-company__block">
                <section className="p-company_chart js-anime">
                  <h2 className="c-ttl_sup">
                    <em>Company organization chart</em>
                    <span>会社組織図</span>
                  </h2>
                  <div className="p-company_chart__img">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/assets/img/company/img_chart.png" alt="" />
                  </div>
                </section>
              </div>

              <div className="p-company__block">
                <section className="p-company_access">
                  <h2 className="c-ttl_sup">
                    <em>ACCESS</em>
                    <span>本社・工場・営業所へのアクセス</span>
                  </h2>
                  {accessOffices.map((office) => (
                    <section className="p-company_access__block js-anime" key={office.title}>
                      <h3 className="p-company_access__ttl">
                        <MultilineText lines={office.title} />
                      </h3>
                      <div className="p-company_access__txt">
                        {office.zip}
                        <br />
                        {office.address}
                        <br />
                        TEL：{office.tel}　FAX：{office.fax}
                        <br />
                        MAIL.{office.mail}
                      </div>
                      <div className="p-company_access__map">
                        <div className="c-iframe">
                          <iframe
                            src={office.map}
                            title={`${office.title.replace("\n", " ")}の地図`}
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                          />
                        </div>
                      </div>
                    </section>
                  ))}
                </section>
              </div>

              <div className="p-company__block">
                <section className="p-company_history js-anime">
                  <h2 className="c-ttl_sup">
                    <em>History</em>
                    <span>沿革</span>
                  </h2>
                  <div className="p-company_history__sheet">
                    <table>
                      <tbody>
                        {companyHistory.map((row) => (
                          <tr key={`${row.era}-${row.body[0]}`}>
                            <th>
                              <em>{row.era}</em>
                              <span>{row.year}</span>
                            </th>
                            <td>
                              <MultilineText lines={row.body} />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </section>
      </div>
    </article>
  );
}
