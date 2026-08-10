import type { Metadata } from "next";

import InquiryForm, { type FormField } from "@/components/InquiryForm";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = { title: "採用応募" };

const FIELDS: FormField[] = [
  { name: "your_name", label: "お名前", sub: "Name", type: "text", required: true },
  { name: "your_age", label: "年齢", sub: "Age", type: "text", required: true },
  { name: "your_mail", label: "メールアドレス", sub: "E-mail address", type: "email", required: true },
  {
    name: "your_mail_confirm",
    label: "メールアドレス(再入力)",
    sub: "E-mail re-enter",
    type: "email",
    required: true,
    confirmHidden: true,
    matches: "your_mail"
  },
  { name: "your_tel", label: "電話番号", sub: "Tel", type: "text", required: true },
  {
    name: "job",
    label: "希望部署",
    sub: "Preferred Department",
    type: "radio",
    required: true,
    options: ["営業職", "製造スタッフ", "整備士", "鈑金・塗装", "希望部署未定"]
  },
  {
    name: "file",
    label: "履歴書等添付",
    sub: "Resume or Related Documents",
    type: "file",
    note: "※送付するファイルが複数ある場合は、ZIPなどに圧縮して添付してください"
  },
  { name: "your_inquiry", label: "ご質問等", sub: "Inquiries", type: "textarea" }
];

export default function EntryPage() {
  return (
    <article className="l-content">
      <PageHero src="/assets/img/contact/img_kv.jpg" />
      <div className="l-main p-contact">
        <section className="p-section js-anime">
          <div className="p-section__inner c-inner">
            <h1 className="p-section__title -hasImage -img_lg">
              <em>ENTRY</em>
              <span>採用応募</span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/img/contact/img_ttl.png" alt="" />
            </h1>
            <div className="p-section__content">
              <InquiryForm
                formId="entry"
                fields={FIELDS}
                intro={
                  <p>
                    必要事項をご記入の上、下記採用応募フォームよりお問い合わせください。
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
