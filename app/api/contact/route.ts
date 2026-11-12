import { NextResponse } from "next/server";
import { Resend } from "resend";
import { ContactFormSchema } from "@/schemas/contact.schema";

// Helper sanitasi karakter HTML untuk keamanan template email
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // 1. Validasi payload di level server menggunakan Zod
    const validationResult = ContactFormSchema.safeParse(body);

    if (!validationResult.success) {
      const issues = validationResult.error.flatten().fieldErrors;
      return NextResponse.json(
        { success: false, errors: issues },
        { status: 422 }
      );
    }

    const { name, email, subject, message } = validationResult.data;

    // 2. Pastikan environment variable tersedia
    const apiKey = process.env.RESEND_API_KEY;
    const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL;

    if (!apiKey || !receiverEmail) {
      console.error("[CONTACT_API_ERROR]: RESEND_API_KEY atau CONTACT_RECEIVER_EMAIL belum diatur.");
      return NextResponse.json(
        { success: false, message: "Konfigurasi layanan email server belum lengkap." },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);

    // 3. Kirim email melalui Resend API
    const { error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: [receiverEmail],
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      text: `Pesan baru dari ${name} (${email}):\n\n${message}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e5e7eb; border-radius: 16px;">
          <h2 style="margin: 0 0 16px; color: #1a73e8; font-size: 20px;">Pesan Baru dari Portofolio</h2>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px;">
            <tr>
              <td style="padding: 8px 0; color: #5f6368; width: 90px;"><strong>Pengirim</strong></td>
              <td style="padding: 8px 0; color: #202124;">${escapeHtml(name)}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #5f6368;"><strong>Email</strong></td>
              <td style="padding: 8px 0; color: #202124;">
                <a href="mailto:${escapeHtml(email)}" style="color: #1a73e8; text-decoration: none;">${escapeHtml(email)}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #5f6368;"><strong>Subjek</strong></td>
              <td style="padding: 8px 0; color: #202124;">${escapeHtml(subject)}</td>
            </tr>
          </table>
          <div style="padding: 16px; background-color: #f8f9fa; border-radius: 12px; color: #202124; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${escapeHtml(message)}</div>
        </div>
      `,
    });

    if (error) {
      console.error("[RESEND_DELIVERY_ERROR]:", error);
      return NextResponse.json(
        { success: false, message: "Gagal mengirim email. Silakan coba beberapa saat lagi." },
        { status: 502 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Pesan berhasil terkirim ke inbox! Terima kasih sudah menghubungi.",
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan internal saat memproses permintaan." },
      { status: 500 }
    );
  }
}