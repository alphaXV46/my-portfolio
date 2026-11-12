"use client";

import { useState } from "react";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { ContactFormData, ContactFormSchema } from "@/schemas/contact.schema";

export function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Hapus pesan error field saat user mengetik ulang
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);

    // 1. Validasi Client-Side menggunakan Zod
    const validation = ContactFormSchema.safeParse(formData);

    if (!validation.success) {
      const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {};
      validation.error.issues.forEach((issue) => {
        const fieldName = issue.path[0] as keyof ContactFormData;
        if (!fieldErrors[fieldName]) {
          fieldErrors[fieldName] = issue.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    // 2. Kirim ke API Route jika validasi lolos
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        setStatusMessage({
          type: "error",
          text: result.message || "Gagal mengirim pesan. Silakan periksa kembali formulir.",
        });
        if (result.errors) {
          const serverFieldErrors: Partial<Record<keyof ContactFormData, string>> = {};
          for (const key in result.errors) {
            serverFieldErrors[key as keyof ContactFormData] = result.errors[key][0];
          }
          setErrors(serverFieldErrors);
        }
      } else {
        setStatusMessage({
          type: "success",
          text: result.message,
        });
        // Reset form
        setFormData({ name: "", email: "", subject: "", message: "" });
        setErrors({});
      }
    } catch {
      setStatusMessage({
        type: "error",
        text: "Koneksi bermasalah. Pastikan server lokal aktif.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="p-6 sm:p-8 rounded-google border border-g-subtle bg-g-bg-surface shadow-google space-y-5"
    >
      {/* Alert Banner */}
      {statusMessage && (
        <div
          className={`p-4 rounded-google text-xs sm:text-sm font-medium flex items-center gap-2.5 ${
            statusMessage.type === "success"
              ? "bg-g-green/10 text-g-green border border-g-green/20"
              : "bg-g-red/10 text-g-red border border-g-red/20"
          }`}
        >
          {statusMessage.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
          )}
          <span>{statusMessage.text}</span>
        </div>
      )}

      {/* Name & Email Field */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-xs font-semibold text-g-text-main mb-1.5">
            Nama Lengkap
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
            className={`w-full px-3.5 py-2.5 text-sm bg-g-bg-surface border rounded-google transition-all placeholder:text-g-text-muted/60 focus:outline-none focus:ring-1 ${
              errors.name
                ? "border-g-red focus:border-g-red focus:ring-g-red"
                : "border-g-subtle focus:border-g-blue focus:ring-g-blue"
            }`}
          />
          {errors.name && <p className="mt-1 text-xs text-g-red">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block text-xs font-semibold text-g-text-main mb-1.5">
            Alamat Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="johndoe@example.com"
            className={`w-full px-3.5 py-2.5 text-sm bg-g-bg-surface border rounded-google transition-all placeholder:text-g-text-muted/60 focus:outline-none focus:ring-1 ${
              errors.email
                ? "border-g-red focus:border-g-red focus:ring-g-red"
                : "border-g-subtle focus:border-g-blue focus:ring-g-blue"
            }`}
          />
          {errors.email && <p className="mt-1 text-xs text-g-red">{errors.email}</p>}
        </div>
      </div>

      {/* Subject Field */}
      <div>
        <label htmlFor="subject" className="block text-xs font-semibold text-g-text-main mb-1.5">
          Subjek Pesan
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          value={formData.subject}
          onChange={handleChange}
          placeholder="Kolaborasi Projek / Pertanyaan Teknis"
          className={`w-full px-3.5 py-2.5 text-sm bg-g-bg-surface border rounded-google transition-all placeholder:text-g-text-muted/60 focus:outline-none focus:ring-1 ${
            errors.subject
              ? "border-g-red focus:border-g-red focus:ring-g-red"
              : "border-g-subtle focus:border-g-blue focus:ring-g-blue"
          }`}
        />
        {errors.subject && <p className="mt-1 text-xs text-g-red">{errors.subject}</p>}
      </div>

      {/* Message Field */}
      <div>
        <label htmlFor="message" className="block text-xs font-semibold text-g-text-main mb-1.5">
          Pesan
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={formData.message}
          onChange={handleChange}
          placeholder="Tuliskan detail pesan atau pertanyaan Anda di sini..."
          className={`w-full px-3.5 py-2.5 text-sm bg-g-bg-surface border rounded-google transition-all placeholder:text-g-text-muted/60 focus:outline-none focus:ring-1 resize-y ${
            errors.message
              ? "border-g-red focus:border-g-red focus:ring-g-red"
              : "border-g-subtle focus:border-g-blue focus:ring-g-blue"
          }`}
        />
        {errors.message && <p className="mt-1 text-xs text-g-red">{errors.message}</p>}
      </div>

      {/* Submit Button Khas Google Workspace */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-pill bg-g-blue hover:bg-g-blue-hover text-white text-sm font-semibold transition-all shadow-google hover:shadow-google-hover disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Mengirimkan...
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            Kirim Pesan
          </>
        )}
      </button>
    </form>
  );
}