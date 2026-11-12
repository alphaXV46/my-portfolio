import { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { Mail, MessageSquare, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact | Personal Portfolio",
  description: "Hubungi saya untuk diskusi teknis, peluang kolaborasi, atau pertanyaan seputar rekayasa perangkat lunak.",
};

export default function ContactPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Kolom Kiri: Penjelasan & Info Kontak */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-g-blue bg-g-blue/10 px-3 py-1 rounded-pill">
              Get in Touch
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-g-text-main tracking-tight mt-3">
              Mari Terhubung & Berdiskusi
            </h1>
            <p className="mt-3 text-sm sm:text-base text-g-text-muted leading-relaxed">
              Punya ide projek, ingin berdiskusi seputar arsitektur sistem, atau sekadar ingin menyapa? Silakan kirimkan pesan lewat formulir ini.
            </p>
          </div>

          <div className="space-y-4 pt-4 border-t border-g-subtle">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-full bg-g-bg-secondary text-g-blue border border-g-subtle">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs text-g-text-muted">Direct Email</p>
                <p className="text-sm font-semibold text-g-text-main">
                  hello@personalportfolio.dev
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-full bg-g-bg-secondary text-g-green border border-g-subtle">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs text-g-text-muted">Waktu Respons</p>
                <p className="text-sm font-semibold text-g-text-main">
                  Biasanya dalam 1-2 hari kerja
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-full bg-g-bg-secondary text-g-red border border-g-subtle">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs text-g-text-muted">Lokasi</p>
                <p className="text-sm font-semibold text-g-text-main">
                  Indonesia
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Kolom Kanan: Form Validasi Zod */}
        <div className="lg:col-span-7">
          <ContactForm />
        </div>

      </div>
    </div>
  );
}