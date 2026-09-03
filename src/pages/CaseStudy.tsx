import { useEffect, useRef } from "react"
import { SITE } from "../config/site"
import { useScrollReveal } from "../hooks/useScrollReveal"
import architectureUrl from "../assets/architecture.png"
import kpiResultsPart1Url from "../assets/kpi_result_table_part1.png"
import kpiResultsPart2Url from "../assets/kpi_result_table_part2.png"

interface CaseStudyProps {
  navigateTo: (p: "home" | "case-study") => void
}

export default function CaseStudy({ navigateTo }: CaseStudyProps) {
  const progressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let animationFrame: number | null = null

    const updateProgress = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight
      const progress = total > 0 ? (window.scrollY / total) * 100 : 0
      progressRef.current?.style.setProperty("width", `${progress}%`)
      animationFrame = null
    }

    const onScroll = () => {
      if (animationFrame === null)
        animationFrame = window.requestAnimationFrame(updateProgress)
    }

    updateProgress()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      if (animationFrame !== null) window.cancelAnimationFrame(animationFrame)
    }
  }, [])

  return (
    <div className="bg-bg min-h-screen">
      {/* Reading progress bar */}
      <div ref={progressRef} id="reading-progress" aria-hidden="true" />

      {/* Case study header */}
      <div className="bg-surface-strong border-b border-border pt-24 pb-12">
        <div className="max-w-225 mx-auto px-5 sm:px-8">
          <button
            onClick={() => navigateTo("home")}
            className="flex items-center gap-2 text-sm text-ink-2 hover:text-primary mb-8 transition-colors font-medium group"
            aria-label="Back to portfolio homepage"
          >
            <svg
              className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to portfolio
          </button>

          <div className="flex flex-wrap gap-2 mb-4">
            <span className="chip chip-blue">Case Study</span>
            <span className="chip">Final-Year Internship</span>
            <span className="chip">Feb 2026 – May 2026</span>
          </div>

          <h1
            className="font-heading font-extrabold text-heading mb-4"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            Full-Stack KPI Analytics Platform
          </h1>
          <p className="text-ink-2 text-lg leading-relaxed mb-6 max-w-2xl">
            A centralized platform that replaced a manual Excel-based
            sales-reporting process at Tunisie Telecom with structured data
            ingestion, KPI calculation, dashboards, report exports, access
            control, and offline forecasting insights.
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href={SITE.projectRepositoryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 border border-border bg-surface-strong rounded-xl text-sm font-medium text-ink-2 hover:text-ink hover:border-primary-navy transition-all"
            >
              <GitHubIcon /> View GitHub Repository
            </a>
            <div className="flex items-center gap-2 px-4 py-2.5 bg-[#F0FDF4] border border-[#BBF7D0] rounded-xl">
              <span className="text-success font-bold text-sm">17.5/20</span>
              <span className="text-ink-2 text-sm">
                · Very Good · Final-year project
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-225 mx-auto px-5 sm:px-8 py-14 space-y-14">
        {/* Overview */}
        <CsSection title="Overview" label="Context">
          <div className="grid sm:grid-cols-2 gap-4">
            <InfoCard
              title="Organization"
              value="Tunisie Telecom"
              sub="Mannouba Regional Directorate"
              color="blue"
            />
            <InfoCard
              title="Duration"
              value="4 months"
              sub="February – May 2026"
              color="blue"
            />
            <InfoCard
              title="Role"
              value="Full-Stack Developer Intern"
              sub="Independent delivery with supervisor guidance"
              color="teal"
            />
            <InfoCard
              title="Final Grade"
              value="17.5 / 20"
              sub="Very Good · Jury recognized presentation quality"
              color="success"
            />
          </div>
          <p className="text-ink-2 leading-relaxed mt-6">
            During a four-month internship at the Mannouba Regional Directorate
            of Tunisie Telecom, I independently designed and implemented a
            complete KPI analytics platform. I covered the full
            delivery cycle: planning, architecture, data workflows, backend
            services, frontend interfaces, authentication, reporting,
            forecasting integration, testing, documentation, and final jury
            presentation.
          </p>
        </CsSection>

        {/* Challenge */}
        <CsSection title="Challenge" label="The problem">
          <div className="bg-[#FFF7F0] border border-[#FDDCB5] rounded-2xl p-6 mb-5">
            <h3 className="font-heading font-bold text-[#C2410C] text-lg mb-3">
              What was broken
            </h3>
            <p className="text-ink-2 leading-relaxed">
              Sales information was distributed across separate Excel files
              managed by different teams. KPI preparation required at least one
              day of manual work each period. The process was difficult to
              centralize, repeat, verify, or maintain — and there was no single
              place to compare performance across product groups or time
              periods.
            </p>
          </div>
          <div className="space-y-3">
            {[
              "Multiple Excel files per reporting period, inconsistent structure",
              "No automated deduplication or validation",
              "KPI calculation done manually each time",
              "No unified view of monthly, quarterly, or yearly results",
              "No access control — any update could overwrite previous work",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="text-[#C2410C] font-bold text-lg leading-tight shrink-0">
                  ✕
                </span>
                <span className="text-ink-2 text-sm leading-relaxed">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </CsSection>

        {/* Objectives */}
        <CsSection title="Objectives" label="What we set out to build">
          <div className="space-y-3">
            {[
              "Accept multi-file Excel uploads and validate their content automatically",
              "Detect and prevent duplicate data entries across uploads",
              "Extract periods, match product references, and store data in a relational database",
              "Calculate monthly, quarterly, and yearly KPIs per product group",
              "Display KPIs through an interactive dashboard with charting",
              "Export formatted Excel reports per period",
              "Control access with JWT authentication and role-based permissions",
              "Integrate offline forecasting insights without requiring an online AI service",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="text-[#2563EB] font-bold text-lg leading-tight shrink-0">
                  →
                </span>
                <span className="text-ink-2 text-sm leading-relaxed">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </CsSection>

        {/* My role */}
        <CsSection title="My Role" label="Personal contributions">
          <p className="text-ink-2 leading-relaxed mb-6">
            I was the sole developer on this project, working independently
            with regular check-ins and feedback from a supervisor. Every
            component of the platform — from initial architecture to final
            presentation — was planned, built, tested, and documented by me.
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              "Project planning and scope definition",
              "Application architecture design",
              "Django REST Framework backend",
              "React + TypeScript frontend",
              "MySQL database schema design",
              "Excel ingestion with Pandas and OpenPyXL",
              "Data validation logic",
              "KPI calculation engine",
              "JWT authentication system",
              "Role-based access control (Admin / Employee / Viewer)",
              "Dashboard development with charts",
              "Excel report export",
              "Upload history and data preview",
              "Prophet forecasting integration via Google Colab",
              "Testing and debugging",
              "Technical documentation",
              "Final jury presentation",
              "Privacy-safe public portfolio version",
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-3 bg-surface-strong rounded-xl border border-border px-4 py-3"
              >
                <span className="w-2 h-2 rounded-full bg-[#2563EB] shrink-0" />
                <span className="text-ink-2 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </CsSection>

        {/* Architecture */}
        <CsSection title="Architecture" label="System design">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {[
              {
                layer: "Frontend",
                tech: "React · Vite · TypeScript · Tailwind CSS",
                color: "blue",
                icon: "🖥️",
              },
              {
                layer: "Backend",
                tech: "Django · Django REST Framework · Python",
                color: "blue",
                icon: "⚙️",
              },
              {
                layer: "Database",
                tech: "MySQL · Relational schema",
                color: "teal",
                icon: "🗄️",
              },
              {
                layer: "Data Processing",
                tech: "Pandas · OpenPyXL · Excel ingestion",
                color: "teal",
                icon: "📊",
              },
              {
                layer: "Auth",
                tech: "JWT · Role-based access control",
                color: "blue",
                icon: "🔐",
              },
              {
                layer: "Forecasting",
                tech: "Prophet · scikit-learn · Google Colab",
                color: "teal",
                icon: "🤖",
              },
            ].map((item, i) => (
              <div
                key={i}
                className={`rounded-2xl border p-5 ${
                  item.color === "teal"
                    ? "bg-teal-light border-[rgba(15,139,141,0.3)]"
                    : "bg-blue-light border-border-hover"
                }`}
              >
                <div className="text-2xl mb-3">{item.icon}</div>
                <h4
                  className={`font-heading font-bold text-sm mb-2 ${
                    item.color === "teal" ? "text-teal" : "text-primary"
                  }`}
                >
                  {item.layer}
                </h4>
                <p className="text-ink-2 text-xs leading-relaxed">
                  {item.tech}
                </p>
              </div>
            ))}
          </div>

          {/* Architecture diagram */}
          <div className="rounded-2xl border border-border bg-surface-strong overflow-hidden">
            <div className="bg-surface px-4 py-3 border-b border-border flex items-center gap-2">
              <span className="text-sm font-medium text-ink-2">
                Application architecture diagram
              </span>
            </div>
            <div className="bg-surface p-3 sm:p-5">
              <img
                src={architectureUrl}
                alt="Application architecture diagram for the KPI analytics platform"
                className="block w-full h-auto max-h-120 object-contain rounded-lg"
              />
            </div>
          </div>
        </CsSection>

        {/* Data workflow */}
        <CsSection
          title="Data Workflow"
          label="How data moves through the system"
        >
          <div className="relative">
            {/* Desktop: horizontal */}
            <div className="hidden sm:flex items-start gap-0 overflow-x-auto pb-2">
              {[
                {
                  step: "1",
                  label: "Excel Upload",
                  desc: "Multi-file batch upload",
                  color: "blue",
                },
                {
                  step: "2",
                  label: "Validation",
                  desc: "Column and format checks",
                  color: "blue",
                },
                {
                  step: "3",
                  label: "Deduplication",
                  desc: "Duplicate row detection",
                  color: "blue",
                },
                {
                  step: "4",
                  label: "Period Extraction",
                  desc: "Month and year parsing",
                  color: "teal",
                },
                {
                  step: "5",
                  label: "Product Matching",
                  desc: "Reference alignment",
                  color: "teal",
                },
                {
                  step: "6",
                  label: "DB Storage",
                  desc: "Structured data saved",
                  color: "teal",
                },
                {
                  step: "7",
                  label: "KPI Calculation",
                  desc: "Monthly · quarterly · yearly",
                  color: "blue",
                },
                {
                  step: "8",
                  label: "Dashboard",
                  desc: "Charts and tables",
                  color: "blue",
                },
                {
                  step: "9",
                  label: "Export",
                  desc: "Excel report output",
                  color: "teal",
                },
              ].map((item, i) => (
                <div key={i} className="flex items-center shrink-0">
                  <div className="flex flex-col items-center text-center w-24">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm mb-2 ${
                        item.color === "teal"
                          ? "bg-[#E8F8F5] border border-[#AADDD7] text-[#0F9D8A]"
                          : "bg-blue-light-legacy border border-[#BFDBFE] text-[#2563EB]"
                      }`}
                    >
                      {item.step}
                    </div>
                    <p className="text-heading text-xs font-semibold leading-tight">
                      {item.label}
                    </p>
                    <p className="text-ink-2 text-[10px] mt-0.5 leading-tight">
                      {item.desc}
                    </p>
                  </div>
                  {i < 8 && (
                    <div className="w-5 h-px bg-border mx-1 shrink-0 -mt-5" />
                  )}
                </div>
              ))}
            </div>
            {/* Mobile: vertical */}
            <div className="sm:hidden space-y-3">
              {[
                {
                  step: "1",
                  label: "Excel Upload",
                  desc: "Multi-file batch upload",
                },
                {
                  step: "2",
                  label: "Validation & Deduplication",
                  desc: "Column checks and duplicate detection",
                },
                {
                  step: "3",
                  label: "Period Extraction & Product Matching",
                  desc: "Parse date and align product references",
                },
                {
                  step: "4",
                  label: "Database Storage",
                  desc: "Structured data saved to MySQL",
                },
                {
                  step: "5",
                  label: "KPI Calculation",
                  desc: "Monthly, quarterly, and yearly aggregation",
                },
                {
                  step: "6",
                  label: "Dashboard & Export",
                  desc: "Charts, tables, and Excel reports",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 bg-surface-strong rounded-xl border border-border p-4"
                >
                  <div className="w-8 h-8 rounded-lg bg-blue-light border border-border-hover text-primary font-bold text-sm flex items-center justify-center shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <p className="text-heading text-sm font-semibold">
                      {item.label}
                    </p>
                    <p className="text-ink-2 text-xs mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CsSection>

        {/* Auth and roles */}
        <CsSection
          title="Authentication & User Roles"
          label="Access control design"
        >
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              {
                role: "Administrator",
                icon: "👑",
                color: "blue",
                permissions: [
                  "Upload and manage Excel files",
                  "Manage products and product groups",
                  "Set monthly goals",
                  "View all KPIs and dashboards",
                  "Export reports",
                  "Manage user accounts",
                ],
              },
              {
                role: "Employee",
                icon: "👤",
                color: "teal",
                permissions: [
                  "Upload Excel files",
                  "View KPI dashboards",
                  "Export reports",
                  "View upload history",
                ],
              },
              {
                role: "Viewer",
                icon: "👁️",
                color: "neutral",
                permissions: [
                  "View KPI dashboards",
                  "View upload history",
                  "Export reports",
                ],
              },
            ].map((role, i) => (
              <div
                key={i}
                className={`rounded-2xl border p-5 ${
                  role.color === "blue"
                    ? "bg-blue-light-legacy border-[#BFDBFE]"
                    : role.color === "teal"
                      ? "bg-[#E8F8F5] border-[#AADDD7]"
                      : "bg-white border-[#D9E2EC]"
                }`}
              >
                <div className="text-2xl mb-3">{role.icon}</div>
                <h4
                  className={`font-heading font-bold text-base mb-3 ${
                    role.color === "blue"
                      ? "text-[#2563EB]"
                      : role.color === "teal"
                        ? "text-[#0F9D8A]"
                        : "text-[#102A43]"
                  }`}
                >
                  {role.role}
                </h4>
                <ul className="space-y-1.5">
                  {role.permissions.map((p, j) => (
                    <li
                      key={j}
                      className="text-[#486581] text-xs flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-50 shrink-0" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="text-[#486581] text-sm mt-4 leading-relaxed">
            Authentication is handled with JWT tokens. Every API endpoint is
            protected and validates the user's role before responding. The
            frontend adapts navigation and available actions based on the
            authenticated user's profile.
          </p>
        </CsSection>

        {/* KPI reporting */}
        <CsSection
          title="KPI Reporting"
          label="How KPIs are calculated and displayed"
        >
          <p className="text-[#486581] leading-relaxed mb-6">
            The platform supports three reporting granularities. Monthly KPIs
            include daily breakdowns. Quarterly and yearly views aggregate
            monthly results while preserving the ability to drill into
            individual months.
          </p>
          <div className="grid sm:grid-cols-3 gap-4 mb-6">
            {[
              {
                period: "Monthly",
                desc: "Daily-level breakdown per product group. Goal comparison. Upload history.",
                color: "blue",
              },
              {
                period: "Quarterly",
                desc: "Aggregated from three monthly periods. Quarter-over-quarter comparison.",
                color: "teal",
              },
              {
                period: "Yearly",
                desc: "Full-year summary across all four product groups. Trend visualization.",
                color: "blue",
              },
            ].map((item, i) => (
              <div
                key={i}
                className={`rounded-2xl border p-5 ${
                  item.color === "teal"
                    ? "bg-[#E8F8F5] border-[#AADDD7]"
                    : "bg-blue-light-legacy border-[#BFDBFE]"
                }`}
              >
                <h4
                  className={`font-heading font-bold text-base mb-2 ${
                    item.color === "teal" ? "text-[#0F9D8A]" : "text-[#2563EB]"
                  }`}
                >
                  {item.period}
                </h4>
                <p className="text-[#486581] text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
          {/* KPI results */}
          <div className="rounded-2xl border border-[#D9E2EC] bg-white overflow-hidden">
            <div className="bg-[#F1F5F9] px-4 py-3 border-b border-[#D9E2EC]">
              <span className="text-sm font-medium text-[#486581]">
                KPI results
              </span>
            </div>
            <div className="grid gap-4 bg-[#E8EEF4] p-3 sm:p-5">
              <img
                src={kpiResultsPart1Url}
                alt="KPI results table, part 1"
                className="block w-full h-auto rounded-lg border border-[#D9E2EC]"
              />
              <img
                src={kpiResultsPart2Url}
                alt="KPI results table, part 2"
                className="block w-full h-auto rounded-lg border border-[#D9E2EC]"
              />
            </div>
          </div>
        </CsSection>

        {/* Forecasting */}
        <CsSection
          title="Forecasting Workflow"
          label="Offline AI-assisted insights"
        >
          <div className="bg-[#E8F8F5] border border-[#AADDD7] rounded-2xl p-6 mb-5">
            <h3 className="font-heading font-bold text-[#0F9D8A] text-lg mb-3">
              Offline approach
            </h3>
            <p className="text-[#486581] leading-relaxed text-sm">
              Rather than requiring a live AI service or external API,
              forecasting insights are generated offline using Facebook Prophet
              and scikit-learn in a Google Colab notebook. The results are then
              imported into the platform and displayed alongside KPI data. This
              approach removes the dependency on an internet-connected AI
              service during normal operation.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl border border-[#D9E2EC] p-5">
              <h4 className="font-heading font-bold text-[#102A43] text-sm mb-3">
                Tools used
              </h4>
              <div className="flex flex-wrap gap-2">
                {[
                  "Prophet",
                  "scikit-learn",
                  "Google Colab",
                  "Pandas",
                  "Time-series analysis",
                  "Model evaluation metrics",
                ].map((t) => (
                  <span key={t} className="chip chip-teal text-xs">
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-[#D9E2EC] p-5">
              <h4 className="font-heading font-bold text-[#102A43] text-sm mb-3">
                Process
              </h4>
              <ol className="space-y-1.5 text-sm text-[#486581]">
                {[
                  "Export historical KPI data",
                  "Run Prophet in Google Colab",
                  "Generate period forecasts",
                  "Import results to platform",
                  "Display alongside live KPIs",
                ].map((step, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="text-[#0F9D8A] font-bold text-xs">
                      {i + 1}.
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </CsSection>

        {/* Results */}
        <CsSection title="Results" label="Measured outcomes">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
            {[
              {
                value: "36",
                label: "Excel files processed and validated",
                color: "blue",
              },
              {
                value: "<60s",
                label: "KPI preparation after upload",
                color: "teal",
              },
              {
                value: "3",
                label: "Reporting periods supported",
                color: "blue",
              },
              { value: "4", label: "Product groups tracked", color: "teal" },
              { value: "3", label: "User permission profiles", color: "blue" },
              {
                value: "17.5/20",
                label: "Final-year project grade",
                color: "success",
              },
            ].map((m, i) => (
              <div
                key={i}
                className={`rounded-2xl border p-5 text-center ${
                  m.color === "teal"
                    ? "bg-[#E8F8F5] border-[#AADDD7]"
                    : m.color === "success"
                      ? "bg-[#F0FDF4] border-[#BBF7D0]"
                      : "bg-blue-light-legacy border-[#BFDBFE]"
                }`}
              >
                <div
                  className={`text-2xl font-extrabold font-heading mb-2 ${
                    m.color === "teal"
                      ? "text-[#0F9D8A]"
                      : m.color === "success"
                        ? "text-success"
                        : "text-[#2563EB]"
                  }`}
                >
                  {m.value}
                </div>
                <div className="text-xs text-[#486581] font-medium leading-tight">
                  {m.label}
                </div>
              </div>
            ))}
          </div>
          <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-2xl p-5">
            <p className="text-success font-semibold text-sm mb-1">
              Jury recognition
            </p>
            <p className="text-[#486581] text-sm italic">
              "The jury particularly praised the quality and clarity of the
              presentation."
            </p>
            <p className="text-[#486581] text-xs mt-2">
              Final assessment: <strong>Very Good</strong>
            </p>
          </div>
        </CsSection>

        {/* Challenges */}
        <CsSection
          title="Challenges & Decisions"
          label="How key problems were solved"
        >
          <div className="space-y-4">
            {[
              {
                challenge: "Supporting multiple Excel files per upload",
                decision:
                  "Implemented a batch upload endpoint that processes files sequentially, applying the same validation pipeline to each one before committing any data.",
              },
              {
                challenge: "Validating inconsistent spreadsheet content",
                decision:
                  "Built a validation layer using Pandas that checks column presence, data types, and value ranges before any record is written to the database.",
              },
              {
                challenge: "Preventing duplicate data entries",
                decision:
                  "Added a fingerprinting mechanism on the period and product reference combination to reject re-uploads of already-processed periods.",
              },
              {
                challenge:
                  "Aggregating monthly results into quarterly and yearly views",
                decision:
                  "Stored all data at the monthly-daily level, then built aggregation queries that group and sum as needed for each reporting granularity.",
              },
              {
                challenge:
                  "Managing different permissions across three user types",
                decision:
                  "Used Django's permission system combined with JWT claims to check access at the API layer, independent of what the frontend renders.",
              },
              {
                challenge:
                  "Separating confidential data from the public repository",
                decision:
                  "Created a portfolio-safe version of the codebase with no credentials, internal files, or real business data — only architecture, configuration, and sanitized examples.",
              },
              {
                challenge:
                  "Creating a forecasting workflow without an online AI service",
                decision:
                  "Used Google Colab as an offline runner for Prophet models. Results are exported and imported as structured data, keeping the platform's operation independent of any external AI service.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-[#D9E2EC] p-5"
              >
                <h4 className="font-heading font-semibold text-[#102A43] text-sm mb-2 flex items-start gap-2">
                  <span className="text-[#C2410C] shrink-0">⚡</span>
                  {item.challenge}
                </h4>
                <p className="text-[#486581] text-sm leading-relaxed pl-5">
                  <span className="text-[#0F9D8A] font-semibold">→ </span>
                  {item.decision}
                </p>
              </div>
            ))}
          </div>
        </CsSection>

        {/* What I learned */}
        <CsSection
          title="What I Learned"
          label="Skills developed through this project"
        >
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              "Organizing a large project independently from planning to delivery",
              "Translating operational business needs into concrete software features",
              "Managing regular feedback from a supervisor and incorporating it effectively",
              "Validating and structuring real business data at scale",
              "Connecting backend services with a reactive frontend interface",
              "Designing role-based application behavior across three user types",
              "Documenting setup, architecture, and API behavior clearly",
              "Presenting technical work clearly to a jury unfamiliar with the implementation",
              "Preparing a privacy-safe public portfolio version of a real project",
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-3 bg-blue-light-legacy rounded-xl border border-[#BFDBFE] px-4 py-3"
              >
                <span className="text-[#2563EB] font-bold text-sm shrink-0">
                  ✓
                </span>
                <span className="text-[#486581] text-sm leading-relaxed">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </CsSection>

        {/* Tech stack */}
        <CsSection
          title="Technology Stack"
          label="Everything used to build this platform"
        >
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                category: "Backend",
                items: ["Python", "Django", "Django REST Framework"],
              },
              {
                category: "Frontend",
                items: ["React", "Vite", "TypeScript", "Tailwind CSS", "Axios"],
              },
              { category: "Database", items: ["MySQL", "SQL"] },
              { category: "Data processing", items: ["Pandas", "OpenPyXL"] },
              {
                category: "AI / Forecasting",
                items: ["Prophet", "scikit-learn", "Google Colab"],
              },
              {
                category: "Dev tools",
                items: ["Git", "GitHub", "Postman", "VS Code"],
              },
            ].map((group, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-[#D9E2EC] p-5"
              >
                <h4 className="font-heading font-bold text-[#2563EB] text-sm mb-3">
                  {group.category}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((t) => (
                    <span key={t} className="chip chip-blue text-xs">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CsSection>

        {/* Repo + back */}
        <div className="bg-white rounded-3xl border border-[#D9E2EC] p-8 text-center">
          <h3 className="font-heading font-bold text-[#102A43] text-xl mb-2">
            Explore the codebase
          </h3>
          <p className="text-[#486581] text-sm mb-6 max-w-lg mx-auto">
            The public repository is a documented portfolio version. It contains
            no confidential company data, credentials, or real business
            datasets.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={SITE.projectRepositoryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-[#102A43] text-white font-semibold rounded-xl hover:bg-[#1E40AF] transition-all duration-200 group"
            >
              <GitHubIcon />
              View GitHub Repository
              <svg
                className="w-4 h-4 group-hover:translate-x-0.5 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
            <button
              onClick={() => navigateTo("home")}
              className="flex items-center gap-2 px-6 py-3 border border-[#D9E2EC] text-[#486581] font-semibold rounded-xl hover:border-[#2563EB] hover:text-[#2563EB] transition-all duration-200"
            >
              ← Back to portfolio
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer
        className="bg-white border-t border-[#D9E2EC] py-8 mt-8"
        role="contentinfo"
      >
        <div className="max-w-225 mx-auto px-5 sm:px-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#2563EB] flex items-center justify-center text-white font-bold text-xs font-heading">
              MH
            </div>
            <span className="font-heading font-bold text-[#102A43]">
              Mazen Haddad
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href={SITE.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-[#486581] hover:text-[#102A43] transition-colors p-2"
            >
              <GitHubIcon />
            </a>
            <a
              href={SITE.linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-[#486581] hover:text-[#2563EB] transition-colors p-2"
            >
              <LinkedInIcon />
            </a>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              aria-label="Back to top"
              className="text-sm text-[#486581] hover:text-[#2563EB] px-3 py-1.5 border border-[#D9E2EC] rounded-lg hover:border-[#2563EB] transition-all"
            >
              ↑ Top
            </button>
          </div>
        </div>
      </footer>
    </div>
  )
}

function CsSection({
  title,
  label,
  children,
}: {
  title: string
  label: string
  children: React.ReactNode
}) {
  const { ref, visible } = useScrollReveal()
  return (
    <section
      ref={ref}
      className={`reveal ${visible ? "visible" : ""}`}
      aria-labelledby={`cs-${title.replace(/\s+/g, "-").toLowerCase()}`}
    >
      <div className="mb-6">
        <p className="text-[#2563EB] text-xs font-semibold tracking-widest uppercase mb-1">
          {label}
        </p>
        <h2
          id={`cs-${title.replace(/\s+/g, "-").toLowerCase()}`}
          className="font-heading font-bold text-[#102A43] text-2xl border-b border-[#D9E2EC] pb-4"
        >
          {title}
        </h2>
      </div>
      {children}
    </section>
  )
}

function InfoCard({
  title,
  value,
  sub,
  color,
}: {
  title: string
  value: string
  sub: string
  color: string
}) {
  return (
    <div
      className={`rounded-2xl border p-5 ${
        color === "teal"
          ? "bg-[#E8F8F5] border-[#AADDD7]"
          : color === "success"
            ? "bg-[#F0FDF4] border-[#BBF7D0]"
            : "bg-blue-light-legacy border-[#BFDBFE]"
      }`}
    >
      <p className="text-xs text-[#486581] font-medium mb-1">{title}</p>
      <p
        className={`font-heading font-bold text-lg leading-tight ${
          color === "teal"
            ? "text-[#0F9D8A]"
            : color === "success"
              ? "text-success"
              : "text-[#2563EB]"
        }`}
      >
        {value}
      </p>
      <p className="text-xs text-[#486581] mt-1">{sub}</p>
    </div>
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

function BarIcon() {
  return (
    <svg
      width="32"
      height="32"
      fill="none"
      stroke="#2563EB"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
      className="mx-auto"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 13h4v7H3zm6-5h4v12H9zm6-5h4v17h-4z"
      />
    </svg>
  )
}
