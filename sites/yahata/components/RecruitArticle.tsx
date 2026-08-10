import Link from "next/link";

import JobAccordion from "@/components/JobAccordion";
import MultilineText from "@/components/MultilineText";
import { type Interview, interviewCards, jobs, recruitLeadingBody, recruitLeadingTitle } from "@/data/recruit";

/**
 * The recruit page and the four interview pages share one layout: intro, the
 * featured interview, the other interviews, then the job listings.
 */
export default function RecruitArticle({ interview }: { interview: Interview }) {
  const others = interviewCards.filter((card) => card.slug !== interview.slug);

  return (
    <article className="l-recruit">
      <h1 className="p-kv_under">
        <figure className="c-ofi">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={interview.kv} alt={interview.kvAlt} className="c-ofi__img" />
        </figure>
      </h1>
      <div className="l-main p-company">
        <section className="p-section js-anime">
          <div className="p-section__inner c-inner">
            <h2 className="p-section__title">
              <em>RECRUIT</em>
              <span>採用情報</span>
            </h2>
            <div className="p-section__content">
              <section className="p-recruit_leading js-anime">
                <div className="p-recruit_leading__img">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={interview.leadingImage} alt="" />
                </div>
                <div className="p-recruit_leading__ttl">
                  <MultilineText lines={recruitLeadingTitle} />
                </div>
                <div className="p-recruit_leading__txt" dangerouslySetInnerHTML={{ __html: recruitLeadingBody }} />
              </section>
            </div>
          </div>
        </section>

        <section className="p-recruit_interview">
          <div className="p-recruit_interview__head js-anime">
            <div className="c-inner">
              <h2 className="c-ttl_sup">
                <em>Interview</em>
                <span>社員の声</span>
              </h2>
              <div className="p-recruit_interview__title">
                <figure className="p-recruit_interview__thumb" data-number={interview.number}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={interview.thumb} alt={interview.thumbAlt} />
                </figure>
                <div className="p-recruit_interview__catch">
                  <em className="hidden-ss">{interview.number}</em>
                  <span>
                    <MultilineText lines={interview.catch} />
                  </span>
                </div>
              </div>
              <div className="p-recruit_interview__info">
                <h3 className="p-recruit_interview__name">
                  <span>
                    <MultilineText lines={interview.role} />
                  </span>
                  <em>{interview.name}</em>
                </h3>
                <aside className="p-recruit_interview__desc">
                  <h4>略歴</h4>
                  <p>
                    <MultilineText lines={interview.bio} />
                  </p>
                </aside>
              </div>
            </div>
          </div>
          <div className="p-recruit_interview__body" dangerouslySetInnerHTML={{ __html: interview.body }} />
        </section>

        <section className="p-recruit_relation js-anime">
          <div className="c-inner">
            <h2 className="c-ttl_sup">
              <em>Other Interview</em>
              <span>他の社員の声</span>
            </h2>
            <ul className="c-card_interview">
              {others.map((card) => (
                <li key={card.slug}>
                  <Link
                    href={card.slug === "interview01" ? "/recruit" : `/recruit/${card.slug}`}
                    className="c-card_interview__link"
                  >
                    <figure className="c-card_interview__img">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={card.image} alt={card.alt} />
                      <span>{card.number}</span>
                    </figure>
                    <div className="c-card_interview__txt">
                      <div className="c-card_interview__desc">
                        <MultilineText lines={card.desc} />
                      </div>
                      <h2 className="c-card_interview__ttl">
                        <span>
                          <MultilineText lines={card.role} />
                        </span>
                        <em>{card.name}</em>
                      </h2>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="p-recruit_guideline js-anime">
          <div className="p-recruit_guideline__head">
            <div className="c-inner">
              <h2 className="c-ttl_sup u-mgb0">
                <em>Guideline</em>
                <span>募集要項</span>
              </h2>
            </div>
          </div>
          <div className="p-recruit_guideline__body">
            <JobAccordion jobs={jobs} />
          </div>
        </section>
      </div>
    </article>
  );
}
