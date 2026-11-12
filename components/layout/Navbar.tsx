import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { MobileNavDrawer } from "./MobileNavDrawer";

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

        {/* Desktop Nav Links */}
        <div className="flex items-center gap-2 sm:gap-3">
          <nav className="hidden md:flex items-center gap-2">
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
          </nav>

          <div className="md:ml-1 md:pl-3 md:border-l md:border-g-subtle flex items-center gap-2">
            <ThemeToggle />
            <MobileNavDrawer />
          </div>
        </div>

      </div>
    </header>
  );
}