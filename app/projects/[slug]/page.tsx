import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Calendar, Layers, Activity } from "lucide-react";
import { projectsData } from "@/data/projects";

// Flag Next.js 16 untuk menonaktifkan warning blocking URL data & batasi hanya slug terdaftar
export const instant = false;

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Icon GitHub native SVG
function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

// 1. Static Site Generation (SSG) untuk semua slug
export async function generateStaticParams() {
  return projectsData.map((project) => ({
    slug: project.slug,
  }));
}

// 2. Dynamic SEO Metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projectsData.find((p) => p.slug === slug);

  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: `${project.title} | Case Study`,
    description: project.summary,
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = projectsData.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      {/* Navigation Back */}
      <Link
        href="/projects"
        className="inline-flex items-center gap-2 text-xs font-semibold text-g-text-muted hover:text-g-blue transition-colors mb-8 group"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        Kembali ke Semua Projek
      </Link>

      {/* Header Studi Kasus */}
      <header className="mb-8">
        <div className="flex flex-wrap items-center gap-2.5 mb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-g-blue bg-g-blue/10 px-3 py-1 rounded-pill">
            {project.category}
          </span>
          {project.stats && (
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-g-green bg-g-green/10 px-3 py-1 rounded-pill border border-g-green/20">
              <Activity className="w-3.5 h-3.5" />
              {project.stats}
            </span>
          )}
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-g-text-main tracking-tight leading-tight">
          {project.title}
        </h1>

        <p className="mt-4 text-base sm:text-lg text-g-text-muted leading-relaxed">
          {project.summary}
        </p>

        {/* Action Links */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-pill border border-g-subtle bg-g-bg-surface hover:bg-g-bg-secondary text-g-text-main text-xs font-semibold transition-colors"
            >
              <GithubIcon className="w-4 h-4" />
              Repository Source
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2 rounded-pill bg-g-blue hover:bg-g-blue-hover text-white text-xs font-semibold transition-all shadow-google"
            >
              <ExternalLink className="w-4 h-4" />
              Buka Live Demo
            </a>
          )}
        </div>
      </header>

      {/* Meta Box Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 rounded-google border border-g-subtle bg-g-bg-surface mb-10 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-g-bg-secondary text-g-text-muted">
            <Calendar className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs text-g-text-muted">Waktu Rilis</p>
            <p className="text-sm font-semibold text-g-text-main">
              {new Date(project.publishedAt).toLocaleDateString("id-ID", {
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-g-bg-secondary text-g-text-muted">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs text-g-text-muted">Tech Stack Inti</p>
            <p className="text-sm font-semibold text-g-text-main">
              {project.tags.join(" • ")}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Body */}
      <article className="space-y-8 text-g-text-main leading-relaxed">
        <section className="p-6 sm:p-8 rounded-google border border-g-subtle bg-g-bg-surface">
          <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-g-blue" />
            Latar Belakang & Deskripsi
          </h2>
          <p className="text-sm sm:text-base text-g-text-muted leading-relaxed">
            {project.description}
          </p>
        </section>

        <section className="p-6 sm:p-8 rounded-google border border-g-subtle bg-g-bg-surface">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-g-green" />
            Teknologi yang Digunakan
          </h2>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3.5 py-1.5 text-xs font-semibold rounded-pill bg-g-bg-secondary border border-g-subtle text-g-text-main"
              >
                {tag}
              </span>
            ))}
          </div>
        </section>
      </article>
    </div>
  );
}