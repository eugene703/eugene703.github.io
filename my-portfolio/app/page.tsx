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

const capabilityAreas = [
  {
    title: "AI Product Delivery",
    detail:
      "Turn ambiguous business goals into scoped, production-ready systems with clear adoption criteria.",
  },
  {
    title: "Enterprise Agent Workflows",
    detail:
      "Design and operationalize multi-agent workflows that integrate with existing systems and controls.",
  },
  {
    title: "Execution Across Cloud",
    detail:
      "Deploy practical, resilient architectures across AWS, GCP, and Azure with performance and governance in mind.",
  },
] as const;

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
        const response = await fetch("/api/substack");
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

  useEffect(() => {
    if (!activeProject) {
      return;
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActiveProject(null);
      }
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [activeProject]);

  return (
    <div className="min-h-screen text-slate-100">
      <main className="mx-auto w-full max-w-6xl px-6 py-10 sm:px-10 sm:py-14">
        <header className="shell fade-up rounded-3xl p-8 sm:p-12">
          <p className="eyebrow">AI Solutioning & Product Execution</p>
          <h1 className="headline mt-4 max-w-4xl text-4xl tracking-tight text-slate-100 sm:text-6xl">
            Eugene Cho builds enterprise AI systems teams actually adopt.
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-slate-300 sm:text-lg">
            AI Tech Lead at{" "}
            <a
              href="https://rosenblatt.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="primary-link font-semibold"
            >
              Rosenblatt AI
            </a>
            . I translate uncertain goals into practical workflows, then deploy
            the systems end-to-end with measurable business outcomes.
          </p>

          <div className="mt-7 flex flex-wrap gap-3 text-sm font-medium text-slate-300">
            <span className="chip rounded-full px-3 py-1.5">New York, NY</span>
            <a
              href="https://linkedin.com/in/eugenetcho/"
              target="_blank"
              rel="noopener noreferrer"
              className="chip rounded-full px-3 py-1.5 transition hover:border-cyan-300"
            >
              LinkedIn
            </a>
            <a
              href={substack.publicationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="chip rounded-full px-3 py-1.5 transition hover:border-cyan-300"
            >
              Substack
            </a>
            <Link
              href="/projects"
              className="chip rounded-full px-3 py-1.5 transition hover:border-cyan-300"
            >
              Full Project Archive
            </Link>
          </div>
        </header>

        <section className="mt-8 grid gap-4 sm:grid-cols-3">
          {capabilityAreas.map((area) => (
            <article key={area.title} className="shell rounded-2xl p-5 sm:p-6">
              <h2 className="headline text-xl text-slate-100">{area.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">
                {area.detail}
              </p>
            </article>
          ))}
        </section>

        <section className="shell mt-10 rounded-3xl p-7 sm:p-10">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="headline text-3xl text-slate-100 sm:text-4xl">
              Featured Projects
            </h2>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
              Select a card to view project details
            </p>
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {featuredProjects.map((project) => (
              <button
                key={project.title}
                type="button"
                onClick={() => setActiveProject(project)}
                className="shell-strong group rounded-2xl p-5 text-left transition hover:-translate-y-0.5 hover:border-cyan-300"
              >
                <h3 className="headline text-2xl text-slate-100">{project.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">
                  {project.summary}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.stack.map((item) => (
                    <span
                      key={item}
                      className="chip rounded-full px-2.5 py-1 text-xs"
                    >
                      {item}
                    </span>
                  ))}
                </div>
                <p className="mt-5 text-sm font-semibold text-cyan-300 group-hover:text-cyan-200">
                  Open project overview
                </p>
              </button>
            ))}
          </div>
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <div className="shell rounded-3xl p-7 sm:p-9">
            <div className="flex items-end justify-between gap-4">
              <h2 className="headline text-3xl text-slate-100 sm:text-4xl">
                Latest Writing
              </h2>
              <a
                href={substack.publicationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="primary-link text-sm font-semibold"
              >
                Visit Substack
              </a>
            </div>

            <div className="mt-5 space-y-4">
              {isLoadingPosts && (
                <p className="text-sm text-slate-400">Loading recent posts...</p>
              )}
              {!isLoadingPosts && latestPosts.length === 0 && (
                <p className="text-sm text-slate-400">
                  More posts are coming soon. Visit my Substack for the latest
                  writing.
                </p>
              )}
              {latestPosts.map((post) => (
                <article
                  key={post.link}
                  className="shell-strong rounded-2xl p-5"
                >
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                    <h3 className="text-lg font-semibold text-slate-100">
                      <a
                        href={post.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="primary-link"
                      >
                        {post.title}
                      </a>
                    </h3>
                    <span className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                      {formatPublishedDate(post.publishedAt)}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">
                    {post.summary}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <aside className="shell rounded-3xl p-7 sm:p-9">
            <h2 className="headline text-3xl text-slate-100">About</h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-300">
              I lead AI initiatives from problem framing to rollout, with a focus
              on measurable impact, governance, and workflow adoption.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-slate-300">
              Background across consulting, startup, and trading environments,
              delivering hands-on systems in enterprise settings.
            </p>

            <div className="mt-6">
              <p className="eyebrow">Previously At</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {companies.map((company) => (
                  <a
                    key={company.name}
                    href={company.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="chip rounded-full px-3 py-1.5 text-sm transition hover:border-cyan-300"
                  >
                    {company.name}
                  </a>
                ))}
              </div>
            </div>

            <div className="mt-7 border-t border-[var(--line)] pt-6">
              <p className="eyebrow">Contact</p>
              <p className="mt-2 text-sm text-slate-300">
                eugene [dot] t [dot] cho [at] gmail [dot] com
              </p>
            </div>
          </aside>
        </section>

        <section className="shell mt-10 rounded-3xl p-7 sm:p-10">
          <h2 className="headline text-3xl text-slate-100 sm:text-4xl">
            Recommended Reads
          </h2>
          <div className="mt-5 space-y-4">
            {substack.curatedPosts.map((post) => (
              <article key={post.link} className="shell-strong rounded-2xl p-5">
                <h3 className="text-lg font-semibold text-slate-100">
                  <a
                    href={post.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="primary-link"
                  >
                    {post.title}
                  </a>
                </h3>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                  {post.author}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  {post.note}
                </p>
              </article>
            ))}
          </div>
        </section>
      </main>

      {activeProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8">
          <button
            type="button"
            aria-label="Close project details"
            onClick={() => setActiveProject(null)}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            className="shell-strong relative z-10 w-full max-w-2xl rounded-3xl p-7 sm:p-9"
          >
            <p className="eyebrow">Featured Project</p>
            <h3
              id="project-modal-title"
              className="headline mt-2 text-3xl text-slate-100"
            >
              {activeProject.title}
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-slate-300 sm:text-base">
              {activeProject.summary}
            </p>
            <ul className="mt-5 space-y-2 text-sm leading-relaxed text-slate-300">
              {activeProject.details.map((detail) => (
                <li key={detail} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-cyan-300" />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
            <div className="mt-5 flex flex-wrap gap-2">
              {activeProject.stack.map((item) => (
                <span key={item} className="chip rounded-full px-2.5 py-1 text-xs">
                  {item}
                </span>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setActiveProject(null)}
              className="chip mt-7 rounded-full px-4 py-2 text-sm font-semibold transition hover:border-cyan-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
