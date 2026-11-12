"use client";

import { useEffect, useState } from "react";

export function Footer() {
  const [year, setYear] = useState(2026);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="w-full border-t border-g-subtle bg-g-bg-secondary transition-colors mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-g-text-muted">
        <div className="flex items-center gap-4">
          <span>Indonesia</span>
          <span className="inline-block w-1 h-1 rounded-full bg-g-subtle" />
          <span>Next.js + TypeScript + Tailwind</span>
        </div>
        <p>© {year} Gerald. All rights reserved.</p>
      </div>
    </footer>
  );
}