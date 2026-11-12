import { z } from "zod";

export const ProjectCategoryEnum = z.enum([
  "all",
  "fullstack",
  "web",
  "desktop",
]);

export type ProjectCategory = z.infer<typeof ProjectCategoryEnum>;

export const ProjectSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "Judul wajib diisi"),
  slug: z.string().min(1, "Slug wajib diisi"),
  summary: z.string().min(10, "Ringkasan terlalu pendek"),
  description: z.string(),
  category: z.enum(["fullstack", "web", "desktop"]),
  tags: z.array(z.string()).nonempty("Minimal satu tag diperlukan"),
  featured: z.boolean().default(false),
  githubUrl: z.string().url().optional(),
  liveUrl: z.string().url().optional(),
  stats: z.string().optional(),
  publishedAt: z.string(),
});

export type Project = z.infer<typeof ProjectSchema>;