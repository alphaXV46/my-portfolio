import Link from "next/link";
import { 
  ArrowRight, 
  Code2, 
  Sparkles, 
  Terminal, 
  Database, 
  Layers, 
  Cpu, 
  CheckCircle2 
} from "lucide-react";
import { projectsData } from "@/data/projects";
import { ProjectCard } from "@/components/projects/ProjectCard";

export default function HomePage() {
  // Ambil hanya projek yang ditandai featured = true
  const featuredProjects = projectsData.filter((p) => p.featured);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-24">
      
      {/* 1. HERO SECTION */}
      <section className="flex flex-col items-center text-center max-w-4xl mx-auto pt-6">
        {/* Availability Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-pill border border-g-subtle bg-g-bg-surface text-xs font-semibold text-g-text-muted mb-8 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-g-green animate-pulse" />
          <span>Available for Engineering Projects & Collaboration</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-g-text-main leading-[1.1] mb-6">
          Designing functional, <br />
          <span className="text-g-blue">scalable</span> &{" "}
          <span className="text-g-red">resilient</span> systems.
        </h1>

        <p className="max-w-2xl text-base sm:text-lg text-g-text-muted leading-relaxed mb-10">
          Software Engineer dengan fokus pada arsitektur backend berlatensi rendah, 
          normalisasi skema database, dan antarmuka web modern yang cepat dan type-safe.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3.5">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-pill bg-g-blue hover:bg-g-blue-hover text-white text-sm font-bold transition-all shadow-google hover:shadow-google-hover active:scale-95"
          >
            <Code2 className="w-4 h-4" />
            Eksplorasi Projek
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-pill border border-g-subtle bg-g-bg-surface hover:bg-g-bg-secondary text-g-text-main text-sm font-semibold transition-all hover:border-g-blue/40"
          >
            Hubungi Saya
            <ArrowRight className="w-4 h-4 text-g-text-muted" />
          </Link>
        </div>
      </section>

      {/* 2. CORE COMPETENCIES MATRIX (Aksen 4 Warna Google) */}
      <section className="space-y-6">
        <div className="text-center sm:text-left">
          <h2 className="text-2xl sm:text-3xl font-black text-g-text-main tracking-tight">
            Core Competencies
          </h2>
          <p className="text-sm text-g-text-muted mt-1">
            Fondasi teknis dan fokus domain yang saya terapkan dalam membangun aplikasi.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1 - Blue: Frontend & Interface */}
          <div className="p-6 rounded-google border border-g-subtle bg-g-bg-surface hover:border-g-blue transition-colors group">
            <div className="w-10 h-10 rounded-full bg-g-blue/10 flex items-center justify-center text-g-blue mb-4 group-hover:scale-110 transition-transform">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-g-text-main mb-2">Frontend & UX</h3>
            <p className="text-xs text-g-text-muted leading-relaxed">
              Next.js App Router, TypeScript, Tailwind CSS, serta state management modular (Zustand).
            </p>
          </div>

          {/* Card 2 - Red: Backend & APIs */}
          <div className="p-6 rounded-google border border-g-subtle bg-g-bg-surface hover:border-g-red transition-colors group">
            <div className="w-10 h-10 rounded-full bg-g-red/10 flex items-center justify-center text-g-red mb-4 group-hover:scale-110 transition-transform">
              <Terminal className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-g-text-main mb-2">Backend Services</h3>
            <p className="text-xs text-g-text-muted leading-relaxed">
              RESTful APIs, konkurensi (Golang), validasi runtime ketat (Zod), dan service decoupled.
            </p>
          </div>

          {/* Card 3 - Yellow: Data & Persistence */}
          <div className="p-6 rounded-google border border-g-subtle bg-g-bg-surface hover:border-g-yellow transition-colors group">
            <div className="w-10 h-10 rounded-full bg-g-yellow/10 flex items-center justify-center text-g-yellow mb-4 group-hover:scale-110 transition-transform">
              <Database className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-g-text-main mb-2">Data Architecture</h3>
            <p className="text-xs text-g-text-muted leading-relaxed">
              PostgreSQL, normalisasi skema relasional, optimasi kueri indeks, dan integritas transaksi data.
            </p>
          </div>

          {/* Card 4 - Green: Automation & Systems */}
          <div className="p-6 rounded-google border border-g-subtle bg-g-bg-surface hover:border-g-green transition-colors group">
            <div className="w-10 h-10 rounded-full bg-g-green/10 flex items-center justify-center text-g-green mb-4 group-hover:scale-110 transition-transform">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-g-text-main mb-2">System Automation</h3>
            <p className="text-xs text-g-text-muted leading-relaxed">
              Event-driven scripting, isolasi environment runtime, monitoring log, dan Docker containerization.
            </p>
          </div>
        </div>
      </section>

      {/* 3. FEATURED PROJECTS SECTION */}
      <section className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-g-blue bg-g-blue/10 px-3 py-1 rounded-pill">
              Studi Kasus
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-g-text-main tracking-tight mt-2">
              Featured Projects
            </h2>
            <p className="text-sm text-g-text-muted mt-1">
              Beberapa implementasi sistem nyata dengan performa terukur.
            </p>
          </div>
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-g-blue hover:text-g-blue-hover transition-colors group"
          >
            Lihat semua projek ({projectsData.length})
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Featured Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      {/* 4. ABOUT / ENGINEERING PHILOSOPHY */}
      <section id="about" className="p-8 sm:p-12 rounded-google border border-g-subtle bg-g-bg-surface space-y-6">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-g-yellow" />
          <h2 className="text-xl sm:text-2xl font-black text-g-text-main tracking-tight">
            Engineering Approach
          </h2>
        </div>

        <p className="text-sm sm:text-base text-g-text-muted leading-relaxed max-w-3xl">
          Saya percaya perangkat lunak yang hebat tidak dibangun dari sekadar tren, melainkan dari 
          pemahaman mendalam terhadap kebutuhan fungsional pengguna, struktur data yang ternormalisasi dengan baik, 
          dan antarmuka operator yang ergonomis tanpa latensi berlebih.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-g-subtle/60">
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-g-green flex-shrink-0 mt-0.5" />
            <div className="text-xs">
              <strong className="block text-g-text-main font-bold">Strict Type Safety</strong>
              <span className="text-g-text-muted">Mencegah runtime failure lewat inferensi TypeScript dan Zod.</span>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-g-blue flex-shrink-0 mt-0.5" />
            <div className="text-xs">
              <strong className="block text-g-text-main font-bold">Performance First</strong>
              <span className="text-g-text-muted">Pemanfaatan React Server Components untuk zero JS bundle overhead.</span>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-g-red flex-shrink-0 mt-0.5" />
            <div className="text-xs">
              <strong className="block text-g-text-main font-bold">Operator-Centric</strong>
              <span className="text-g-text-muted">Tampilan responsif dan intuitif untuk alur kerja pengguna intensif.</span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. BOTTOM CTA BANNER */}
      <section className="p-8 sm:p-12 rounded-google bg-gradient-to-br from-g-blue/10 via-g-bg-surface to-g-bg-secondary border border-g-blue/20 text-center flex flex-col items-center">
        <h2 className="text-2xl sm:text-3xl font-black text-g-text-main tracking-tight">
          Tertarik untuk mendiskusikan projek atau ide teknis?
        </h2>
        <p className="max-w-xl text-xs sm:text-sm text-g-text-muted mt-3 mb-8 leading-relaxed">
          Pintu selalu terbuka untuk diskusi seputar perancangan sistem, optimasi backend, 
          atau kolaborasi engineering lainnya.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-pill bg-g-blue hover:bg-g-blue-hover text-white text-sm font-bold transition-all shadow-google hover:shadow-google-hover active:scale-95"
        >
          Mulai Percakapan
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>

    </div>
  );
}