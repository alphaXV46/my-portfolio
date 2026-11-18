import { Suspense } from "react";
import Link from "next/link";
import { ArrowRight, Code2, Cpu, Database, Layers } from "lucide-react";
import { fetchAllProjects } from "@/services/project.service";
import { ProjectCard } from "@/components/projects/ProjectCard";

async function FeaturedProjectsSection() {
  const allProjects = await fetchAllProjects();
  const featuredProjects = allProjects.filter((p) => p.featured);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {featuredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      <div className="pt-2 flex justify-center">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-pill border border-g-subtle bg-g-bg-surface hover:bg-g-bg-secondary text-sm font-bold text-g-text-main transition-colors"
        >
          Lihat semua projek ({allProjects.length})
          <ArrowRight className="w-4 h-4 text-g-blue" />
        </Link>
      </div>
    </div>
  );
}

function FeaturedProjectsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-pulse">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="h-64 rounded-google border border-g-subtle bg-g-bg-secondary/60"
        />
      ))}
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-20">
      {/* Hero Section */}
      <section className="max-w-3xl space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-pill border border-g-subtle bg-g-bg-surface text-xs font-semibold text-g-text-muted">
          <span className="w-2 h-2 rounded-full bg-g-green animate-pulse" />
          Software & Web Developer
        </div>

        <h1 className="text-4xl sm:text-5xl font-black text-g-text-main tracking-tight leading-tight">
          Membangun sistem web, desktop, dan API yang{" "}
          <span className="text-g-blue">terstruktur</span> &{" "}
          <span className="text-g-green">scalable</span>.
        </h1>

        <p className="text-base sm:text-lg text-g-text-muted leading-relaxed">
          Halo, saya Gerald. Fokus merancang arsitektur aplikasi full-stack
          menggunakan Next.js, TypeScript, Laravel, Express, dan sistem database
          relasional maupun in-memory cache.
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-pill bg-g-blue hover:bg-g-blue-hover text-white text-sm font-bold transition-all shadow-google active:scale-95"
          >
            Eksplorasi Projects
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-pill border border-g-subtle bg-g-bg-surface hover:bg-g-bg-secondary text-g-text-main text-sm font-bold transition-colors"
          >
            Hubungi Saya
          </Link>
        </div>
      </section>

      {/* About & Core Capabilities */}
      <section id="about" className="scroll-mt-24 space-y-6">
        <div>
          <h2 className="text-2xl font-black text-g-text-main tracking-tight">
            Core Engineering Focus
          </h2>
          <p className="text-sm text-g-text-muted mt-1">
            Pendekatan arsitektur yang diterapkan di setiap pengembangan sistem.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-google border border-g-subtle bg-g-bg-surface space-y-2.5">
            <Code2 className="w-5 h-5 text-g-blue" />
            <h3 className="font-bold text-sm text-g-text-main">
              Modern Frontend
            </h3>
            <p className="text-xs text-g-text-muted leading-relaxed">
              Next.js App Router, React, TypeScript, Tailwind CSS, dan Zustand.
            </p>
          </div>

          <div className="p-5 rounded-google border border-g-subtle bg-g-bg-surface space-y-2.5">
            <Layers className="w-5 h-5 text-g-red" />
            <h3 className="font-bold text-sm text-g-text-main">
              Decoupled Backend
            </h3>
            <p className="text-xs text-g-text-muted leading-relaxed">
              REST API dengan Node.js, Express, Laravel, serta validasi skema Zod.
            </p>
          </div>

          <div className="p-5 rounded-google border border-g-subtle bg-g-bg-surface space-y-2.5">
            <Database className="w-5 h-5 text-g-yellow" />
            <h3 className="font-bold text-sm text-g-text-main">
              Data & Caching
            </h3>
            <p className="text-xs text-g-text-muted leading-relaxed">
              MySQL, SQL Server, Drizzle ORM, serta akselerasi kueri dengan Redis.
            </p>
          </div>

          <div className="p-5 rounded-google border border-g-subtle bg-g-bg-surface space-y-2.5">
            <Cpu className="w-5 h-5 text-g-green" />
            <h3 className="font-bold text-sm text-g-text-main">
              Desktop & Integration
            </h3>
            <p className="text-xs text-g-text-muted leading-relaxed">
              Aplikasi C# .NET WPF, integrasi payment gateway, dan hardware scanner.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-black text-g-text-main tracking-tight">
            Featured Projects
          </h2>
          <p className="text-sm text-g-text-muted mt-1">
            Sistem pilihan yang dirancang dari tahap analisis hingga implementasi.
          </p>
        </div>

        <Suspense fallback={<FeaturedProjectsSkeleton />}>
          <FeaturedProjectsSection />
        </Suspense>
      </section>
    </div>
  );
}