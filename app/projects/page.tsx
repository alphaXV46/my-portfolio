import { Metadata } from "next";
import { projectsData } from "@/data/projects";
import { ProjectCatalog } from "@/components/projects/ProjectCatalog";

export const metadata: Metadata = {
  title: "Projects | Personal Portfolio",
  description: "Daftar studi kasus rekayasa perangkat lunak, sistem backend, dan aplikasi web.",
};

export default function ProjectsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      {/* Page Title ala Google Clean Style */}
      <div className="mb-10 text-center sm:text-left">
        <h1 className="text-3xl sm:text-4xl font-black text-g-text-main tracking-tight">
          Featured Projects
        </h1>
        <p className="text-sm sm:text-base text-g-text-muted mt-2 max-w-2xl">
          Eksplorasi teknis dan arsitektur perangkat lunak yang pernah saya bangun, mulai dari backend engine berlatensi rendah hingga web interaktif modern.
        </p>
      </div>

      <ProjectCatalog initialProjects={projectsData} />
    </div>
  );
}