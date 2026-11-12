import { Project, ProjectSchema } from "@/schemas/project.schema";

const rawProjects: Project[] = [
  {
    id: "proj-1",
    title: "Sports Competition & Tactical Scoring Engine",
    slug: "sports-scoring-engine",
    summary: "Sistem manajemen turnamen dan pencatatan skor real-time berlatensi rendah untuk operator lapangan.",
    description: "Aplikasi penunjang kompetisi olahraga dengan penanganan konkurensi tinggi, arsitektur REST API teroptimasi, dan antarmuka operator yang keyboard-friendly.",
    category: "backend",
    tags: ["Golang", "PostgreSQL", "REST API", "Docker"],
    featured: true,
    githubUrl: "https://github.com",
    stats: "Sub-50ms Response",
    publishedAt: "2026-07-15",
  },
  {
    id: "proj-2",
    title: "Race Photo Finish & Bib Tagging System",
    slug: "race-photo-finish",
    summary: "Platform visual tagging nomor peserta lari dan identifikasi hasil waktu finish beresolusi tinggi.",
    description: "Sistem otomasi integrasi kamera finish line dengan tagging nomor bib peserta, dilengkapi dashboard review juri dan verifikasi timestamp presisi.",
    category: "fullstack",
    tags: ["Next.js", "TypeScript", "Tailwind", "PostgreSQL"],
    featured: true,
    liveUrl: "https://example.com",
    stats: "Zero Drift Timer",
    publishedAt: "2025-07-20",
  },
  {
    id: "proj-3",
    title: "Daily Operational Reporting & Workforce Hub",
    slug: "workforce-reporting-hub",
    summary: "Platform pelaporan harian karyawan multi-cabang dengan attachment foto dan audit trail terpusat.",
    description: "Sistem manajemen operasional lapangan dengan skema database relasional ternormalisasi, filter sorting dinamis, serta proteksi file attachment.",
    category: "web",
    tags: ["TypeScript", "Tailwind CSS", "REST API", "Zod"],
    featured: false,
    githubUrl: "https://github.com",
    publishedAt: "2025-07-10",
  },
  {
    id: "proj-4",
    title: "Server Automation & Custom Penalty Domain",
    slug: "server-penalty-domain",
    summary: "Sistem otomasi regulasi server game berbasis script event, isolasi domain penalti, dan sinkronisasi status.",
    description: "Implementasi logika server custom dengan isolasi environment pemain penalti secara terisolasi, tracking histori pelanggaran, dan custom tab-list metric synchronization.",
    category: "tools",
    tags: ["PaperMC", "Skript Engine", "Event Architecture", "DevOps"],
    featured: false,
    stats: "20 TPS Stabilized",
    publishedAt: "2026-10-12",
  },
];

// Validasi runtime semua data menggunakan Zod
export const projectsData: Project[] = rawProjects.map((p) => ProjectSchema.parse(p));