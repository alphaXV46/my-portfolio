import { z } from "zod";
import { Project, ProjectSchema } from "@/schemas/project.schema";
import { projectsData } from "@/data/projects";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export type ProjectPayload = Omit<Project, "id">;

export async function fetchAllProjects(): Promise<Project[]> {
    try {
        const res = await fetch(`${API_BASE_URL}/api/projects`, {
            cache: "no-store",
        });

        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        const json = await res.json();
        return z.array(ProjectSchema).parse(json.data);
    } catch (error) {
        console.warn("[API Fallback]: Menggunakan data lokal karena Express API tidak terjangkau.", error);
        return projectsData;
    }
}

export async function fetchProjectBySlug(slug: string): Promise<Project | undefined> {
    try {
        const res = await fetch(`${API_BASE_URL}/api/projects/${slug}`, {
            cache: "no-store",
        });

        if (res.status === 404) return undefined;
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        const json = await res.json();
        return ProjectSchema.parse(json.data);
    } catch (error) {
        console.warn(`[API Fallback]: Mengambil detail '${slug}' dari data lokal.`, error);
        return projectsData.find((p) => p.slug === slug);
    }
}

export async function createProject(payload: ProjectPayload) {
    const res = await fetch(`${API_BASE_URL}/api/projects`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });

    const json = await res.json();
    if (!res.ok) {
        throw new Error(json.message || "Validasi gagal saat menambah projek");
    }
    return json;
}

export async function updateProject(id: string, payload: Partial<ProjectPayload>) {
    const res = await fetch(`${API_BASE_URL}/api/projects/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });

    const json = await res.json();
    if (!res.ok) {
        throw new Error(json.message || "Gagal memperbarui projek");
    }
    return json;
}

export async function deleteProject(id: string) {
    const res = await fetch(`${API_BASE_URL}/api/projects/${id}`, {
        method: "DELETE",
    });

    const json = await res.json();
    if (!res.ok) {
        throw new Error(json.message || "Gagal menghapus projek");
    }
    return json;
}