import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-g-bg-surface/90 backdrop-blur-md border-b border-g-subtle transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        
        {/* Brand Logo Google Style (Thick & Solid) */}
        <Link 
          href="/" 
          className="text-2xl font-black tracking-tight select-none hover:opacity-90 transition-opacity"
        >
          <span className="text-g-blue">P</span>
          <span className="text-g-red">o</span>
          <span className="text-g-yellow">r</span>
          <span className="text-g-blue">t</span>
          <span className="text-g-green">f</span>
          <span className="text-g-red">o</span>
          <span className="text-g-yellow">l</span>
          <span className="text-g-blue">i</span>
          <span className="text-g-green">o</span>
          <span className="text-g-red text-xl ml-0.5">.</span>
        </Link>

        {/* Nav Links Khas Google Workspace */}
        <nav className="flex items-center gap-1.5 sm:gap-3">
          <Link
            href="/#about"
            className="px-3.5 py-2 text-sm font-semibold rounded-pill text-g-text-muted hover:text-g-text-main hover:bg-g-bg-secondary transition-colors"
          >
            About
          </Link>
          <Link
            href="/projects"
            className="px-3.5 py-2 text-sm font-semibold rounded-pill text-g-text-muted hover:text-g-text-main hover:bg-g-bg-secondary transition-colors"
          >
            Projects
          </Link>
          <Link
            href="/contact"
            className="px-5 py-2 text-sm font-bold rounded-pill bg-g-blue hover:bg-g-blue-hover text-white transition-all shadow-google hover:shadow-google-hover active:scale-95"
          >
            Contact
          </Link>

          <div className="ml-1 pl-2 border-l border-g-subtle flex items-center">
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>
  );
}