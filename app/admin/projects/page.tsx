import { Suspense } from "react";
import Link from "next/link";
import { ArrowLeft, Database } from "lucide-react";
import { fetchAllProjects } from "@/services/project.service";
import { ProjectAdminManager } from "@/components/admin/ProjectAdminManager";

async function AdminProjectsSection() {
    const projects = await fetchAllProjects();
    return <ProjectAdminManager initialProjects={projects} />;
}

export default function AdminProjectsPage() {
    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-pill bg-g-blue/10 text-g-blue text-xs font-bold mb-2">
                        <Database className="w-3.5 h-3.5" />
                        Local Express + MySQL CMS
                    </div>
                    <h1 className="text-3xl font-black text-g-text-main tracking-tight">
                        Manage Portfolio Projects
                    </h1>
                    <p className="text-sm text-g-text-muted mt-1">
                        Tambah, perbarui, atau hapus data projek yang tersimpan di database lokal.
                    </p>
                </div>

                <Link
                    href="/projects"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-pill border border-g-subtle bg-g-bg-surface hover:bg-g-bg-secondary text-sm font-semibold text-g-text-main transition-colors w-fit"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Lihat Halaman Publik
                </Link>
            </div>

            <Suspense
                fallback={
                    <div className="h-96 rounded-google border border-g-subtle bg-g-bg-secondary/60 animate-pulse" />
                }
            >
                <AdminProjectsSection />
            </Suspense>
        </div>
    );
}