import { z } from "zod";

export const ContactFormSchema = z.object({
  name: z
    .string()
    .min(2, "Nama minimal terdiri dari 2 karakter")
    .max(50, "Nama maksimal 50 karakter"),
  email: z
    .string()
    .email("Format alamat email tidak valid"),
  subject: z
    .string()
    .min(3, "Subjek minimal terdiri dari 3 karakter")
    .max(100, "Subjek maksimal 100 karakter"),
  message: z
    .string()
    .min(10, "Pesan minimal 10 karakter agar konteksnya jelas")
    .max(1000, "Pesan tidak boleh melebihi 1000 karakter"),
});

export type ContactFormData = z.infer<typeof ContactFormSchema>;