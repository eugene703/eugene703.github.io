"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { companies, featuredProjects, substack } from "./data/siteContent";

type LatestPost = {
  title: string;
  link: string;
  publishedAt: string;
  summary: string;
};

function formatPublishedDate(value: string): string {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return "Recent";
  }

  return parsed.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function Home() {
  const [activeProject, setActiveProject] = useState<
    (typeof featuredProjects)[number] | null
  >(null);
  const [latestPosts, setLatestPosts] = useState<LatestPost[]>([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadLatestSubstackPosts() {
      try {
        const response = await fetch("/api/substack?limit=3");
        const data = (await response.json()) as {
          posts?: LatestPost[];
        };

        if (mounted && Array.isArray(data.posts)) {
          setLatestPosts(data.posts);
        }
      } catch {
        if (mounted) {
          setLatestPosts([]);
        }
      } finally {
        if (mounted) {
          setIsLoadingPosts(false);
        }
      }
    }

    void loadLatestSubstackPosts();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_right,_#e9eef5_0%,_#e5e0d7_52%,_#ddd5ca_100%)] text-zinc-900">
      <main className="mx-auto w-full max-w-5xl px-6 py-14 sm:px-10 sm:py-20">
        <header className="rounded-2xl border border-zinc-300/80 bg-[#f3efe8]/85 p-8 shadow-[0_10px_30px_-20px_rgba(0,0,0,0.55)] backdrop-blur-sm sm:p-10">
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Eugene Taehyun Cho
          </h1>
          <p className="mt-3 text-sm font-medium text-zinc-600">
            Current:{" "}
            <a
              href="https://rosenblatt.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-700 underline decoration-zinc-400 underline-offset-2 transition hover:text-amber-700"
            >
              Rosenblatt AI
            </a>{" "}
            · AI Tech Lead - AI Solutioning
          </p>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-zinc-700 sm:text-lg">
            AI Tech Lead at Rosenblatt AI, focused on turning ambiguous business
            problems into practical, high-impact products. I build and deploy AI
            systems that teams actually adopt.
          </p>

          <div className="mt-7 flex flex-wrap gap-3 text-sm">
            <span className="rounded-full border border-zinc-400/70 bg-[#ebe5da] px-3 py-1.5 text-zinc-700">
              New York, NY
            </span>
            <a
              href="https://linkedin.com/in/eugenetcho/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-zinc-400/70 bg-[#ebe5da] px-3 py-1.5 text-zinc-700 transition hover:border-zinc-600 hover:text-zinc-900"
            >
              LinkedIn
            </a>
            <a
              href={substack.publicationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-zinc-400/70 bg-[#ebe5da] px-3 py-1.5 text-zinc-700 transition hover:border-zinc-600 hover:text-zinc-900"
            >
              Substack
            </a>
          </div>
        </header>

        <section className="mt-14 rounded-xl border border-zinc-300/85 bg-[#f2eee6]/85 p-6 sm:p-8">
          <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-zinc-500">
            About Me
          </h2>
          <div className="mt-4 space-y-4 text-sm leading-relaxed text-zinc-700 sm:text-base">
            <p>
              I solve complex business problems with AI by turning ambiguity
              into clear, high-impact solutions. As an AI Team Lead, I own
              initiatives end-to-end, from identifying the right problems to
              deploying production systems that materially improve how
              organizations operate.
            </p>
            <p>
              I focus on applying AI where it drives measurable outcomes,
              embedding it into core workflows and optimizing for performance,
              cost, and scalability. My background spans consulting, startup,
              and trading environments, with hands-on delivery across AWS, GCP,
              and Azure.
            </p>
          </div>

          <div className="mt-6">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">
              Previously At
            </p>
            <div className="mt-3 flex flex-wrap gap-2.5">
              {companies.map((company) => (
                <a
                  key={company.name}
                  href={company.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-zinc-400/80 bg-[#ebe5da] px-3 py-1.5 text-sm text-zinc-700 transition hover:border-zinc-600 hover:text-zinc-900"
                >
                  {company.name}
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-14">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-zinc-500">
              Featured Projects
            </h2>
            <Link
              href="/projects"
              className="text-sm font-medium text-amber-700 hover:text-amber-800"
            >
              View all
            </Link>
          </div>
          <p className="mt-2 text-xs font-medium uppercase tracking-wide text-zinc-500">
            Click a card to open full project details
          </p>

          <div className="mt-5 grid gap-5 md:grid-cols-3">
            {featuredProjects.map((project) => (
              <button
                key={project.title}
                type="button"
                onClick={() => setActiveProject(project)}
                className="rounded-xl border border-zinc-300/85 bg-[#f2eee6]/85 p-5 text-left shadow-[0_10px_24px_-22px_rgba(0,0,0,0.8)] transition hover:border-zinc-500 hover:shadow-[0_12px_30px_-24px_rgba(0,0,0,0.85)]"
              >
                <h3 className="text-base font-semibold text-zinc-900">
                  {project.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-700">
                  {project.summary}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.stack.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-zinc-400/80 bg-[#ebe5da] px-2.5 py-1 text-xs text-zinc-700"
                    >
                      {item}
                    </span>
                  ))}
                </div>
                <p className="mt-4 text-sm font-medium text-amber-700">
                  Open project overview
                </p>
              </button>
            ))}
          </div>
        </section>

        <section className="mt-14">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-zinc-500">
              Blog & Writing
            </h2>
            <a
              href={substack.publicationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-amber-700 hover:text-amber-800"
            >
              Visit Substack
            </a>
          </div>

          <div className="mt-5 space-y-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">
                Latest From Substack
              </p>
              <div className="mt-3 space-y-4">
                {isLoadingPosts && (
                  <p className="text-sm text-zinc-600">Loading recent posts...</p>
                )}
                {!isLoadingPosts && latestPosts.length === 0 && (
                  <p className="text-sm text-zinc-600">
                    More blog posts coming soon. In the meantime, visit my
                    Substack for the latest writing.
                  </p>
                )}
                {latestPosts.map((post) => (
                  <article
                    key={post.link}
                    className="rounded-xl border border-zinc-300/85 bg-[#f2eee6]/85 p-5"
                  >
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                      <h3 className="text-base font-semibold text-zinc-900">
                        <a
                          href={post.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="transition hover:text-amber-700"
                        >
                          {post.title}
                        </a>
                      </h3>
                      <span className="shrink-0 text-xs font-medium uppercase tracking-wide text-zinc-500">
                        {formatPublishedDate(post.publishedAt)}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-700">
                      {post.summary}
                    </p>
                  </article>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">
                Posts I Recommend
              </p>
              <div className="mt-3 space-y-4">
                {substack.curatedPosts.map((post) => (
                  <article
                    key={post.link}
                    className="rounded-xl border border-zinc-300/85 bg-[#f2eee6]/85 p-5"
                  >
                    <div className="flex flex-col gap-1">
                      <h3 className="text-base font-semibold text-zinc-900">
                        <a
                          href={post.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="transition hover:text-amber-700"
                        >
                          {post.title}
                        </a>
                      </h3>
                      <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                        {post.author}
                      </p>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-700">
                      {post.note}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <footer className="mt-14 border-t border-zinc-200/80 pt-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-zinc-600">
              Contact: eugene [dot] t [dot] cho [at] gmail [dot] com
            </p>
            <a
              href={substack.publicationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-amber-700 transition hover:text-amber-800"
            >
              Follow on Substack
            </a>
          </div>
        </footer>
      </main>

      {activeProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8">
          <button
            type="button"
            aria-label="Close project details"
            onClick={() => setActiveProject(null)}
            className="absolute inset-0 bg-zinc-900/45 backdrop-blur-[2px]"
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            className="relative z-10 w-full max-w-2xl rounded-2xl border border-zinc-300/90 bg-[#f3efe8] p-6 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.7)] sm:p-8"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">
              Featured Project
            </p>
            <h3
              id="project-modal-title"
              className="mt-2 text-2xl font-semibold tracking-tight text-zinc-900"
            >
              {activeProject.title}
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-zinc-700 sm:text-base">
              {activeProject.summary}
            </p>
            <ul className="mt-5 space-y-2 text-sm leading-relaxed text-zinc-700">
              {activeProject.details.map((detail) => (
                <li key={detail} className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-amber-600" />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
            <div className="mt-5 flex flex-wrap gap-2">
              {activeProject.stack.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-zinc-400/80 bg-[#ebe5da] px-2.5 py-1 text-xs text-zinc-700"
                >
                  {item}
                </span>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setActiveProject(null)}
              className="mt-6 rounded-full border border-zinc-400/80 bg-[#ebe5da] px-4 py-2 text-sm font-medium text-zinc-700 transition hover:border-zinc-600 hover:text-zinc-900"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
