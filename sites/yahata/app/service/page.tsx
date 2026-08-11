import type { Metadata } from "next";
import { Fragment } from "react";

import PageHero from "@/components/PageHero";
import { serviceGroups, servicePolicy } from "@/data/service";

export const metadata: Metadata = { title: "本社/サービス事業本部" };

export default function ServicePage() {
  return (
    <article className="l-content">
      <PageHero src="/assets/img/service/img_kv.jpg" />
      <div className="l-main p-service">
        <section className="p-section js-anime">
          <div className="p-section__inner c-inner">
            <h1 className="p-section__title -hasImage -img_md">
              <em>SERVICE</em>
              <span>本社/サービス事業本部</span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/img/service/img_ttl.png" alt="" />
            </h1>
            <div className="p-section__content">
              <section className="p-service_policy js-anime">
                <div className="p-panel_line">
                  <h2 className="p-panel_line__ttl">サービス事業本部の方針</h2>
                  <div className="p-panel_line__content">
                    <ul className="c-list_num">
                      {servicePolicy.map((line) => (
                        <li key={line}>{line}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>

              {serviceGroups.map((group) => (
                <section className="p-service_detail js-anime" key={group.title}>
                  <div className="p-service_detail__ttl">
                    <h2 className="c-ttl_pr u-mgb0">{group.title}</h2>
                  </div>
                  {group.items.map((item) => (
                    <section className="p-service_detail__item js-anime" key={item.title}>
                      <div className="p-service_detail__txt">
                        <h3 className="c-ttl_uline">{item.title}</h3>
                        <p>
                          {item.lines.map((line, index) => (
                            <Fragment key={line}>
                              {index > 0 && <br />}
                              {line}
                            </Fragment>
                          ))}
                        </p>
                        {item.specs && (
                          <div className="p-service_deitail__list">
                            <ul className="c-list_circle">
                              {item.specs.map((spec) => (
                                <li key={spec}>{spec}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                      <div className="p-service_detail__img">
                        {item.images.map((image) => (
                          <figure key={image.src}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={image.src} alt={image.alt} />
                          </figure>
                        ))}
                      </div>
                    </section>
                  ))}
                </section>
              ))}
            </div>
          </div>
        </section>
      </div>
    </article>
  );
}
