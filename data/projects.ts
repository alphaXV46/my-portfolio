import { Project, ProjectSchema } from "@/schemas/project.schema";

const rawProjects: Project[] = [
  {
    id: "proj-1",
    title: "DefaCraftStore",
    slug: "defacraftstore",
    summary:
      "Platform e-commerce kerajinan dengan integrasi pembayaran Midtrans, kalkulasi ongkir RajaOngkir, peta interaktif, dan asisten belanja berbasis Gemini AI.",
    description:
      "Aplikasi e-commerce full-stack yang dibangun menggunakan PHP 8.4 dan Laravel 13. Mendukung autentikasi cepat via Google OAuth (Laravel Socialite), pemetaan lokasi dengan Leaflet JS, otomasi ongkos kirim RajaOngkir, gerbang pembayaran Midtrans, serta integrasi Gemini AI Chatbot untuk membantu pelanggan memilih produk.",
    category: "fullstack",
    tags: ["Laravel 13", "PHP 8.4", "MySQL", "Midtrans", "Gemini AI"],
    featured: true,
    githubUrl: "https://github.com/alphaXV46",
    stats: "AI & Payment Ready",
    publishedAt: "2026-08-15",
  },
  {
    id: "proj-2",
    title: "Niaga Distribution System",
    slug: "niaga-distribution-system",
    summary:
      "Sistem manajemen distribusi dan inventaris reaktif dengan pemrosesan laporan otomatis ke format Excel dan PDF.",
    description:
      "Aplikasi operasional distribusi berbasis Laravel 13, Livewire 4, dan Alpine.js untuk interaksi antarmuka real-time tanpa reload halaman. Dilengkapi manajemen hak akses menggunakan Laravel Breeze serta modul ekspor dokumen dan pelaporan transaksi via Laravel Excel dan DomPDF.",
    category: "fullstack",
    tags: ["Laravel 13", "Livewire 4", "Alpine.js", "Tailwind CSS", "MySQL"],
    featured: true,
    githubUrl: "https://github.com/alphaXV46",
    stats: "Reactive Reporting",
    publishedAt: "2026-06-20",
  },
  {
    id: "proj-3",
    title: "StockBridge",
    slug: "stockbridge",
    summary:
      "Aplikasi desktop manajemen stok dan alur approval dengan sinkronisasi hybrid SQLite–SQL Server, REST API internal, serta pemindai Barcode & QR.",
    description:
      "Solusi manajemen gudang berbasis C# (.NET Framework) dan WPF (XAML). Menggabungkan penyimpanan lokal SQLite dengan sinkronisasi terpusat ke SQL Server menggunakan SQL Triggers, dilengkapi embedded REST API (HttpListener), alur persetujuan (approval workflow), serta integrasi langsung dengan perangkat Barcode & QR Scanner.",
    category: "desktop",
    tags: ["C# .NET", "WPF (XAML)", "SQL Server", "SQLite", "REST API"],
    featured: true,
    githubUrl: "https://github.com/alphaXV46",
    stats: "Hybrid DB & Scanner",
    publishedAt: "2026-04-10",
  },
  {
    id: "proj-4",
    title: "Personal Portfolio Website",
    slug: "personal-portfolio",
    summary:
      "Web portofolio arsitektur Modular Monolith dengan validasi runtime end-to-end, filter state global, dan sinkronisasi tema SSR tanpa kedipan.",
    description:
      "Dikembangkan menggunakan Next.js 16 App Router, TypeScript, dan Tailwind CSS v4 dengan estetika antarmuka ala Google Workspace. Menggunakan Zustand untuk manajemen filter katalog, Cookie untuk persistensi dark/light mode yang aman dari FOUC, serta skema Zod untuk validasi data pada sisi klien maupun server.",
    category: "web",
    tags: ["Next.js 16", "TypeScript", "Tailwind v4", "Zustand", "Zod"],
    featured: true,
    githubUrl: "https://github.com/alphaXV46/my-portfolio",
    liveUrl: "https://geraldportfolio-ivory.vercel.app",
    stats: "Type-Safe Architecture",
    publishedAt: "2026-11-12",
  },
  {
    id: "proj-5",
    title: "Bunker 72",
    slug: "bunker-72",
    summary:
      "Aplikasi web interaktif berbasis narasi bercabang (JSON Branching Engine) dengan arsitektur Custom MVC dan efek audio dinamis.",
    description:
      "Dibangun menggunakan JavaScript (ES6+) murni dan Vite 5 dengan pola arsitektur Custom MVC tanpa ketergantungan framework berat. Memanfaatkan JSON Branching Engine untuk alur cerita dinamis, Web Audio API untuk efek suara imersif, dan LocalStorage API untuk menyimpan progres pengguna.",
    category: "web",
    tags: ["JavaScript ES6+", "Vite 5", "Custom MVC", "Web Audio API"],
    featured: false,
    githubUrl: "https://github.com/alphaXV46/bunker-72",
    stats: "Custom MVC Engine",
    publishedAt: "2025-11-05",
  },
  {
    id: "proj-6",
    title: "False Note",
    slug: "false-note",
    summary:
      "Aplikasi web interaktif berbasis HTML5 Canvas dan Web Audio API dengan server HTTP ringan berbasis Node.js.",
    description:
      "Eksplorasi pemrosesan grafis 2D dan sintesis audio di browser menggunakan HTML5 Canvas, Web Audio API, dan JavaScript (ES6+). Antarmuka ditata dengan Tailwind CSS dan disajikan melalui custom HTTP server berbasis Node.js dengan penyimpanan state lokal via LocalStorage.",
    category: "web",
    tags: ["JavaScript ES6+", "HTML5 Canvas", "Tailwind CSS", "Node.js"],
    featured: false,
    githubUrl: "https://github.com/alphaXV46",
    stats: "Canvas & Web Audio",
    publishedAt: "2025-09-18",
  },
];

export const projectsData: Project[] = rawProjects.map((p) => ProjectSchema.parse(p));