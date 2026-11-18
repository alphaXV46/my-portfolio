import { Suspense } from "react";
import { fetchAllProjects } from "@/services/project.service";
import { ProjectCatalog } from "@/components/projects/ProjectCatalog";

async function ProjectsListSection() {
  const projects = await fetchAllProjects();
  return <ProjectCatalog initialProjects={projects} />;
}

function ProjectsSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-12 max-w-xl mx-auto rounded-pill bg-g-bg-secondary/60" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-64 rounded-google border border-g-subtle bg-g-bg-secondary/60"
          />
        ))}
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 space-y-8">
      <div>
        <h1 className="text-3xl sm:text-4xl font-black text-g-text-main tracking-tight">
          Projects Archive
        </h1>
        <p className="text-sm text-g-text-muted mt-2">
          Eksplorasi studi kasus sistem web, desktop, dan integrasi API yang pernah dibangun.
        </p>
      </div>

      <Suspense fallback={<ProjectsSkeleton />}>
        <ProjectsListSection />
      </Suspense>
    </div>
  );
}