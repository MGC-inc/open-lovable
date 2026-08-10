import type { Metadata } from "next";
import Link from "next/link";

import MultilineText from "@/components/MultilineText";
import PageHero from "@/components/PageHero";
import { productCategories } from "@/data/products";
import { productMachines, productSteps, productsPolicy } from "@/data/products.flow";

export const metadata: Metadata = { title: "製造事業本部" };

export default function ProductsPage() {
  return (
    <article className="l-content">
      <PageHero src="/assets/img/products/img_kv.jpg" />
      <div className="l-main p-products">
        <section className="p-section js-anime">
          <div className="p-section__inner c-inner">
            <h1 className="p-section__title -hasImage -img_sm">
              <em>PRODUCTS</em>
              <span>製造事業本部</span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/img/products/img_ttl.png" alt="" />
            </h1>
            <div className="p-section__content">
              <section className="p-products_policy js-anime">
                <div className="p-panel_line">
                  <h2 className="p-panel_line__ttl">製造事業本部の方針</h2>
                  <div className="p-panel_line__content">
                    <ul className="c-list_num">
                      {productsPolicy.map((line) => (
                        <li key={line}>
                          <MultilineText lines={line} />
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>

              <div className="p-products_detail">
                {productSteps.map((step) => (
                  <section className="p-products_detail__item js-anime" key={step.en}>
                    <div className="p-products_detail__txt">
                      <h2 className="c-ttl_sup_uline">
                        <em>{step.en}</em>
                        <span>{step.ja}</span>
                      </h2>
                      <div className="p-products_detail__desc">{step.lead}</div>
                      <p>
                        <MultilineText lines={step.body} />
                      </p>
                      {step.extra && (
                        <>
                          <br />
                          <div className="p-products_detail__desc" style={{ lineHeight: 1.2, marginBottom: ".6em" }}>
                            {step.extra.lead}
                          </div>
                          <p>
                            <MultilineText lines={step.extra.body} />
                          </p>
                        </>
                      )}
                    </div>
                    <div className="p-products_detail__img">
                      {step.images.map((image) => (
                        <figure key={image.src}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={image.src} alt={image.alt} />
                        </figure>
                      ))}
                    </div>
                  </section>
                ))}

                <ul className="p-products_detail__others js-anime">
                  {productMachines.map((machine) => (
                    <li key={machine.name}>
                      <div className="p-products_detail__item_sub">
                        <figure>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={machine.image} alt={machine.alt} />
                        </figure>
                        <aside>
                          <h2>
                            <em>{machine.name}</em>
                            {machine.spec.length > 0 && (
                              <span>
                                <MultilineText lines={machine.spec} />
                              </span>
                            )}
                          </h2>
                          {machine.description && <p>{machine.description}</p>}
                        </aside>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <div className="p-products_category">
          <div className="c-inner">
            {productCategories.map((category) => (
              <section id={category.group} key={category.group}>
                <h2 className="c-ttl_sup">
                  <em>{category.en}</em>
                  <span>{category.ja}</span>
                </h2>
                <ul className="c-card_products_term">
                  {category.terms.map((term) => (
                    <li className="c-card_products_term__item js-anime" key={term.slug}>
                      <Link
                        href={`/products/type/${category.group}/${term.slug}`}
                        className="c-card_products_term__link"
                      >
                        <h3 className="c-card_products_term__ttl">{term.name}</h3>
                        <figure className="c-card_products_term__img">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={term.image} alt={term.name} />
                        </figure>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
