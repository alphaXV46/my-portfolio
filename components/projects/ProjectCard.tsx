import Link from "next/link";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import { Project } from "@/schemas/project.schema";

interface ProjectCardProps {
  project: Project;
}

// Icon GitHub native SVG
function GithubIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="group relative flex flex-col justify-between p-6 rounded-google border border-g-subtle bg-g-bg-surface hover:border-g-blue/50 transition-all duration-200 hover:shadow-google-hover">
      <div>
        {/* Header Card: Category Badge & Stats */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-g-blue bg-g-blue/10 px-2.5 py-1 rounded-pill">
            {project.category}
          </span>
          {project.stats && (
            <span className="text-xs font-medium text-g-green bg-g-green/10 px-2.5 py-0.5 rounded-pill border border-g-green/20">
              {project.stats}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-g-text-main group-hover:text-g-blue transition-colors line-clamp-1">
          <Link href={`/projects/${project.slug}`} className="flex items-center gap-1">
            {project.title}
            <ArrowUpRight className="w-4 h-4 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-1 transition-all" />
          </Link>
        </h3>

        {/* Summary Description */}
        <p className="mt-2 text-sm text-g-text-muted leading-relaxed line-clamp-2">
          {project.summary}
        </p>

        {/* Tech Stack Pills */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-medium px-2.5 py-1 rounded-pill bg-g-bg-secondary text-g-text-muted border border-g-subtle/60"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Footer Links */}
      <div className="mt-6 pt-4 border-t border-g-subtle/50 flex items-center justify-between">
        <span className="text-xs text-g-text-muted">
          {new Date(project.publishedAt).toLocaleDateString("id-ID", {
            month: "short",
            year: "numeric",
          })}
        </span>

        <div className="flex items-center gap-2">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub Repository"
              className="p-1.5 rounded-full text-g-text-muted hover:text-g-text-main hover:bg-g-bg-secondary transition-colors"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="Live Demo"
              className="p-1.5 rounded-full text-g-text-muted hover:text-g-blue hover:bg-g-bg-secondary transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}