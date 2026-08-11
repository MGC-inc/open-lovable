/**
 * Regenerates data/recruit.ts from saved copies of the recruit pages.
 *
 * The recruit section is the site's CMS-heaviest area: five employee interviews
 * and five job postings, all authored in the WordPress editor. Their headings
 * and metadata are lifted into typed fields; the long editorial bodies are kept
 * as markup so the copy survives verbatim.
 *
 *   node scripts/extract-recruit.mjs <mirror-root> <manifest-out>
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const [, , mirrorRoot = ".", manifestOut = "recruit-assets.txt"] = process.argv;

const assets = new Set();

/** Rewrites absolute URLs to site-relative ones and records the uploads used. */
function localise(html) {
  const local = html.replace(/https:\/\/www\.yahata-sa\.co\.jp\//g, "/");
  for (const match of local.matchAll(/\/wp\/wp-content\/uploads\/[^\s"')]+/g)) assets.add(match[0]);
  return local;
}

function toLines(fragment) {
  return fragment
    .replace(/<br\s*\/?>/g, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(parseInt(code, 16)))
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function between(html, startMarker, endMarker, from = 0) {
  const start = html.indexOf(startMarker, from);
  if (start === -1) throw new Error(`marker not found: ${startMarker}`);
  const end = html.indexOf(endMarker, start + startMarker.length);
  if (end === -1) throw new Error(`end marker not found: ${endMarker}`);
  return html.slice(start + startMarker.length, end);
}

function readInterview(slug, path) {
  const html = readFileSync(join(mirrorRoot, path, "index.html"), "utf8");

  const kv = html.match(/<h1 class="p-kv_under">[\s\S]*?<img src="([^"]+)" alt="([^"]*)"/);
  const leadingImage = html.match(/p-recruit_leading__img"><img src="([^"]+)"/);
  const thumb = html.match(/p-recruit_interview__thumb" data-number="(\d+)"><img src="([^"]+)" alt="([^"]*)"/);
  const catchCopy = between(html, '<div class="p-recruit_interview__catch">', "</div>");
  const info = between(html, '<h3 class="p-recruit_interview__name">', "</h3>");
  const bio = between(html, '<aside class="p-recruit_interview__desc">', "</aside>");
  const body = between(html, '<div class="p-recruit_interview__body">', '\n      </div>\n    </section>');

  return {
    slug,
    number: thumb[1],
    kv: localise(kv[1]),
    kvAlt: kv[2],
    leadingImage: localise(leadingImage[1]),
    thumb: localise(thumb[2]),
    thumbAlt: thumb[3],
    catch: toLines(catchCopy.replace(/<em[^>]*>\d+<\/em>/, "")),
    role: toLines(between(info, "<span>", "</span>")),
    name: toLines(between(info, "<em>", "</em>")).join(" "),
    bio: toLines(between(bio, "<p>", "</p>")).join("\n"),
    body: localise(body).trim()
  };
}

const INTERVIEWS = [
  { slug: "interview01", path: "recruit" },
  { slug: "interview02", path: "recruit/interview02" },
  { slug: "interview03", path: "recruit/interview03" },
  { slug: "interview04", path: "recruit/interview04" },
  { slug: "interview05", path: "recruit/interview05" }
];

const interviews = INTERVIEWS.map((entry) => readInterview(entry.slug, entry.path));

/** The "other interviews" cards — collected from every page so all five exist. */
const cards = new Map();
for (const entry of INTERVIEWS) {
  const html = readFileSync(join(mirrorRoot, entry.path, "index.html"), "utf8");
  const list = between(html, '<ul class="c-card_interview">', "</ul>");
  for (const match of list.matchAll(/<li>([\s\S]*?)<\/li>/g)) {
    const item = match[1];
    const slug = item.match(/\/recruit\/(interview\d+)\//)[1];
    const image = item.match(/<img src="([^"]+)" alt="([^"]*)"/);
    cards.set(slug, {
      slug,
      number: item.match(/<span>(\d+)<\/span>/)[1],
      image: localise(image[1]),
      alt: image[2],
      desc: toLines(between(item, '<div class="c-card_interview__desc">', "</div>")),
      role: toLines(between(item, '<h2 class="c-card_interview__ttl"><span>', "</span>")),
      name: toLines(between(item, "<em>", "</em>")).join(" ")
    });
  }
}

/** Job postings live in the accordion at the bottom of /recruit/. */
const recruitHtml = readFileSync(join(mirrorRoot, "recruit", "index.html"), "utf8");
const jobs = [...recruitHtml.matchAll(/<dt class="p-panel_requirement__head">([\s\S]*?)<\/dt>\s*<dd class="p-panel_requirement__body" id="([^"]+)">([\s\S]*?)<\/dd>/g)].map(
  (match) => {
    const [, head, id, bodyHtml] = match;
    return {
      id,
      name: toLines(between(head, '<h3 class="p-panel_requirement__name">', "</h3>")).join(" "),
      count: toLines(between(head, '<div class="p-panel_requirement__count">', "</div>")).join(" "),
      content: localise(bodyHtml).trim()
    };
  }
);

const leadingTitle = toLines(between(recruitHtml, '<div class="p-recruit_leading__ttl">', "</div>")).join("\n");
const leadingBody = localise(between(recruitHtml, '<div class="p-recruit_leading__txt">', "</div>")).trim();

const file = `// Generated by scripts/extract-recruit.mjs — edit that script, not this file.

/** One employee interview. \`body\` is the editor-authored markup. */
export type Interview = {
  slug: string;
  number: string;
  kv: string;
  kvAlt: string;
  leadingImage: string;
  thumb: string;
  thumbAlt: string;
  catch: string[];
  role: string[];
  name: string;
  bio: string;
  body: string;
};

/** Card shown in the "他の社員の声" list. */
export type InterviewCard = {
  slug: string;
  number: string;
  image: string;
  alt: string;
  desc: string[];
  role: string[];
  name: string;
};

/** One accordion entry under 募集要項. \`content\` is the panel markup. */
export type JobPosting = { id: string; name: string; count: string; content: string };

export const recruitLeadingTitle = ${JSON.stringify(leadingTitle)};

export const recruitLeadingBody = ${JSON.stringify(leadingBody)};

export const interviews: Interview[] = ${JSON.stringify(interviews, null, 2)};

export const interviewCards: InterviewCard[] = ${JSON.stringify([...cards.values()].sort((a, b) => a.number.localeCompare(b.number)), null, 2)};

export const jobs: JobPosting[] = ${JSON.stringify(jobs, null, 2)};

export function findInterview(slug: string): Interview | undefined {
  return interviews.find((interview) => interview.slug === slug);
}
`;

writeFileSync(new URL("../data/recruit.ts", import.meta.url), file);
writeFileSync(manifestOut, [...assets].sort().join("\n") + "\n");

console.log(
  `data/recruit.ts: ${interviews.length} interviews, ${cards.size} cards, ${jobs.length} jobs, ${assets.size} uploads referenced`
);
