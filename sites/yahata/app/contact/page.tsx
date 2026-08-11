import type { Metadata } from "next";

import InquiryForm, { type FormField } from "@/components/InquiryForm";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = { title: "お問合せ" };

const FIELDS: FormField[] = [
  { name: "your_company", label: "貴社名", sub: "Company Name", type: "text" },
  { name: "your_name", label: "ご担当者名", sub: "Name", type: "text" },
  { name: "your_mail", label: "メールアドレス", sub: "E-mail address", type: "email" },
  { name: "your_mail_confirm", label: "メールアドレス(再入力)", sub: "E-mail re-enter", type: "email", confirmHidden: true, matches: "your_mail" },
  { name: "your_tel", label: "電話番号", sub: "Tel", type: "text" },
  { name: "your_inquiry", label: "お問い合わせ内容", type: "textarea" }
];

export default function ContactPage() {
  return (
    <article className="l-content">
      <PageHero src="/assets/img/contact/img_kv.jpg" />
      <div className="l-main p-contact">
        <section className="p-section js-anime">
          <div className="p-section__inner c-inner">
            <h1 className="p-section__title -hasImage -img_lg">
              <em>CONTACT</em>
              <span>お問合せ</span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/img/contact/img_ttl.png" alt="" />
            </h1>
            <div className="p-section__content">
              <InquiryForm
                formId="contact"
                fields={FIELDS}
                intro={
                  <p>
                    必要事項をご記入の上、下記お問い合わせフォームよりお問い合わせください。
                    <br />
                    必要に応じて　弊社担当営業よりご連絡させていただきますので
                    <br />
                    下記項目にご記入下さい。
                  </p>
                }
              />
            </div>
          </div>
        </section>
      </div>
    </article>
  );
}
