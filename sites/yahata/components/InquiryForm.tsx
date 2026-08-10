"use client";

import Link from "next/link";
import { useState } from "react";

export type FormField = {
  name: string;
  /** Japanese label. */
  label: string;
  /** English sub-label shown under the Japanese one. */
  sub?: string;
  type: "text" | "email" | "tel" | "textarea" | "radio" | "file";
  required?: boolean;
  options?: string[];
  /**
   * Carries the `cf_hidden` class, which the stylesheet hides on the review
   * step — used for the "type your address again" row.
   */
  confirmHidden?: boolean;
  /** Name of the field this one has to match (the re-entered address). */
  matches?: string;
  note?: string;
};

type Status = "input" | "confirm" | "sending" | "done" | "error";

/**
 * The original forms were rendered by the MW WP Form WordPress plugin: fill in,
 * review ("入力内容を確認する"), then send. That flow is reproduced here;
 * delivery is handled by /api/inquiry.
 */
export default function InquiryForm({
  formId,
  fields,
  intro
}: {
  formId: string;
  fields: FormField[];
  intro: React.ReactNode;
}) {
  const [values, setValues] = useState<Record<string, string>>(() =>
    Object.fromEntries(fields.map((field) => [field.name, field.type === "radio" ? (field.options?.[0] ?? "") : ""]))
  );
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [agreementError, setAgreementError] = useState("");
  const [status, setStatus] = useState<Status>("input");

  const set = (name: string, value: string) => setValues((current) => ({ ...current, [name]: value }));

  const validate = () => {
    const found: Record<string, string> = {};
    for (const field of fields) {
      const value = (values[field.name] ?? "").trim();
      if (field.required && !value) {
        found[field.name] = "入力してください。";
        continue;
      }
      if (field.type === "email" && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        found[field.name] = "メールアドレスの形式が正しくありません。";
        continue;
      }
      if (field.matches && value !== (values[field.matches] ?? "").trim()) {
        found[field.name] = "メールアドレスが一致しません。";
      }
    }
    setErrors(found);
    setAgreementError(agreed ? "" : "プライバシーポリシーへの同意が必要です。");
    return Object.keys(found).length === 0 && agreed;
  };

  const send = async () => {
    setStatus("sending");
    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formId, values })
      });
      setStatus(response.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  };

  if (status === "done") {
    return (
      <div className="p-contact__block">
        <p>
          お問い合わせありがとうございます。
          <br />
          内容を確認のうえ、担当者よりご連絡いたします。
        </p>
        <div className="c-form__btnwrap">
          <Link href="/" className="c-btn_pl">
            トップページへ
          </Link>
        </div>
      </div>
    );
  }

  const reviewing = status === "confirm" || status === "sending";

  return (
    <div className="p-contact__block">
      {intro}
      <div className="p-contact__form">
        <div className={`c-form ${reviewing ? "-confirm" : "-input"}`}>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              if (reviewing) {
                void send();
              } else if (validate()) {
                setStatus("confirm");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
          >
            <table className="c-form__sheet">
              <tbody>
                {fields.map((field) => (
                  <tr key={field.name} className={field.confirmHidden ? "cf_hidden" : undefined}>
                    <th>
                      <div className="c-form__ttl">
                        <span>
                          {field.label}
                          {field.required && <i>*</i>}
                        </span>
                        {field.sub && <em>{field.sub}</em>}
                      </div>
                    </th>
                    <td>
                      <div className="c-form__row">
                        <div className="c-form__field">
                          {reviewing ? (
                            <p>{values[field.name] || "―"}</p>
                          ) : (
                            <Field field={field} value={values[field.name] ?? ""} onChange={set} />
                          )}
                        </div>
                      </div>
                      {/* The original markup keeps an empty error slot in every
                          row; it contributes to the row spacing. */}
                      <div className="c-form__error">{errors[field.name] ?? ""}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="c-form__agreement cf_hidden">
              <span className="mwform-checkbox-field horizontal-item">
                <label htmlFor={`${formId}-agreement`}>
                  <input
                    type="checkbox"
                    id={`${formId}-agreement`}
                    checked={agreed}
                    onChange={(event) => setAgreed(event.target.checked)}
                  />
                  <span className="mwform-checkbox-field-text"> </span>
                </label>
              </span>
              <label htmlFor={`${formId}-agreement`}>
                <Link href="/privacy" target="_blank" rel="noopener">
                  プライバシーポリシー
                </Link>
                に同意の上送信します。
              </label>
              <div className="c-form__error">
                <br />
                {agreementError}
              </div>
            </div>

            {status === "error" && (
              <div className="c-form__error">
                送信に失敗しました。お手数ですが、お電話にてお問い合わせください。
              </div>
            )}

            <div className="c-form__btnwrap">
              {status === "confirm" && (
                <button type="button" className="c-form__btn -back" onClick={() => setStatus("input")}>
                  修正する
                </button>
              )}
              <button type="submit" className="c-form__btn" disabled={status === "sending"}>
                {reviewing ? "送信する" : "入力内容を確認する"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function Field({
  field,
  value,
  onChange
}: {
  field: FormField;
  value: string;
  onChange: (name: string, value: string) => void;
}) {
  if (field.type === "textarea") {
    return (
      <textarea
        name={field.name}
        className="c-form__input -textarea -full"
        cols={50}
        rows={5}
        value={value}
        onChange={(event) => onChange(field.name, event.target.value)}
      />
    );
  }

  if (field.type === "radio") {
    return (
      <>
        {field.options?.map((option, index) => (
          <span className="mwform-radio-field horizontal-item" key={option}>
            <label htmlFor={`${field.name}-${index + 1}`}>
              <input
                type="radio"
                name={field.name}
                id={`${field.name}-${index + 1}`}
                className="c-form__radio -text -full"
                value={option}
                checked={value === option}
                onChange={(event) => onChange(field.name, event.target.value)}
              />
              <span className="mwform-radio-field-text">{option}</span>
            </label>
          </span>
        ))}
      </>
    );
  }

  if (field.type === "file") {
    return (
      <>
        <input
          type="file"
          name={field.name}
          id={field.name}
          className="file"
          onChange={(event) => onChange(field.name, event.target.files?.[0]?.name ?? "")}
        />
        {field.note && (
          <>
            <br />
            <small>{field.note}</small>
          </>
        )}
      </>
    );
  }

  return (
    <input
      type={field.type}
      name={field.name}
      className="c-form__input -text -full"
      size={60}
      value={value}
      onChange={(event) => onChange(field.name, event.target.value)}
    />
  );
}
