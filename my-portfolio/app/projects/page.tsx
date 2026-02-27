import Link from "next/link";
import { featuredProjects } from "../data/siteContent";

export default function ProjectsPage() {
  return (
    <div className="min-h-screen text-slate-100">
      <main className="mx-auto w-full max-w-6xl px-6 py-10 sm:px-10 sm:py-14">
        <header className="shell fade-up rounded-3xl p-8 sm:p-12">
          <p className="eyebrow">Project Showcase</p>
          <h1 className="headline mt-4 max-w-4xl text-4xl tracking-tight text-slate-100 sm:text-6xl">
            Selected AI systems with context, implementation, and measurable outcomes.
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-slate-300 sm:text-lg">
            These projects reflect practical AI delivery in enterprise settings,
            from workflow architecture through rollout planning.
          </p>
          <Link
            href="/"
            className="chip mt-7 inline-block rounded-full px-4 py-2 text-sm font-semibold transition hover:border-cyan-300"
          >
            Back to home
          </Link>
        </header>

        <section className="mt-8 grid gap-5">
          {featuredProjects.map((project, index) => (
            <article key={project.title} className="shell rounded-3xl p-6 sm:p-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="max-w-3xl">
                  <p className="eyebrow text-[0.66rem]">Project {index + 1}</p>
                  <h2 className="headline mt-2 text-3xl text-slate-100">
                    {project.title}
                  </h2>
                </div>
                <div className="flex flex-wrap gap-2 sm:max-w-xs sm:justify-end">
                  {project.stack.map((item) => (
                    <span key={item} className="chip rounded-full px-2.5 py-1 text-xs">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-slate-300 sm:text-base">
                {project.summary}
              </p>

              <ul className="mt-5 space-y-2.5 text-sm leading-relaxed text-slate-300 sm:text-base">
                {project.details.map((detail) => (
                  <li key={detail} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-cyan-300" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}
