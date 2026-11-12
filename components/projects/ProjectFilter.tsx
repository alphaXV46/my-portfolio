"use client";

import { Search, X } from "lucide-react";
import { useProjectFilterStore } from "@/stores/useProjectFilterStore";
import { ProjectCategory } from "@/schemas/project.schema";

const categories: { label: string; value: ProjectCategory }[] = [
  { label: "Semua", value: "all" },
  { label: "Fullstack", value: "fullstack" },
  { label: "Web & Interactive", value: "web" },
  { label: "Desktop & System", value: "desktop" },
];

export function ProjectFilter() {
  const {
    searchQuery,
    selectedCategory,
    setSearchQuery,
    setSelectedCategory,
    resetFilters,
  } = useProjectFilterStore();

  const isFiltered = searchQuery !== "" || selectedCategory !== "all";

  return (
    <div className="w-full flex flex-col gap-5 items-center mb-10">
      {/* Search Input ala Google Pill Search Bar */}
      <div className="relative w-full max-w-xl">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-g-text-muted" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Cari teknologi, judul, atau kata kunci..."
          className="w-full pl-11 pr-10 py-3 text-sm bg-g-bg-surface border border-g-subtle rounded-google shadow-sm placeholder:text-g-text-muted/70 focus:outline-none focus:border-g-blue focus:ring-1 focus:ring-g-blue transition-all"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-g-text-muted hover:text-g-text-main"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Category Pills Tab */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.value;
          return (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-4 py-1.5 text-xs font-semibold rounded-pill transition-all ${
                isActive
                  ? "bg-g-blue text-white shadow-sm"
                  : "bg-g-bg-surface border border-g-subtle text-g-text-muted hover:text-g-text-main hover:bg-g-bg-secondary"
              }`}
            >
              {cat.label}
            </button>
          );
        })}

        {isFiltered && (
          <button
            onClick={resetFilters}
            className="text-xs font-medium text-g-red hover:underline ml-2"
          >
            Reset filter
          </button>
        )}
      </div>
    </div>
  );
}