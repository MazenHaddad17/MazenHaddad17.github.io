import { useState, useEffect, useRef } from "react"
import { SITE } from "../config/site"
import { useActiveSection } from "../hooks/useScrollReveal"

interface NavProps {
  page: "home" | "case-study"
  navigateTo: (p: "home" | "case-study") => void
}

const NAV_LINKS = [
  { label: "About", id: "about" },
  { label: "Projects", id: "work" },
  { label: "Experience", id: "experience" },
  { label: "Skills", id: "skills" },
  { label: "Contact", id: "contact" },
]

export default function Nav({ page, navigateTo }: NavProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const active = useActiveSection(
    NAV_LINKS.map((l) => l.id),
    page === "home",
  )

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)")
    const closeMenuOnDesktop = () => {
      if (mediaQuery.matches) setMenuOpen(false)
    }

    mediaQuery.addEventListener("change", closeMenuOnDesktop)
    return () => mediaQuery.removeEventListener("change", closeMenuOnDesktop)
  }, [])

  useEffect(() => {
    if (!menuOpen) return

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false)
        return
      }

      if (event.key !== "Tab") return

      const focusableElements = menuRef.current?.querySelectorAll<HTMLElement>(
        "a[href], button:not([disabled])",
      )
      if (!focusableElements?.length) {
        event.preventDefault()
        return
      }

      const firstFocusable = focusableElements[0]
      const lastFocusable = focusableElements[focusableElements.length - 1]
      if (event.shiftKey && document.activeElement === firstFocusable) {
        event.preventDefault()
        lastFocusable.focus()
      } else if (!event.shiftKey && document.activeElement === lastFocusable) {
        event.preventDefault()
        firstFocusable.focus()
      }
    }

    document.body.style.overflow = "hidden"
    document.addEventListener("keydown", closeOnEscape)
    menuRef.current?.querySelector<HTMLElement>("button, a[href]")?.focus()

    return () => {
      document.body.style.overflow = ""
      document.removeEventListener("keydown", closeOnEscape)
      menuButtonRef.current?.focus()
    }
  }, [menuOpen])

  const scrollTo = (id: string) => {
    if (page !== "home") {
      navigateTo("home")
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
      }, 100)
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    }
    setMenuOpen(false)
  }

  return (
    <>
      <header
        role="banner"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/92 backdrop-blur-md shadow-sm border-b border-[rgba(23,63,95,0.14)]"
            : "bg-white/80 backdrop-blur-sm"
        }`}
        style={{ backdropFilter: "blur(12px)" }}
      >
        <nav
          className="max-w-300 mx-auto px-5 sm:px-8 h-16 flex items-center justify-between"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <button
            onClick={() =>
              page === "home"
                ? window.scrollTo({ top: 0, behavior: "smooth" })
                : navigateTo("home")
            }
            className="flex items-center gap-3 group focus-visible:outline-none"
            aria-label="Mazen Haddad – home"
          >
            <div className="w-9 h-9 rounded-xl bg-[#2563EB] flex items-center justify-center text-white font-bold text-sm font-heading shrink-0 group-hover:bg-[#1E40AF] transition-colors duration-200">
              MH
            </div>
            <span className="font-heading font-700 text-[#172033] text-sm hidden sm:block">
              Mazen Haddad
            </span>
          </button>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`relative px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-lg ${
                  active === link.id && page === "home"
                    ? "text-[#2563EB]"
                    : "text-[#4B5B70] hover:text-[#172033]"
                }`}
                aria-current={
                  active === link.id && page === "home" ? "page" : undefined
                }
              >
                {link.label}
                {active === link.id && page === "home" && (
                  <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#2563EB] rounded-full" />
                )}
              </button>
            ))}
          </div>

          {/* Right actions */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={SITE.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="text-[#4B5B70] hover:text-[#172033] transition-colors duration-200 p-2 rounded-lg hover:bg-[#F7FAFC]"
            >
              <GitHubIcon />
            </a>
            <a
              href={SITE.linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="text-[#4B5B70] hover:text-[#2563EB] transition-colors duration-200 p-2 rounded-lg hover:bg-[#D7E8F7]"
            >
              <LinkedInIcon />
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            ref={menuButtonRef}
            className="md:hidden p-2 rounded-lg text-[#4B5B70] hover:text-[#172033] hover:bg-[#F7FAFC] transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
          >
            {menuOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </nav>
      </header>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div
          ref={menuRef}
          id="mobile-navigation"
          className="fixed inset-0 z-60 bg-white/95 backdrop-blur-md md:hidden flex flex-col pt-20"
          role="dialog"
          aria-label="Mobile navigation"
          aria-modal="true"
          tabIndex={-1}
        >
          <nav className="flex flex-col gap-1 px-6 py-4">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-left px-4 py-3.5 text-lg font-medium text-[#102A43] hover:text-[#2563EB] hover:bg-blue-light-legacy rounded-xl transition-colors duration-150"
              >
                {link.label}
              </button>
            ))}
          </nav>
          <div className="px-6 mt-4 flex flex-col gap-3">
            <div className="flex gap-3">
              <a
                href={SITE.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3.5 border border-[#D9E2EC] rounded-xl text-[#486581] text-sm font-medium hover:border-[#102A43] hover:text-[#102A43]"
              >
                <GitHubIcon /> GitHub
              </a>
              <a
                href={SITE.linkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3.5 border border-[#D9E2EC] rounded-xl text-[#486581] text-sm font-medium hover:border-[#2563EB] hover:text-[#2563EB]"
              >
                <LinkedInIcon /> LinkedIn
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

function GitHubIcon() {
  return (
    <svg
      className="w-5 h-5"
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
        clipRule="evenodd"
      />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg
      className="w-5 h-5"
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}
