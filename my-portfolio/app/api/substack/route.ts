import { NextResponse } from "next/server";
import { substack } from "../../data/siteContent";

type FeedPost = {
  title: string;
  link: string;
  publishedAt: string;
  summary: string;
};

const MAX_POSTS = 6;

function decodeEntities(input: string): string {
  return input
    .replace(/<!\[CDATA\[|\]\]>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function stripHtml(input: string): string {
  return decodeEntities(input)
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function extractTag(source: string, tag: string): string {
  const pattern = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i");
  const match = source.match(pattern);
  return match?.[1]?.trim() ?? "";
}

function parseRss(xml: string, limit: number): FeedPost[] {
  const items = xml.match(/<item[\s\S]*?<\/item>/gi) ?? [];

  return items.slice(0, limit).map((item) => {
    const title = decodeEntities(extractTag(item, "title"));
    const link = decodeEntities(extractTag(item, "link"));
    const description = extractTag(item, "description");
    const pubDate = decodeEntities(extractTag(item, "pubDate"));

    return {
      title,
      link,
      publishedAt: pubDate,
      summary: stripHtml(description).slice(0, 220),
    };
  });
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limitParam = Number(searchParams.get("limit") ?? "3");
  const limit = Number.isFinite(limitParam)
    ? Math.min(Math.max(limitParam, 1), MAX_POSTS)
    : 3;

  if (!substack.feedUrl.includes("substack.com")) {
    return NextResponse.json({ posts: [], configured: false });
  }

  try {
    const response = await fetch(substack.feedUrl, {
      headers: { Accept: "application/rss+xml, application/xml, text/xml" },
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      return NextResponse.json({ posts: [], configured: true });
    }

    const xml = await response.text();
    const posts = parseRss(xml, limit);

    return NextResponse.json({ posts, configured: true });
  } catch {
    return NextResponse.json({ posts: [], configured: true });
  }
}
