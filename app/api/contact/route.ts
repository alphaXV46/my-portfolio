import { NextResponse } from "next/server";
import { ContactFormSchema } from "@/schemas/contact.schema";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validasi data di level server dengan Zod
    const validationResult = ContactFormSchema.safeParse(body);

    if (!validationResult.success) {
      // Ambil error mapping dari Zod
      const issues = validationResult.error.flatten().fieldErrors;
      return NextResponse.json(
        { success: false, errors: issues },
        { status: 422 }
      );
    }

    const validData = validationResult.data;

    // Log data yang berhasil divalidasi ke konsol server
    console.log("[CONTACT_FORM_SUBMISSION]:", validData);

    // Di sini kamu bisa menyambungkannya ke email provider (Resend, Nodemailer, dll)
    return NextResponse.json(
      {
        success: true,
        message: "Pesan Anda berhasil diterima. Terima kasih sudah menghubungi!",
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan server saat memproses data." },
      { status: 500 }
    );
  }
}