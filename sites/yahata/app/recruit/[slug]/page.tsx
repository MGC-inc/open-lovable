import type { Metadata } from "next";
import { notFound } from "next/navigation";

import RecruitArticle from "@/components/RecruitArticle";
import { findInterview, interviews } from "@/data/recruit";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  // interview01 is the /recruit landing page itself.
  return interviews.filter((interview) => interview.slug !== "interview01").map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const interview = findInterview((await params).slug);
  return { title: interview ? `採用情報 - インタビュー：${interview.name}` : "採用情報" };
}

export default async function InterviewPage({ params }: Params) {
  const { slug } = await params;
  const interview = slug === "interview01" ? undefined : findInterview(slug);
  if (!interview) notFound();

  return <RecruitArticle interview={interview} />;
}
