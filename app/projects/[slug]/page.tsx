import { Suspense } from "react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  ExternalLink,
  FolderKanban,
  Sparkles,
  Tag,
} from "lucide-react";
import { fetchProjectBySlug } from "@/services/project.service";

interface ProjectDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await fetchProjectBySlug(slug);

  if (!project) {
    return { title: "Project Not Found | Gerald Portfolio" };
  }

  return {
    title: `${project.title} | Gerald Portfolio`,
    description: project.summary,
  };
}

async function ProjectDetailContent({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await fetchProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      {/* Header Studi Kasus */}
      <header className="p-6 sm:p-8 rounded-google border border-g-subtle bg-g-bg-surface shadow-google space-y-5">
        <div className="flex flex-wrap items-center gap-2.5 text-xs font-semibold">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-pill bg-g-blue/10 text-g-blue uppercase tracking-wider">
            <FolderKanban className="w-3.5 h-3.5" />
            {project.category}
          </span>

          {project.stats && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-pill bg-g-green/10 text-g-green">
              <Sparkles className="w-3.5 h-3.5" />
              {project.stats}
            </span>
          )}

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-pill bg-g-bg-secondary text-g-text-muted">
            <Calendar className="w-3.5 h-3.5" />
            {project.publishedAt}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-g-text-main tracking-tight">
          {project.title}
        </h1>

        <p className="text-base sm:text-lg text-g-text-muted leading-relaxed">
          {project.summary}
        </p>

        {(project.githubUrl || project.liveUrl) && (
          <div className="pt-2 flex flex-wrap items-center gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-pill bg-g-blue hover:bg-g-blue-hover text-white text-sm font-bold transition-all shadow-google active:scale-95"
              >
                <ExternalLink className="w-4 h-4" />
                Live Demo
              </a>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-pill border border-g-subtle bg-g-bg-surface hover:bg-g-bg-secondary text-g-text-main text-sm font-bold transition-colors"
              >
                <svg
                  className="w-4 h-4 fill-current"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  />
                </svg>
                Source Code
              </a>
            )}
          </div>
        )}
      </header>

      {/* Konten Deskripsi & Tech Stack */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <section className="md:col-span-2 p-6 sm:p-8 rounded-google border border-g-subtle bg-g-bg-surface space-y-4">
          <h2 className="text-lg font-bold text-g-text-main">
            Overview & Arsitektur Sistem
          </h2>
          <p className="text-sm sm:text-base text-g-text-muted leading-relaxed whitespace-pre-line">
            {project.description}
          </p>
        </section>

        <aside className="p-6 rounded-google border border-g-subtle bg-g-bg-surface space-y-4 h-fit">
          <div className="flex items-center gap-2 text-sm font-bold text-g-text-main">
            <Tag className="w-4 h-4 text-g-blue" />
            <span>Tech Stack</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1.5 rounded-pill text-xs font-semibold bg-g-bg-secondary text-g-text-main border border-g-subtle"
              >
                {tag}
              </span>
            ))}
          </div>
        </aside>
      </div>
    </>
  );
}

export default function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-8">
      <div>
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-pill text-sm font-semibold text-g-text-muted hover:text-g-text-main hover:bg-g-bg-secondary border border-g-subtle transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Projects
        </Link>
      </div>

      <Suspense
        fallback={
          <div className="h-96 rounded-google border border-g-subtle bg-g-bg-secondary/60 animate-pulse" />
        }
      >
        <ProjectDetailContent params={params} />
      </Suspense>
    </article>
  );
}