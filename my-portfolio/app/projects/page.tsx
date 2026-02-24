import Link from "next/link";
import { featuredProjects } from "../data/siteContent";

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_right,_#e9eef5_0%,_#e5e0d7_52%,_#ddd5ca_100%)] text-zinc-900">
      <main className="mx-auto w-full max-w-5xl px-6 py-14 sm:px-10 sm:py-20">
        <header className="rounded-2xl border border-zinc-300/80 bg-[#f3efe8]/85 p-8 shadow-[0_10px_30px_-20px_rgba(0,0,0,0.55)] backdrop-blur-sm sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-700">
            Projects
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Project Showcase
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-zinc-700 sm:text-lg">
            Selected AI solutioning work with project context, implementation
            scope, and impact.
          </p>
          <Link
            href="/"
            className="mt-6 inline-block rounded-full border border-zinc-400/80 bg-[#ebe5da] px-4 py-2 text-sm font-medium text-zinc-700 transition hover:border-zinc-600 hover:text-zinc-900"
          >
            Back to home
          </Link>
        </header>

        <section className="mt-10 space-y-5">
          {featuredProjects.map((project) => (
            <article
              key={project.title}
              className="rounded-xl border border-zinc-300/85 bg-[#f2eee6]/85 p-6 shadow-[0_10px_24px_-22px_rgba(0,0,0,0.8)]"
            >
              <h2 className="text-xl font-semibold text-zinc-900">
                {project.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-zinc-700 sm:text-base">
                {project.summary}
              </p>

              <ul className="mt-4 space-y-2 text-sm leading-relaxed text-zinc-700">
                {project.details.map((detail) => (
                  <li key={detail} className="flex gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-amber-600" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>

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
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}
