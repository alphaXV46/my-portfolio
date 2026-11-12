"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Home,
  User,
  FolderKanban,
  Mail,
  ArrowUpRight,
} from "lucide-react";
import { useUIStore } from "@/stores/useUIStore";

const navItems = [
  { label: "Home", href: "/", icon: Home },
  { label: "About", href: "/#about", icon: User },
  { label: "Projects", href: "/projects", icon: FolderKanban },
];

export function MobileNavDrawer() {
  const pathname = usePathname();
  const { isMobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useUIStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Tutup drawer otomatis saat berpindah halaman
  useEffect(() => {
    closeMobileMenu();
  }, [pathname, closeMobileMenu]);

  // Kunci scroll halaman belakang & dengarkan tombol Escape saat drawer terbuka
  useEffect(() => {
    if (!isMobileMenuOpen) return;

    document.body.style.overflow = "hidden";
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMobileMenu();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMobileMenuOpen, closeMobileMenu]);

  const drawerContent = (
    <div
      className={`fixed inset-0 z-50 md:hidden transition-visibility duration-300 ${
        isMobileMenuOpen ? "visible" : "invisible pointer-events-none"
      }`}
      aria-hidden={!isMobileMenuOpen}
    >
      {/* Backdrop Gelap */}
      <div
        onClick={closeMobileMenu}
        className={`fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity duration-300 ${
          isMobileMenuOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Panel Slide-Over Kanan */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation"
        className={`fixed top-0 right-0 bottom-0 w-72 max-w-[82vw] bg-g-bg-surface border-l border-g-subtle shadow-2xl flex flex-col justify-between p-5 transition-transform duration-300 ease-out ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div>
          {/* Header Drawer */}
          <div className="flex items-center justify-between pb-4 border-b border-g-subtle">
            <span className="text-xl font-black tracking-tight select-none">
              <span className="text-g-blue">P</span>
              <span className="text-g-red">o</span>
              <span className="text-g-yellow">r</span>
              <span className="text-g-blue">t</span>
              <span className="text-g-green">f</span>
              <span className="text-g-red">o</span>
              <span className="text-g-yellow">l</span>
              <span className="text-g-blue">i</span>
              <span className="text-g-green">o</span>
              <span className="text-g-red ml-0.5">.</span>
            </span>

            <button
              type="button"
              onClick={closeMobileMenu}
              aria-label="Tutup menu navigasi"
              className="p-2 rounded-full text-g-text-muted hover:text-g-text-main hover:bg-g-bg-secondary transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Daftar Menu Navigasi */}
          <nav className="mt-5 flex flex-col gap-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : item.href.startsWith("/#")
                  ? false
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMobileMenu}
                  className={`flex items-center gap-3 px-4 py-3 rounded-pill text-sm font-semibold transition-colors ${
                    isActive
                      ? "bg-g-blue/10 text-g-blue"
                      : "text-g-text-muted hover:text-g-text-main hover:bg-g-bg-secondary"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* CTA Contact */}
          <div className="mt-6 pt-5 border-t border-g-subtle">
            <Link
              href="/contact"
              onClick={closeMobileMenu}
              className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-pill bg-g-blue hover:bg-g-blue-hover text-white text-sm font-bold transition-all shadow-google active:scale-95"
            >
              <Mail className="w-4 h-4" />
              Contact Me
            </Link>
          </div>
        </div>

        {/* Footer Drawer */}
        <div className="pt-4 border-t border-g-subtle flex items-center justify-between text-xs text-g-text-muted">
          <span>Gerald Portfolio</span>
          <a
            href="https://github.com/alphaXV46"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 font-semibold text-g-text-main hover:text-g-blue transition-colors"
          >
            GitHub
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </aside>
    </div>
  );

  return (
    <>
      {/* Tombol Hamburger (Hanya muncul di layar mobile < md) */}
      <button
        type="button"
        onClick={toggleMobileMenu}
        aria-label="Buka menu navigasi"
        aria-expanded={isMobileMenuOpen}
        className="md:hidden p-2 rounded-full border border-g-subtle bg-g-bg-surface text-g-text-main hover:bg-g-bg-secondary transition-colors"
      >
        <Menu className="w-5 h-5" />
      </button>

      {mounted && createPortal(drawerContent, document.body)}
    </>
  );
}