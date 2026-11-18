"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    Plus,
    Pencil,
    Trash2,
    X,
    CheckCircle2,
    AlertCircle,
    Star,
    ExternalLink,
} from "lucide-react";
import { Project } from "@/schemas/project.schema";
import {
    createProject,
    updateProject,
    deleteProject,
    ProjectPayload,
} from "@/services/project.service";

interface ProjectAdminManagerProps {
    initialProjects: Project[];
}

const emptyForm = {
    title: "",
    slug: "",
    summary: "",
    description: "",
    category: "fullstack" as "fullstack" | "web" | "desktop",
    tagsInput: "",
    featured: false,
    githubUrl: "",
    liveUrl: "",
    stats: "",
    publishedAt: new Date().toISOString().split("T")[0],
};

export function ProjectAdminManager({ initialProjects }: ProjectAdminManagerProps) {
    const router = useRouter();
    const [projects, setProjects] = useState<Project[]>(initialProjects);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [form, setForm] = useState(emptyForm);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [feedback, setFeedback] = useState<{
        type: "success" | "error";
        message: string;
    } | null>(null);

    // Sinkronkan state lokal saat initialProjects diperbarui oleh router.refresh()
    if (initialProjects !== projects && !isSubmitting) {
        setProjects(initialProjects);
    }

    const handleTitleChange = (value: string) => {
        const autoSlug = value
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9\s-]/g, "")
            .replace(/\s+/g, "-");

        setForm((prev) => ({
            ...prev,
            title: value,
            slug: editingId ? prev.slug : autoSlug,
        }));
    };

    const handleEditClick = (project: Project) => {
        setEditingId(project.id);
        setFeedback(null);
        setForm({
            title: project.title,
            slug: project.slug,
            summary: project.summary,
            description: project.description,
            category: project.category,
            tagsInput: project.tags.join(", "),
            featured: project.featured,
            githubUrl: project.githubUrl || "",
            liveUrl: project.liveUrl || "",
            stats: project.stats || "",
            publishedAt: project.publishedAt,
        });
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setForm(emptyForm);
        setFeedback(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setFeedback(null);

        const parsedTags = form.tagsInput
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean);

        if (parsedTags.length === 0) {
            setFeedback({ type: "error", message: "Minimal masukkan 1 tag teknologi." });
            setIsSubmitting(false);
            return;
        }

        const payload: ProjectPayload = {
            title: form.title.trim(),
            slug: form.slug.trim(),
            summary: form.summary.trim(),
            description: form.description.trim(),
            category: form.category,
            tags: parsedTags as [string, ...string[]],
            featured: form.featured,
            githubUrl: form.githubUrl.trim() ? form.githubUrl.trim() : null,
            liveUrl: form.liveUrl.trim() ? form.liveUrl.trim() : null,
            stats: form.stats.trim() ? form.stats.trim() : null,
            publishedAt: form.publishedAt,
        };

        try {
            if (editingId) {
                await updateProject(editingId, payload);
                setFeedback({ type: "success", message: `Projek "${payload.title}" berhasil diperbarui.` });
            } else {
                await createProject(payload);
                setFeedback({ type: "success", message: `Projek "${payload.title}" berhasil ditambahkan ke MySQL.` });
            }

            setEditingId(null);
            setForm(emptyForm);
            router.refresh();
        } catch (err: unknown) {
            const error = err as Error;
            setFeedback({
                type: "error",
                message: error.message || "Terjadi kesalahan. Pastikan server Express berjalan.",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (project: Project) => {
        const confirmed = window.confirm(`Hapus permanen projek "${project.title}" dari database?`);
        if (!confirmed) return;

        setFeedback(null);
        try {
            await deleteProject(project.id);
            setFeedback({ type: "success", message: `Projek "${project.title}" berhasil dihapus.` });
            if (editingId === project.id) {
                handleCancelEdit();
            }
            router.refresh();
        } catch (err: unknown) {
            const error = err as Error;
            setFeedback({
                type: "error",
                message: error.message || "Gagal menghapus projek.",
            });
        }
    };

    return (
        <div className="space-y-10">
            {/* Banner Notifikasi */}
            {feedback && (
                <div
                    className={`flex items-center gap-3 p-4 rounded-google border text-sm font-medium ${feedback.type === "success"
                            ? "bg-g-green/10 border-g-green/30 text-g-green"
                            : "bg-g-red/10 border-g-red/30 text-g-red"
                        }`}
                >
                    {feedback.type === "success" ? (
                        <CheckCircle2 className="w-5 h-5 shrink-0" />
                    ) : (
                        <AlertCircle className="w-5 h-5 shrink-0" />
                    )}
                    <span>{feedback.message}</span>
                </div>
            )}

            {/* Form Tambah / Edit Projek */}
            <form
                onSubmit={handleSubmit}
                className="p-6 sm:p-8 rounded-google border border-g-subtle bg-g-bg-surface shadow-google space-y-5"
            >
                <div className="flex items-center justify-between border-b border-g-subtle pb-4">
                    <h2 className="text-lg font-bold text-g-text-main">
                        {editingId ? `Edit Projek (ID: ${editingId})` : "Tambah Projek Baru"}
                    </h2>

                    {editingId && (
                        <button
                            type="button"
                            onClick={handleCancelEdit}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-pill text-xs font-semibold bg-g-bg-secondary text-g-text-muted hover:text-g-text-main transition-colors"
                        >
                            <X className="w-3.5 h-3.5" />
                            Batal Edit
                        </button>
                    )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-g-text-main">Judul Projek *</label>
                        <input
                            type="text"
                            required
                            value={form.title}
                            onChange={(e) => handleTitleChange(e.target.value)}
                            placeholder="Contoh: Sistem Inventaris Gudang"
                            className="w-full px-4 py-2.5 rounded-xl border border-g-subtle bg-g-bg-secondary/50 text-sm text-g-text-main focus:outline-none focus:border-g-blue"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-g-text-main">Slug URL *</label>
                        <input
                            type="text"
                            required
                            value={form.slug}
                            onChange={(e) => setForm({ ...form, slug: e.target.value })}
                            placeholder="sistem-inventaris-gudang"
                            className="w-full px-4 py-2.5 rounded-xl border border-g-subtle bg-g-bg-secondary/50 text-sm text-g-text-main focus:outline-none focus:border-g-blue"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-g-text-main">Kategori *</label>
                        <select
                            value={form.category}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    category: e.target.value as "fullstack" | "web" | "desktop",
                                })
                            }
                            className="w-full px-4 py-2.5 rounded-xl border border-g-subtle bg-g-bg-secondary/50 text-sm text-g-text-main focus:outline-none focus:border-g-blue"
                        >
                            <option value="fullstack">Fullstack</option>
                            <option value="web">Web & Interactive</option>
                            <option value="desktop">Desktop & System</option>
                        </select>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-g-text-main">Tanggal Rilis *</label>
                        <input
                            type="date"
                            required
                            value={form.publishedAt}
                            onChange={(e) => setForm({ ...form, publishedAt: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-xl border border-g-subtle bg-g-bg-secondary/50 text-sm text-g-text-main focus:outline-none focus:border-g-blue"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-g-text-main">Badge Highlight (Opsional)</label>
                        <input
                            type="text"
                            value={form.stats}
                            onChange={(e) => setForm({ ...form, stats: e.target.value })}
                            placeholder="Contoh: AI & Payment Ready"
                            className="w-full px-4 py-2.5 rounded-xl border border-g-subtle bg-g-bg-secondary/50 text-sm text-g-text-main focus:outline-none focus:border-g-blue"
                        />
                    </div>
                </div>

                <div className="space-y-1.5">
                    <label className="text-xs font-bold text-g-text-main">
                        Tech Stack / Tags * <span className="font-normal text-g-text-muted">(pisahkan dengan koma)</span>
                    </label>
                    <input
                        type="text"
                        required
                        value={form.tagsInput}
                        onChange={(e) => setForm({ ...form, tagsInput: e.target.value })}
                        placeholder="Next.js 16, TypeScript, Express, Drizzle ORM, MySQL"
                        className="w-full px-4 py-2.5 rounded-xl border border-g-subtle bg-g-bg-secondary/50 text-sm text-g-text-main focus:outline-none focus:border-g-blue"
                    />
                </div>

                <div className="space-y-1.5">
                    <label className="text-xs font-bold text-g-text-main">Ringkasan Singkat (Minimal 10 karakter) *</label>
                    <textarea
                        rows={2}
                        required
                        minLength={10}
                        value={form.summary}
                        onChange={(e) => setForm({ ...form, summary: e.target.value })}
                        placeholder="Ringkasan yang tampil di kartu katalog projek..."
                        className="w-full px-4 py-2.5 rounded-xl border border-g-subtle bg-g-bg-secondary/50 text-sm text-g-text-main focus:outline-none focus:border-g-blue"
                    />
                </div>

                <div className="space-y-1.5">
                    <label className="text-xs font-bold text-g-text-main">Deskripsi Lengkap Studi Kasus *</label>
                    <textarea
                        rows={4}
                        required
                        minLength={10}
                        value={form.description}
                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                        placeholder="Penjelasan detail arsitektur, fitur utama, dan teknologi yang dipakai..."
                        className="w-full px-4 py-2.5 rounded-xl border border-g-subtle bg-g-bg-secondary/50 text-sm text-g-text-main focus:outline-none focus:border-g-blue"
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-g-text-main">GitHub URL (Opsional)</label>
                        <input
                            type="url"
                            value={form.githubUrl}
                            onChange={(e) => setForm({ ...form, githubUrl: e.target.value })}
                            placeholder="https://github.com/alphaXV46/..."
                            className="w-full px-4 py-2.5 rounded-xl border border-g-subtle bg-g-bg-secondary/50 text-sm text-g-text-main focus:outline-none focus:border-g-blue"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-g-text-main">Live Demo URL (Opsional)</label>
                        <input
                            type="url"
                            value={form.liveUrl}
                            onChange={(e) => setForm({ ...form, liveUrl: e.target.value })}
                            placeholder="https://..."
                            className="w-full px-4 py-2.5 rounded-xl border border-g-subtle bg-g-bg-secondary/50 text-sm text-g-text-main focus:outline-none focus:border-g-blue"
                        />
                    </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                    <label className="inline-flex items-center gap-2.5 cursor-pointer select-none">
                        <input
                            type="checkbox"
                            checked={form.featured}
                            onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                            className="w-4 h-4 rounded accent-g-blue"
                        />
                        <span className="text-sm font-semibold text-g-text-main">
                            Tampilkan di Featured Projects (Homepage)
                        </span>
                    </label>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-pill bg-g-blue hover:bg-g-blue-hover disabled:opacity-60 text-white text-sm font-bold transition-all shadow-google active:scale-95"
                    >
                        <Plus className="w-4 h-4" />
                        {isSubmitting
                            ? "Menyimpan..."
                            : editingId
                                ? "Simpan Perubahan"
                                : "Simpan Projek ke MySQL"}
                    </button>
                </div>
            </form>

            {/* Daftar Projek Tersimpan di Database */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-black text-g-text-main">
                        Daftar Projek Database ({projects.length})
                    </h2>
                </div>

                <div className="divide-y divide-g-subtle rounded-google border border-g-subtle bg-g-bg-surface overflow-hidden">
                    {projects.map((project) => (
                        <div
                            key={project.id}
                            className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-g-bg-secondary/40 transition-colors"
                        >
                            <div className="space-y-1">
                                <div className="flex flex-wrap items-center gap-2">
                                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-g-bg-secondary text-g-text-muted">
                                        #{project.id}
                                    </span>
                                    <h3 className="font-bold text-g-text-main">{project.title}</h3>
                                    <span className="text-[11px] font-bold uppercase px-2.5 py-0.5 rounded-pill bg-g-blue/10 text-g-blue">
                                        {project.category}
                                    </span>
                                    {project.featured && (
                                        <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-pill bg-g-yellow/15 text-g-yellow">
                                            <Star className="w-3 h-3 fill-current" />
                                            Featured
                                        </span>
                                    )}
                                </div>

                                <p className="text-xs text-g-text-muted line-clamp-1">
                                    {project.summary}
                                </p>

                                <div className="flex flex-wrap gap-1.5 pt-1">
                                    {project.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="text-[11px] px-2 py-0.5 rounded-md bg-g-bg-secondary text-g-text-muted"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                                <a
                                    href={`/projects/${project.slug}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    title="Lihat halaman publik"
                                    className="p-2 rounded-full border border-g-subtle text-g-text-muted hover:text-g-text-main hover:bg-g-bg-secondary transition-colors"
                                >
                                    <ExternalLink className="w-4 h-4" />
                                </a>

                                <button
                                    type="button"
                                    onClick={() => handleEditClick(project)}
                                    title="Edit projek"
                                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-pill border border-g-subtle text-xs font-bold text-g-text-main hover:bg-g-bg-secondary transition-colors"
                                >
                                    <Pencil className="w-3.5 h-3.5 text-g-blue" />
                                    Edit
                                </button>

                                <button
                                    type="button"
                                    onClick={() => handleDelete(project)}
                                    title="Hapus projek"
                                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-pill border border-g-red/20 bg-g-red/10 text-xs font-bold text-g-red hover:bg-g-red hover:text-white transition-colors"
                                >
                                    <Trash2 className="w-3.5 h-3.5" />
                                    Hapus
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}