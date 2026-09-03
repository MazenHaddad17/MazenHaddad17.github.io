import { useState, useEffect } from "react"
import ErrorBoundary from "./components/ErrorBoundary"
import Nav from "./components/Nav"
import Home from "./pages/Home"
import CaseStudy from "./pages/CaseStudy"

type Page = "home" | "case-study"

function getPageFromLocation(): Page {
  return window.location.hash === "#case-study" ? "case-study" : "home"
}

export default function App() {
  const [page, setPage] = useState<Page>(getPageFromLocation)

  useEffect(() => {
    const syncPageWithLocation = () => setPage(getPageFromLocation())
    window.addEventListener("popstate", syncPageWithLocation)
    window.addEventListener("hashchange", syncPageWithLocation)

    return () => {
      window.removeEventListener("popstate", syncPageWithLocation)
      window.removeEventListener("hashchange", syncPageWithLocation)
    }
  }, [])

  useEffect(() => {
    document.title =
      page === "case-study"
        ? "KPI Analytics Platform Case Study | Mazen Haddad"
        : "Mazen Haddad | Computer Science graduate"
  }, [page])

  const navigateTo = (p: Page) => {
    setPage(p)
    window.scrollTo({ top: 0 })
    window.history.pushState(null, "", p === "case-study" ? "#case-study" : "#")
    window.requestAnimationFrame(() =>
      document.getElementById("main-content")?.focus(),
    )
  }

  return (
    <ErrorBoundary>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-xl focus:font-semibold focus:text-sm focus:shadow-lg"
      >
        Skip to main content
      </a>
      <Nav page={page} navigateTo={navigateTo} />
      <main id="main-content" tabIndex={-1}>
        {page === "home" ? (
          <Home navigateTo={navigateTo} />
        ) : (
          <CaseStudy navigateTo={navigateTo} />
        )}
      </main>
    </ErrorBoundary>
  )
}
