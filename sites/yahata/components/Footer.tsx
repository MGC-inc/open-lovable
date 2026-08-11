"use client";

import { usePathname } from "next/navigation";

export const OFFICES = [
  {
    name: "本社/サービス事業本部",
    zip: "〒595-0811",
    address: "大阪府泉北郡忠岡町忠岡北3丁目5番32号",
    tel: "0725-33-4801",
    fax: "0725-22-6722",
    mail: "y.k.a@yahata-sa.co.jp"
  },
  {
    name: "製造事業本部",
    zip: "〒595-0811",
    address: "大阪府泉北郡忠岡町忠岡北3丁目9 番19号",
    tel: "0725-21-1020",
    fax: "0725-21-0624",
    mail: "y.s@yahata-sa.co.jp"
  },
  {
    name: "岡山営業所",
    zip: "〒701-1152",
    address: "岡山県岡山市北区津高40番1号",
    tel: "086-230-7742",
    fax: "086-230-7743",
    mail: "qqun9tk9k@crocus.ocn.ne.jp"
  }
];

export default function Footer() {
  // The photographic "物流のサポートはヤハタから" band tops the footer on the
  // front page only; every other page starts straight at the green block.
  const isHome = usePathname() === "/";

  return (
    <footer className="l-footer js-totop_ep">
      {isHome && (
        <div className="l-footer__top">
          <div className="c-inner">
            <p>物流のサポートはヤハタから</p>
          </div>
        </div>
      )}
      <div className="l-footer__bottom">
        <div className="c-inner">
          <div className="l-footer__info">
            <div className="l-footer__logo">
              <svg>
                <title>株式会社ヤハタ</title>
                <use xlinkHref="#logo02" />
              </svg>
            </div>
            <dl className="l-footer__address">
              <dt>株式会社ヤハタ</dt>
              {OFFICES.map((office) => (
                <dd key={office.name}>
                  {office.name}
                  <br />
                  {office.zip}　<br className="hidden-lg" />
                  {office.address}
                  <br />
                  TEL：{office.tel}　<br className="visible-sm" />
                  FAX：{office.fax}
                </dd>
              ))}
            </dl>
          </div>
          <div className="l-footer__conclusion">
            <div className="l-footer__notes">
              車検・整備、車両の提案から製造までを完全サポート!
              <br className="visible-sp" />
              お客様に合わせたワンストップサービスを
              <br className="visible-ss" />
              ご提供しております。
            </div>
            <div className="l-footer__copy">Copyright © 2021 YAHATA All Rights Reserved.</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
