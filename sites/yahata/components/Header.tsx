"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export const GLOBAL_NAV = [
  { href: "/", ja: "トップページ", en: "HOME" },
  { href: "/service", ja: "本社/サービス事業本部", en: "SERVICE" },
  { href: "/products", ja: "製造事業本部", en: "PRODUCTS" },
  { href: "/company", ja: "会社情報", en: "COMPANY" },
  { href: "/recruit", ja: "採用情報", en: "RECRUIT" },
  { href: "/contact", ja: "お問合せ", en: "CONTACT" }
];

/**
 * Site header. On tablet and below the navigation becomes an off-canvas drawer;
 * the original markup drove that with the `slideout` plugin, which only needs an
 * `is-open`/`slideout-open` class on <html> to work with the existing stylesheet.
 */
export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.classList.toggle("slideout-open", open);
    return () => document.documentElement.classList.remove("slideout-open");
  }, [open]);

  // Any navigation closes the drawer.
  useEffect(() => setOpen(false), [pathname]);

  const close = useCallback(() => setOpen(false), []);

  return (
    <header className="l-header">
      <div className="c-inner">
        <div className="l-header__inner">
          <div className="l-header__logo">
            <Link href="/">
              <svg>
                <title>トラックボデー製造・架装のことなら株式会社ヤハタ</title>
                <use xlinkHref="#logo" />
              </svg>
            </Link>
            <div className="l-header__desc visible-lg">
              トラックボデーの提案から製造・架装までを完全サポート
              <br />
              お客様に合わせたワンストップサービスをご提供する
            </div>
          </div>
          <div className="l-header__menu">
            <button
              type="button"
              className="l-header__hamburger slideout-hamburger so_toggle hidden-pc"
              aria-expanded={open}
              aria-controls="js-so_menu"
              onClick={() => setOpen((v) => !v)}
            >
              <span className="sr-only">MENU</span>
              <span className="hamburger-icon" />
            </button>
            <nav id="js-so_menu" className="p-gnavi slideout-menu">
              <ul className="p-gnavi__list">
                {GLOBAL_NAV.map((item) => (
                  <li className="p-gnavi__item" key={item.href}>
                    <Link href={item.href} className="p-gnavi__link" onClick={close}>
                      <em>{item.ja}</em>
                      <span>{item.en}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
      <div className="slideout-panel hidden-pc" onClick={close} />
    </header>
  );
}
