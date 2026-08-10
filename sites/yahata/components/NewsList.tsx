import Link from "next/link";

import type { NewsPost } from "@/data/news";

export default function NewsList({ items }: { items: NewsPost[] }) {
  return (
    <ul className="c-card_news">
      {items.map((post) => (
        <li key={post.id}>
          <Link href={`/news/${post.id}`} className="c-card_news__link">
            <time className="c-card_news__date" dateTime={post.date}>
              {post.label}
            </time>
            <span className="c-card_news__ttl">{post.title}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
