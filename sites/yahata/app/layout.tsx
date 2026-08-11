import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Loader from "@/components/Loader";
import PageTop from "@/components/PageTop";
import ScrollReveal from "@/components/ScrollReveal";
import SvgSprite from "@/components/SvgSprite";

const SITE_NAME = "トラックボデー製造・架装のことなら株式会社ヤハタ";
const DESCRIPTION =
  "株式会社ヤハタでは一般車検・整備業に加え、トラックの荷台の製造を行っております。この経験と実績で、お客様の要望に応じたトラックの販売・トラック荷台の製造・アフターまで、一貫したサービスの提供ができます。";

export const metadata: Metadata = {
  title: { default: SITE_NAME, template: `%s｜${SITE_NAME}` },
  description: DESCRIPTION,
  openGraph: {
    title: SITE_NAME,
    description: DESCRIPTION,
    siteName: SITE_NAME,
    type: "website",
    images: ["/assets/img/common/ogp.jpg"]
  },
  icons: {
    icon: [
      { url: "/assets/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/assets/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" }
    ],
    apple: { url: "/assets/favicon/apple-touch-icon.png", sizes: "180x180" }
  },
  manifest: "/assets/favicon/site.webmanifest",
  formatDetection: { telephone: false }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 2,
  userScalable: true,
  themeColor: "#ffffff"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700;900&family=Oswald:wght@500&display=swap"
          rel="stylesheet"
        />
        {/* The original hand-authored stylesheet, served verbatim from /public so that
            its relative url(../img/…) and url(../fonts/…) references keep resolving. */}
        <link rel="stylesheet" href="/assets/css/style.css" />
        {/* Small additions for the behaviours that used to come from jQuery plugins. */}
        <link rel="stylesheet" href="/assets/css/site.css" />
      </head>
      <body id="page" className="l-page">
        <Loader />
        <SvgSprite />
        <div className="l-container">
          <Header />
          {children}
          <Footer />
        </div>
        <PageTop />
        <ScrollReveal />
      </body>
    </html>
  );
}
