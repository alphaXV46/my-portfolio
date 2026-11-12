"use client";

import { useMemo } from "react";
import { Project } from "@/schemas/project.schema";
import { useProjectFilterStore } from "@/stores/useProjectFilterStore";
import { ProjectCard } from "./ProjectCard";
import { ProjectFilter } from "./ProjectFilter";
import { AlertCircle } from "lucide-react";

interface ProjectCatalogProps {
  initialProjects: Project[];
}

export function ProjectCatalog({ initialProjects }: ProjectCatalogProps) {
  const { searchQuery, selectedCategory } = useProjectFilterStore();

  const filteredProjects = useMemo(() => {
    return initialProjects.filter((project) => {
      // 1. Filter Kategori
      const matchCategory =
        selectedCategory === "all" || project.category === selectedCategory;

      // 2. Filter Search Query
      const query = searchQuery.toLowerCase().trim();
      const matchSearch =
        query === "" ||
        project.title.toLowerCase().includes(query) ||
        project.summary.toLowerCase().includes(query) ||
        project.tags.some((tag) => tag.toLowerCase().includes(query));

      return matchCategory && matchSearch;
    });
  }, [initialProjects, searchQuery, selectedCategory]);

  return (
    <div className="w-full">
      <ProjectFilter />

      {filteredProjects.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 text-center border border-dashed border-g-subtle rounded-google bg-g-bg-surface">
          <AlertCircle className="w-8 h-8 text-g-yellow mb-3" />
          <p className="text-sm font-semibold text-g-text-main">
            Tidak ada projek yang sesuai
          </p>
          <p className="text-xs text-g-text-muted mt-1">
            Coba ubah kata kunci pencarian atau ganti kategori filter.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}