import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import MultilineText from "@/components/MultilineText";
import { findTerm, productCategories } from "@/data/products";

type Params = { params: Promise<{ group: string; slug: string }> };

export function generateStaticParams() {
  return productCategories.flatMap((category) =>
    category.terms.map((term) => ({ group: category.group, slug: term.slug }))
  );
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { group, slug } = await params;
  const found = findTerm(group, slug);
  return { title: found ? found.term.name : "製造事業本部" };
}

export default async function ProductTermPage({ params }: Params) {
  const { group, slug } = await params;
  const found = findTerm(group, slug);
  if (!found) notFound();

  const { category, term } = found;

  return (
    <article className="l-content">
      <div className="l-main p-products">
        <section className="p-products_archive">
          <div className="c-inner">
            <div className="c-ttl_sup u-mgb0750">
              <em>{category.en}</em>
              <span>{category.ja}</span>
            </div>
            <h1 className="c-ttl_pl">{term.name}</h1>
            <div className="p-products_archive__list">
              {term.vehicles.map((vehicle, index) => (
                <section className="p-products_body" key={`${vehicle.image}-${index}`}>
                  <figure className="p-products_body__img">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={vehicle.image} alt={vehicle.alt} />
                  </figure>
                  <div className="p-products_body__txt">
                    <h2 className="p-products_body__name">{vehicle.name}</h2>
                    <h3 className="p-products_body__ttl">
                      <span>特徴</span>
                    </h3>
                    <div className="p-products_body__desc">
                      <MultilineText lines={vehicle.description} />
                    </div>
                    {vehicle.details.length > 0 && (
                      <ul className="p-products_body__list">
                        {vehicle.details.map((detail, detailIndex) => (
                          <li key={`${detail.image}-${detailIndex}`}>
                            <figure>
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img src={detail.image} alt="" />
                            </figure>
                            {detail.captions.length > 0 && (
                              <aside>
                                {detail.captions.map((caption, captionIndex) => (
                                  <p key={`${caption}-${captionIndex}`}>
                                    <MultilineText lines={caption} />
                                  </p>
                                ))}
                              </aside>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </section>
              ))}
            </div>
            <div className="p-products_archive__btn">
              <Link href={`/products#${category.group}`} className="c-btn_pl">
                <span>BACK</span>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </article>
  );
}
