import type { Metadata } from "next";
import { notFound } from "next/navigation";

import RecruitArticle from "@/components/RecruitArticle";
import { findInterview } from "@/data/recruit";

export const metadata: Metadata = { title: "採用情報" };

export default function RecruitPage() {
  const interview = findInterview("interview01");
  if (!interview) notFound();

  return <RecruitArticle interview={interview} />;
}
