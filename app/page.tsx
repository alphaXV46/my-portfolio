import Link from "next/link";
import {
  ArrowRight,
  Code2,
  Sparkles,
  Terminal,
  Database,
  Layers,
  Cpu,
  CheckCircle2,
} from "lucide-react";
import { projectsData } from "@/data/projects";
import { ProjectCard } from "@/components/projects/ProjectCard";

export default function HomePage() {
  const featuredProjects = projectsData.filter((p) => p.featured);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-24">
      
      {/* 1. HERO SECTION */}
      <section className="flex flex-col items-center text-center max-w-4xl mx-auto pt-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-pill border border-g-subtle bg-g-bg-surface text-xs font-semibold text-g-text-muted mb-8 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-g-green animate-pulse" />
          <span>Hi, I&apos;m Gerald — Full-Stack & Software Developer</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-g-text-main leading-[1.1] mb-6">
          Building practical, <br />
          <span className="text-g-blue">scalable</span> &{" "}
          <span className="text-g-red">intelligent</span> software.
        </h1>

        <p className="max-w-2xl text-base sm:text-lg text-g-text-muted leading-relaxed mb-10">
          Mengembangkan aplikasi web full-stack, sistem desktop terintegrasi, 
          hingga solusi berbasis AI yang berfokus pada efisiensi operasional dan keandalan data.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3.5">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-pill bg-g-blue hover:bg-g-blue-hover text-white text-sm font-bold transition-all shadow-google hover:shadow-google-hover active:scale-95"
          >
            <Code2 className="w-4 h-4" />
            Lihat Semua Projek
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

      {/* 2. CORE COMPETENCIES (Kurasi 4 Pilar Utama) */}
      <section className="space-y-6">
        <div className="text-center sm:text-left">
          <h2 className="text-2xl sm:text-3xl font-black text-g-text-main tracking-tight">
            Core Competencies
          </h2>
          <p className="text-sm text-g-text-muted mt-1">
            Teknologi inti yang saya gunakan untuk merancang solusi dari sisi antarmuka hingga infrastruktur data.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1 - Blue: Full-Stack Web */}
          <div className="p-6 rounded-google border border-g-subtle bg-g-bg-surface hover:border-g-blue transition-colors group">
            <div className="w-10 h-10 rounded-full bg-g-blue/10 flex items-center justify-center text-g-blue mb-4 group-hover:scale-110 transition-transform">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-g-text-main mb-2">Full-Stack Web</h3>
            <p className="text-xs text-g-text-muted leading-relaxed">
              Next.js, React, TypeScript, Laravel, Livewire, Alpine.js, dan Tailwind CSS.
            </p>
          </div>

          {/* Card 2 - Red: Backend & Databases */}
          <div className="p-6 rounded-google border border-g-subtle bg-g-bg-surface hover:border-g-red transition-colors group">
            <div className="w-10 h-10 rounded-full bg-g-red/10 flex items-center justify-center text-g-red mb-4 group-hover:scale-110 transition-transform">
              <Database className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-g-text-main mb-2">Backend & Data</h3>
            <p className="text-xs text-g-text-muted leading-relaxed">
              PHP, Node.js, REST API, MySQL, SQL Server, SQLite, serta pelaporan Excel & PDF.
            </p>
          </div>

          {/* Card 3 - Yellow: Desktop & Systems */}
          <div className="p-6 rounded-google border border-g-subtle bg-g-bg-surface hover:border-g-yellow transition-colors group">
            <div className="w-10 h-10 rounded-full bg-g-yellow/10 flex items-center justify-center text-g-yellow mb-4 group-hover:scale-110 transition-transform">
              <Terminal className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-g-text-main mb-2">Desktop & Hardware</h3>
            <p className="text-xs text-g-text-muted leading-relaxed">
              C# (.NET Framework), WPF (XAML), SQL Triggers, dan integrasi Barcode/QR Scanner.
            </p>
          </div>

          {/* Card 4 - Green: AI & Integrations */}
          <div className="p-6 rounded-google border border-g-subtle bg-g-bg-surface hover:border-g-green transition-colors group">
            <div className="w-10 h-10 rounded-full bg-g-green/10 flex items-center justify-center text-g-green mb-4 group-hover:scale-110 transition-transform">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-g-text-main mb-2">AI & 3rd-Party API</h3>
            <p className="text-xs text-g-text-muted leading-relaxed">
              Gemini API, AI Chatbot, Prompt Engineering, Midtrans Payment, dan Google OAuth.
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
              Beberapa sistem web, desktop, dan aplikasi terintegrasi yang pernah saya bangun.
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      {/* 4. ABOUT / ENGINEERING APPROACH */}
      <section id="about" className="p-8 sm:p-12 rounded-google border border-g-subtle bg-g-bg-surface space-y-6">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-g-yellow" />
          <h2 className="text-xl sm:text-2xl font-black text-g-text-main tracking-tight">
            About & Engineering Focus
          </h2>
        </div>

        <p className="text-sm sm:text-base text-g-text-muted leading-relaxed max-w-3xl">
          Saya terbiasa membangun solusi lintas platform—mulai dari aplikasi bisnis berbasis Laravel 
          dan antarmuka modern Next.js, hingga sistem desktop C# WPF yang terhubung langsung dengan 
          perangkat keras dan basis data relasional. Fokus utama saya adalah memastikan sistem mudah 
          digunakan oleh operator sekaligus rapi di level arsitektur kode.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-g-subtle/60">
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-g-green flex-shrink-0 mt-0.5" />
            <div className="text-xs">
              <strong className="block text-g-text-main font-bold">End-to-End Integration</strong>
              <span className="text-g-text-muted">Menghubungkan payment gateway, AI, dan API eksternal secara mulus.</span>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-g-blue flex-shrink-0 mt-0.5" />
            <div className="text-xs">
              <strong className="block text-g-text-main font-bold">Clean & Type-Safe</strong>
              <span className="text-g-text-muted">Arsitektur modular dengan validasi data ketat di setiap lapisan.</span>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-g-red flex-shrink-0 mt-0.5" />
            <div className="text-xs">
              <strong className="block text-g-text-main font-bold">Operational Efficiency</strong>
              <span className="text-g-text-muted">Otomasi alur kerja, pemindaian barcode, dan pelaporan instan.</span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. BOTTOM CTA BANNER */}
      <section className="p-8 sm:p-12 rounded-google bg-gradient-to-br from-g-blue/10 via-g-bg-surface to-g-bg-secondary border border-g-blue/20 text-center flex flex-col items-center">
        <h2 className="text-2xl sm:text-3xl font-black text-g-text-main tracking-tight">
          Tertarik berdiskusi atau berkolaborasi?
        </h2>
        <p className="max-w-xl text-xs sm:text-sm text-g-text-muted mt-3 mb-8 leading-relaxed">
          Terbuka untuk peluang pengembangan aplikasi web, sistem desktop, maupun integrasi API dan AI.
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