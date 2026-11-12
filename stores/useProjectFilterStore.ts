import { create } from "zustand";
import { ProjectCategory } from "@/schemas/project.schema";

interface ProjectFilterState {
  searchQuery: string;
  selectedCategory: ProjectCategory;
  selectedTag: string | null;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: ProjectCategory) => void;
  setSelectedTag: (tag: string | null) => void;
  resetFilters: () => void;
}

export const useProjectFilterStore = create<ProjectFilterState>((set) => ({
  searchQuery: "",
  selectedCategory: "all",
  selectedTag: null,
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setSelectedCategory: (selectedCategory) => set({ selectedCategory, selectedTag: null }),
  setSelectedTag: (tag) =>
    set((state) => ({ selectedTag: state.selectedTag === tag ? null : tag })),
  resetFilters: () => set({ searchQuery: "", selectedCategory: "all", selectedTag: null }),
}));