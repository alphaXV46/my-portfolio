import type { Metadata } from "next";
import { THEME_COOKIE_NAME } from "@/lib/cookies";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Personal Portfolio",
  description: "Software engineering portfolio built with Next.js and TypeScript",
};

// Script inline yang dieksekusi sebelum DOM selesai render (mencegah kedipan FOUC)
const themeScript = `
  (function() {
    try {
      const match = document.cookie.match(new RegExp('(^| )' + '${THEME_COOKIE_NAME}' + '=([^;]+)'));
      const theme = match ? match[2] : null;
      if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch (e) {}
  })();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}