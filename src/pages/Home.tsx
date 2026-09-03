import { useEffect, useState } from "react"
import { motion, useReducedMotion, type Variants } from "framer-motion"
import { SITE } from "../config/site"
import { useScrollReveal } from "../hooks/useScrollReveal"
import tunisieTelecomLogoUrl from "../assets/Tunisie_Telecom_Logo.png"
import adminDashboardUrl from "../assets/admin_dashboard.png"

interface HomeProps {
  navigateTo: (p: "home" | "case-study") => void
}

export default function Home({ navigateTo }: HomeProps) {
  return (
    <div className="bg-[#E8EEF4]">
      <HeroSection />
      <AboutSection />
      <WorkSection navigateTo={navigateTo} />
      <EvidenceStrip />
      <ExperienceSection />
      <EducationSection />
      <SkillsSection />
      <AdditionalSection />
      <ContactSection />
      <FooterSection />
    </div>
  )
}

/* ── HERO ─────────────────────────────────────────────────────── */
function HeroSection() {
  const [mounted, setMounted] = useState(false)
  const reduceMotion = useReducedMotion()
  useEffect(() => {
    const timer = window.setTimeout(() => setMounted(true), 80)
    return () => window.clearTimeout(timer)
  }, [])

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: reduceMotion
      ? { opacity: 1, y: 0, scale: 1 }
      : { opacity: 0, y: 20, scale: 0.985 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: reduceMotion ? 0 : 0.58, ease: "easeOut" },
    },
  }

  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="hero-section relative min-h-[85vh] flex items-center pt-24 pb-16 overflow-hidden text-center"
    >
      {/* Subtle background glow */}
      <div
        className="absolute top-0 right-0 w-150 h-150 bg-blue-light rounded-full opacity-35 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-1/3 w-100 h-100 bg-[#D6F1EF] rounded-full opacity-30 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-230 mx-auto px-5 sm:px-8 w-full text-center">
        <div className="relative z-10 flex flex-col items-center space-y-5">
          <motion.div
            variants={containerVariants}
            initial={reduceMotion ? false : "hidden"}
            animate={reduceMotion || mounted ? "visible" : "hidden"}
            className="flex flex-col items-center space-y-5"
          >
            {/* Availability badge */}
            <motion.div variants={itemVariants} className="inline-flex">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E8F8F5] border border-[rgba(15,139,141,0.3)] text-[#0F8B8D] text-sm font-medium">
                <span className="w-2 h-2 rounded-full bg-[#0F8B8D] animate-pulse" />
                Available for Work-Study "Alternance" opportunities
              </div>
            </motion.div>

            {/* Intro label */}
            <motion.p variants={itemVariants} className="hero-introduction">
              Hello, I am
            </motion.p>

            <motion.p variants={itemVariants} className="hero-name">
              Mazen Haddad
            </motion.p>

            {/* Main headline */}
            <motion.h1
              variants={itemVariants}
              className="font-heading hero-value-statement"
            >
              I turn data into useful software.
            </motion.h1>

            {/* Supporting text */}
            <motion.p
              variants={itemVariants}
              className="text-[#4B5B70] text-lg leading-relaxed max-w-3xl"
            >
              Computer Science graduate and data-oriented full-stack developer
              with hands-on experience in REST APIs, relational databases, data
              processing, KPI analytics, dashboards, and AI-assisted
              forecasting.
            </motion.p>
            <motion.p
              variants={itemVariants}
              className="text-[#4B5B70] text-base leading-relaxed max-w-3xl"
            >
              I am open to opportunities across IT, with a particular interest in developing deeper skills in{" "}
              <span className="text-[#0F8B8D] font-medium">AI and Data</span>
              {" "}while building on my full-stack experience.
            </motion.p>

            {/* Actions */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap justify-center gap-3"
            >
              <button
                onClick={() =>
                  document
                    .getElementById("work")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="flex items-center gap-2 px-6 py-3.5 bg-[#2563EB] text-white font-semibold rounded-xl hover:bg-[#1E40AF] transition-all duration-200 hover:shadow-lg hover:shadow-blue-200 group hover:-translate-y-0.5"
              >
                Explore My Work
                <svg
                  className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </motion.div>

            {/* Social links */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center justify-center gap-5"
            >
              <a
                href={SITE.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-[#486581] hover:text-[#102A43] transition-colors duration-200 font-medium"
              >
                <GitHubIcon />
                GitHub
              </a>
              <a
                href={SITE.linkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-[#486581] hover:text-[#2563EB] transition-colors duration-200 font-medium"
              >
                <LinkedInIcon />
                LinkedIn
              </a>
              <span className="text-[#4B5B70]">·</span>
              <span className="text-sm text-[#4B5B70]">Tunis, Tunisia</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}


/* ── EVIDENCE STRIP ───────────────────────────────────────────── */
function EvidenceStrip() {
  const { ref, visible } = useScrollReveal()

  const telecomMetrics = [
    {
      value: "36",
      label: "Excel files processed and validated",
      color: "blue",
    },
    {
      value: "<60s",
      label: "KPI preparation after at least one day of manual work",
      color: "teal",
    },
    { value: "3", label: "Reporting periods supported", color: "blue" },
    { value: "4", label: "Product groups tracked", color: "teal" },
    { value: "3", label: "User profiles", color: "blue" },
    { value: "17.5/20", label: "Final-year project grade", color: "success" },
    { value: "Very Good", label: "Final assessment", color: "success" },
    {
      value: "Jury praise",
      label: "Presentation quality recognized",
      color: "teal",
    },
  ]

  const hackathonMetrics = [
    { value: "HealthLine", label: "Hackathon application", color: "blue" },
    { value: "5", label: "Team members", color: "teal" },
    { value: "≈6 hours", label: "Build and presentation time", color: "blue" },
    { value: "UN SDG 3", label: "Good Health and Well-Being", color: "teal" },
    {
      value: "Delivered",
      label: "Application and presentation shared with jury and participants",
      color: "blue",
    },
    { value: "3rd place", label: "Hackathon result", color: "teal" },
  ]

  return (
    <section
      aria-label="Key Outcomes"
      className="bg-white border-y border-[rgba(21,58,89,0.14)] py-20"
    >
      <div className="max-w-300 mx-auto px-5 sm:px-8">
        <div ref={ref} className={`reveal ${visible ? "visible" : ""}`}>
          <div className="text-center mb-14">
            <p className="text-[#2563EB] text-sm font-semibold tracking-widest uppercase mb-2">
              RESULTS &amp; RECOGNITION
            </p>
            <h2 className="font-heading font-bold text-[#172033] text-3xl">
              Key Outcomes
            </h2>
          </div>

          {/* Tunisie Telecom Section */}
          <div className="mb-12 rounded-[1.75rem] bg-[#F7FAFC] border border-[rgba(21,58,89,0.14)] p-6 sm:p-8 shadow-[0_12px_30px_rgba(21,58,89,0.06)]">
            <h3 className="font-heading font-bold text-[#173F5F] text-xl mb-6 pl-2 border-l-4 border-[#2563EB]">
              Tunisie Telecom KPI Analytics Platform
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {telecomMetrics.map((m, i) => (
                <div
                  key={i}
                  className={`rounded-2xl border p-5 text-center transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-md ${
                    m.color === "teal"
                      ? "bg-[#D6F1EF] border-[rgba(15,139,141,0.3)]"
                      : m.color === "success"
                        ? "bg-[#F0FDF4] border-[#BBF7D0]"
                        : "bg-blue-light border-[rgba(37,99,235,0.3)]"
                  }`}
                >
                  <div
                    className={`text-2xl font-extrabold font-heading leading-none mb-2 ${
                      m.color === "teal"
                        ? "text-[#0F8B8D]"
                        : m.color === "success"
                          ? "text-success"
                          : "text-[#2563EB]"
                    }`}
                  >
                    {m.value}
                  </div>
                  <div className="text-xs text-[#4B5B70] font-medium leading-tight">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hackathon Section */}
          <div className="rounded-[1.75rem] bg-[#DDE6EE] border border-[rgba(21,58,89,0.14)] p-6 sm:p-8 shadow-[0_12px_30px_rgba(21,58,89,0.05)]">
            <h3 className="font-heading font-bold text-[#173F5F] text-xl mb-6 pl-2 border-l-4 border-[#0F8B8D]">
              Hackathon Achievement
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {hackathonMetrics.map((m, i) => (
                <div
                  key={i}
                  className={`rounded-2xl border p-5 text-center transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-md ${
                    m.color === "teal"
                      ? "bg-[#D6F1EF] border-[rgba(15,139,141,0.3)]"
                      : "bg-blue-light border-[rgba(37,99,235,0.3)]"
                  }`}
                >
                  <div
                    className={`text-2xl font-extrabold font-heading leading-none mb-2 ${
                      m.color === "teal" ? "text-[#0F8B8D]" : "text-[#2563EB]"
                    }`}
                  >
                    {m.value}
                  </div>
                  <div className="text-xs text-[#4B5B70] font-medium leading-tight">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── ABOUT ────────────────────────────────────────────────────── */
function AboutSection() {
  const { ref, visible } = useScrollReveal()

  const values = [
    {
      icon: "⚙️",
      title: "Operational thinking",
      text: "Translating fragmented data and manual workflows into structured, usable applications.",
    },
    {
      icon: "📊",
      title: "Data & AI direction",
      text: "Focused on analytics, forecasting, business intelligence, and decision-support systems.",
    },
    {
      icon: "🤝",
      title: "Collaborative delivery",
      text: "Experience working independently with regular supervisor guidance and in five-member teams under tight deadlines.",
    },
  ]

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="py-24 bg-[#E8EEF4]"
    >
      <div className="max-w-300 mx-auto px-5 sm:px-8">
        <div ref={ref} className={`reveal ${visible ? "visible" : ""}`}>
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Text */}
            <div>
              <p className="text-[#2563EB] text-sm font-semibold tracking-widest uppercase mb-3">
                About
              </p>
              <h2
                id="about-heading"
                className="font-heading font-bold text-[#172033] mb-6"
                style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}
              >
                A practical approach to technology
              </h2>
              <div className="space-y-4 text-[#4B5B70] text-base leading-relaxed">
                <p>
                  I enjoy turning fragmented data and manual workflows into
                  structured applications that people can understand and use.
                </p>
                <p>
                  During a four-month internship at the Mannouba Regional
                  Directorate of Tunisie Telecom, I independently designed and
                  implemented a full-stack KPI analytics platform with
                  regular guidance and feedback from a supervisor.
                </p>
                <p>
                  I am open to opportunities across different IT fields, with
                  a particular interest in developing deeper skills in{" "}
                  <strong className="text-[#172033] font-semibold">
                    AI and Data
                  </strong>
                  . This includes data preparation, analytics, forecasting,
                  business intelligence, and decision-support applications.
                  My foundation in full-stack development opens doors to
                  software engineering, cloud technologies, IoT, digital trust,
                  industrial digitalization, and other IT opportunities through
                  real projects and practice.
                </p>
              </div>

              {/* Journey timeline */}
              <div className="mt-10 space-y-0">
                {[
                  {
                    year: "2023",
                    label:
                      "Baccalaureate in Mathematics — Hreireia 2 High School",
                  },
                  {
                    year: "2023–26",
                    label: "Licence in Computer Science — ISIM Medenine",
                  },
                  {
                    year: "Feb–May 2026",
                    label: "Full-Stack Internship — Tunisie Telecom Mannouba",
                  },
                  {
                    year: "Now",
                    label: 'Seeking Work-Study "Alternance" opportunities',
                    highlight: true,
                  },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 group">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-3 h-3 rounded-full mt-1 shrink-0 ${
                          item.highlight ? "bg-[#0F8B8D]" : "bg-[#2563EB]"
                        }`}
                      />
                      {i < 3 && (
                        <div className="w-px flex-1 bg-[rgba(23,63,95,0.14)] my-1" />
                      )}
                    </div>
                    <div className="pb-5">
                      <span
                        className={`text-xs font-semibold ${
                          item.highlight ? "text-[#0F8B8D]" : "text-[#2563EB]"
                        } font-mono`}
                      >
                        {item.year}
                      </span>
                      <p
                        className={`text-sm mt-0.5 ${
                          item.highlight
                            ? "text-[#172033] font-semibold"
                            : "text-[#4B5B70]"
                        }`}
                      >
                        {item.label}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Personal note */}
              <div className="mt-6 p-4 rounded-2xl bg-[#F7FAFC] border border-[rgba(23,63,95,0.14)]">
                <p className="text-sm text-[#4B5B70] leading-relaxed italic">
                  Seasonal customer-facing work, university football, travel,
                  and collaboration with people from different backgrounds have
                  strengthened communication, adaptability, discipline, active
                  listening, and teamwork.
                </p>
              </div>
            </div>

            {/* Value cards */}
            <div className="space-y-4">
              {values.map((v, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl border border-[rgba(23,63,95,0.14)] p-6 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                >
                  <div className="text-2xl mb-3">{v.icon}</div>
                  <h3 className="font-heading font-bold text-[#172033] text-lg mb-2">
                    {v.title}
                  </h3>
                  <p className="text-[#4B5B70] text-sm leading-relaxed">
                    {v.text}
                  </p>
                </div>
              ))}

              {/* Location card */}
              <div className="bg-[#D7E8F7] rounded-2xl border border-[rgba(37,99,235,0.3)] p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#2563EB] flex items-center justify-center shrink-0">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-[#1E40AF] text-base mb-1">
                      Currently based in
                    </h3>
                    <p className="text-[#2563EB] font-semibold">
                      Tunis, Tunisia
                    </p>
                    <p className="text-[#4B5B70] text-sm mt-1">
                      Open to remote, hybrid, or on-site Work-Study "Alternance"
                      opportunities
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── SELECTED WORK ────────────────────────────────────────────── */
function WorkSection({ navigateTo }: HomeProps) {
  const { ref, visible } = useScrollReveal()

  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="py-24 bg-white"
    >
      <div className="max-w-300 mx-auto px-5 sm:px-8">
        <div ref={ref} className={`reveal ${visible ? "visible" : ""}`}>
          <div className="text-center mb-14">
            <p className="text-[#2563EB] text-sm font-semibold tracking-widest uppercase mb-3">
              Projects
            </p>
            <h2
              id="work-heading"
              className="font-heading font-bold text-[#172033] mb-4"
              style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}
            >
              Projects that reflect how I work
            </h2>
            <p className="text-[#4B5B70] text-base max-w-2xl mx-auto">
              From understanding a problem to designing, building, and
              presenting a practical solution.
            </p>
          </div>

          {/* Featured project */}
          <FeaturedProject navigateTo={navigateTo} />

          {/* HealthLine */}
          <HealthlineCard />
        </div>
      </div>
    </section>
  )
}

function FeaturedProject({ navigateTo }: HomeProps) {
  const reduceMotion = useReducedMotion()
  const techStack = [
    "Python",
    "Django",
    "Django REST Framework",
    "React",
    "Vite",
    "TypeScript",
    "MySQL",
    "Pandas",
    "OpenPyXL",
    "Prophet",
    "scikit-learn",
    "Tailwind CSS",
    "JWT",
    "Git",
  ]

  const metrics = [
    { value: "36", label: "Excel files processed", color: "blue" },
    { value: "<60s", label: "KPI preparation", color: "teal" },
    { value: "3", label: "Reporting periods", color: "blue" },
    { value: "4", label: "Product groups", color: "teal" },
    { value: "3", label: "User profiles", color: "blue" },
    { value: "17.5/20", label: "Project grade", color: "success" },
  ]

  const myRole = [
    "Project planning",
    "Application architecture",
    "Django REST backend",
    "React + TypeScript frontend",
    "MySQL database design",
    "Excel ingestion",
    "Data validation",
    "KPI calculation",
    "JWT authentication",
    "Role-based access control",
    "Dashboard development",
    "Report export",
    "Forecasting integration",
    "Testing",
    "Documentation",
    "Final presentation",
  ]

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 30 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.6 }}
      viewport={{ once: true, margin: "-100px" }}
      className="rounded-3xl border border-[rgba(23,63,95,0.14)] bg-[#E8EEF4] overflow-hidden mb-8 hover:shadow-xl transition-all duration-300 hover:border-[#2563EB]/30"
    >
      {/* Header band */}
      <div className="bg-white border-b border-[rgba(23,63,95,0.14)] px-8 py-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 flex-wrap mb-2">
            <span className="chip chip-blue">Featured Project</span>
            <span className="chip">Feb 2026 – May 2026</span>
            <span className="chip">Final-Year Internship</span>
          </div>
          <h3 className="font-heading font-extrabold text-[#172033] text-2xl sm:text-3xl">
            Full-Stack KPI Analytics Platform
          </h3>
          <p className="text-[#4B5B70] text-base mt-1">
            Internship Project · Tunisie Telecom, Mannouba Regional Directorate
          </p>
        </div>
        <div className="flex gap-3 flex-wrap">
          <a
            href={SITE.projectRepositoryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 border border-[rgba(23,63,95,0.14)] bg-white rounded-xl text-sm font-medium text-[#4B5B70] hover:text-[#172033] hover:border-[#172033] transition-all duration-200"
          >
            <GitHubIcon /> View Repository
          </a>
          <button
            onClick={() => navigateTo("case-study")}
            className="case-study-button flex items-center gap-2 px-4 py-2.5 bg-[#2563EB] text-white rounded-xl text-sm font-semibold hover:bg-[#1E40AF] transition-all duration-200 group"
          >
            Read Full Case Study
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/15">
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
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </span>
          </button>
        </div>
      </div>

      <div className="p-8 grid lg:grid-cols-5 gap-8">
        {/* Left: description, metrics, role */}
        <div className="lg:col-span-3 space-y-8">
          {/* Summary */}
          <div>
            <h4 className="font-heading font-bold text-[#172033] text-lg mb-3">
              Project summary
            </h4>
            <p className="text-[#4B5B70] leading-relaxed text-base">
              A centralized platform that replaced a manual Excel-based
              sales-reporting process with structured data ingestion, KPI
              calculation, dashboards, report exports, access control, and
              offline forecasting insights.
            </p>
          </div>

          {/* Challenge + Solution */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl border border-[rgba(23,63,95,0.14)] p-5">
              <h4 className="font-heading font-bold text-[#172033] text-base mb-2">
                ⚡ Challenge
              </h4>
              <p className="text-[#4B5B70] text-sm leading-relaxed">
                Sales information distributed across separate Excel files. KPI
                preparation required at least one day of manual work and was
                difficult to centralize, repeat, and maintain.
              </p>
            </div>
            <div className="bg-[#E8F8F5] rounded-2xl border border-[rgba(15,139,141,0.3)] p-5">
              <h4 className="font-heading font-bold text-[#0F8B8D] text-base mb-2">
                ✅ Solution
              </h4>
              <p className="text-[#4B5B70] text-sm leading-relaxed">
                Full-stack web platform that imports and validates sales files,
                stores structured data, calculates KPIs, displays dashboards,
                exports reports, and controls access by user role.
              </p>
            </div>
          </div>

          {/* Metrics */}
          <div>
            <h4 className="font-heading font-bold text-[#172033] text-lg mb-4">
              Measurable results
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {metrics.map((m, i) => (
                <div
                  key={i}
                  className={`rounded-xl p-4 text-center ${
                    m.color === "teal"
                      ? "bg-[#E8F8F5] border border-[rgba(15,139,141,0.3)]"
                      : m.color === "success"
                        ? "bg-[#F0FDF4] border border-[#BBF7D0]"
                        : "bg-[#D7E8F7] border border-[rgba(37,99,235,0.3)]"
                  }`}
                >
                  <div
                    className={`text-xl font-extrabold font-heading leading-none ${
                      m.color === "teal"
                        ? "text-[#0F8B8D]"
                        : m.color === "success"
                          ? "text-success"
                          : "text-[#2563EB]"
                    }`}
                  >
                    {m.value}
                  </div>
                  <div className="text-xs text-[#4B5B70] mt-1.5 font-medium">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 p-3 bg-[#F0FDF4] rounded-xl border border-[#BBF7D0] flex items-center gap-3">
              <span className="text-success font-bold text-sm">Very Good</span>
              <span className="text-[#4B5B70] text-sm">· Final assessment</span>
              <span className="text-[rgba(23,63,95,0.14)] mx-1">·</span>
              <span className="text-[#4B5B70] italic text-xs">
                "The jury particularly praised the quality and clarity of the
                presentation"
              </span>
            </div>
          </div>
        </div>

        {/* Dashboard, technology, and role */}
        <div className="lg:col-span-2 space-y-6">
          {/* Dashboard */}
          <div className="rounded-2xl border border-[rgba(23,63,95,0.14)] bg-white overflow-hidden">
            <div className="bg-[#F7FAFC] px-3 py-2.5 flex items-center gap-2 border-b border-[rgba(23,63,95,0.14)]">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#FC6B6B]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#FCCC6B]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#6BFC8A]" />
              </div>
              <div className="flex-1 bg-white rounded text-[10px] text-[#4B5B70] px-2 py-0.5 border border-[rgba(23,63,95,0.14)] text-center font-mono">
                /dashboard
              </div>
            </div>
            <div className="bg-[#E8EEF4] p-3 sm:p-5">
              <img
                src={adminDashboardUrl}
                alt="Tunisie Telecom KPI analytics dashboard"
                className="block w-full h-auto max-h-100 object-contain rounded-lg border border-[rgba(23,63,95,0.14)]"
              />
            </div>
          </div>

          {/* My role */}
          <div>
            <h4 className="font-heading font-bold text-[#172033] text-base mb-3">
              My personal role
            </h4>
            <div className="flex flex-wrap gap-2">
              {myRole.map((r) => (
                <span key={r} className="chip text-xs">
                  {r}
                </span>
              ))}
            </div>
          </div>

          {/* Tech stack */}
          <div>
            <h4 className="font-heading font-bold text-[#172033] text-base mb-3">
              Technology stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {techStack.map((t) => (
                <span
                  key={t}
                  className={`chip text-xs ${
                    ["Django", "React", "MySQL", "Prophet"].includes(t)
                      ? "chip-blue"
                      : ""
                  }`}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </motion.article>
  )
}

function HealthlineCard() {
  const reduceMotion = useReducedMotion()

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 30 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{
        duration: reduceMotion ? 0 : 0.6,
        delay: reduceMotion ? 0 : 0.1,
      }}
      viewport={{ once: true, margin: "-100px" }}
      className="rounded-3xl border border-[rgba(23,63,95,0.14)] bg-white overflow-hidden hover:shadow-lg transition-all duration-300"
    >
      <div className="p-8 grid sm:grid-cols-3 gap-8 items-start">
        {/* Left */}
        <div className="sm:col-span-2">
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="chip chip-teal">Hackathon Project</span>
            <span className="chip">🏆 Third Place</span>
            <span className="chip">HACKATHON ISIMED 3.0</span>
          </div>
          <h3 className="font-heading font-extrabold text-[#172033] text-2xl mb-1">
            HealthLine
          </h3>
          <p className="text-[#4B5B70] text-base mb-4">
            SDG Goal 3 — Good Health and Well-Being
          </p>
          <p className="text-[#4B5B70] text-sm leading-relaxed mb-4">
            HealthLine was designed to make essential healthcare information and
            services easier to access. Built by a five-member team in
            approximately six hours, then presented to a jury.
          </p>
          <div className="space-y-2 text-sm text-[#4B5B70]">
            <div className="flex gap-2 items-start">
              <span className="text-[#2563EB] font-semibold shrink-0">
                Features:
              </span>
              <span>
                Doctor search by specialty · Emergency calling · Hospital
                contact information · Nearest-hospital lookup · Map-based
                navigation
              </span>
            </div>
            <div className="flex gap-2 items-start">
              <span className="text-[#2563EB] font-semibold shrink-0">
                My role:
              </span>
              <span>
                Idea development · Web implementation · Database work · Feature
                prioritization · Team collaboration · Presentation preparation
              </span>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="space-y-4">
          <div className="rounded-2xl border border-[rgba(15,139,141,0.3)] bg-[#E8F8F5] p-5 text-center">
            <div className="text-4xl mb-2">🏆</div>
            <div className="text-2xl font-extrabold font-heading text-[#0F8B8D]">
              3rd Place
            </div>
            <div className="text-xs text-[#4B5B70] mt-1">
              HACKATHON ISIMED 3.0
            </div>
          </div>
          <div className="rounded-2xl border border-[rgba(23,63,95,0.14)] bg-[#E8EEF4] p-5">
            <h4 className="font-heading font-bold text-[#172033] text-sm mb-3">
              Tech used
            </h4>
            <div className="flex flex-wrap gap-2">
              {["HTML", "CSS", "JavaScript", "MySQL"].map((t) => (
                <span key={t} className="chip text-xs">
                  {t}
                </span>
              ))}
            </div>
            <div className="mt-3 pt-3 border-t border-[rgba(23,63,95,0.14)]">
              <div className="flex justify-between text-xs text-[#4B5B70]">
                <span>Team size</span>
                <span className="font-semibold text-[#172033]">5 members</span>
              </div>
              <div className="flex justify-between text-xs text-[#4B5B70] mt-1">
                <span>Build time</span>
                <span className="font-semibold text-[#172033]">≈ 6 hours</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  )
}

/* ── EXPERIENCE ───────────────────────────────────────────────── */
function ExperienceSection() {
  const { ref, visible } = useScrollReveal()

  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="py-24 bg-[#E8EEF4]"
    >
      <div className="max-w-300 mx-auto px-5 sm:px-8">
        <div ref={ref} className={`reveal ${visible ? "visible" : ""}`}>
          <p className="text-[#2563EB] text-sm font-semibold tracking-widest uppercase mb-3">
            Experience
          </p>
          <h2
            id="experience-heading"
            className="font-heading font-bold text-[#172033] mb-12"
            style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}
          >
            Where I have worked
          </h2>

          <div className="space-y-6">
            {/* Tunisie Telecom */}
            <div className="bg-white rounded-3xl border border-[rgba(23,63,95,0.14)] p-8 hover:shadow-md transition-all duration-200">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-white border border-[rgba(37,99,235,0.3)] flex items-center justify-center shrink-0 overflow-hidden p-1.5">
                    <img
                      src={tunisieTelecomLogoUrl}
                      alt="Tunisie Telecom logo"
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-[#172033] text-xl">
                      Full-Stack Developer Intern
                    </h3>
                    <p className="text-[#2563EB] font-semibold text-base mt-0.5">
                      Tunisie Telecom
                    </p>
                    <p className="text-[#4B5B70] text-sm mt-0.5">
                      Mannouba Regional Directorate
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="chip chip-blue text-xs">
                    Feb 2026 – May 2026
                  </span>
                  <span className="chip text-xs">4 months</span>
                </div>
              </div>
              <p className="text-[#4B5B70] leading-relaxed text-base">
                Independently delivered a complete KPI analytics platform with
                regular supervisor guidance, covering project planning, data
                workflows, backend services, frontend interfaces, database
                design, authentication, reporting, forecasting integration,
                testing, documentation, and final presentation.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {[
                  "Django REST",
                  "React",
                  "TypeScript",
                  "MySQL",
                  "Pandas",
                  "Prophet",
                  "JWT",
                  "Tailwind CSS",
                ].map((t) => (
                  <span key={t} className="chip text-xs">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Seasonal server */}
            <div className="bg-white rounded-3xl border border-[rgba(23,63,95,0.14)] p-8 hover:shadow-md transition-all duration-200">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-[#F7FAFC] border border-[rgba(23,63,95,0.14)] flex items-center justify-center shrink-0 text-2xl">
                    ☕
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-[#172033] text-xl">
                      Seasonal Server
                    </h3>
                    <p className="text-[#4B5B70] font-medium text-base mt-0.5">
                      Restaurants and coffee shops
                    </p>
                    <p className="text-[#4B5B70] text-sm mt-0.5">Tunisia</p>
                  </div>
                </div>
                <span className="chip text-xs">Summer periods</span>
              </div>
              <p className="text-[#4B5B70] leading-relaxed text-base">
                Worked directly with customers in fast-paced environments,
                developing communication, active listening, teamwork,
                organization, time management, and composure during busy
                periods.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── EDUCATION ────────────────────────────────────────────────── */
function EducationSection() {
  const { ref, visible } = useScrollReveal()

  const achievements = [
    { label: "Final-Year Project", value: "17.5/20", color: "success" },
    { label: "Final Assessment", value: "Very Good", color: "success" },
    { label: "HACKATHON ISIMED 3.0", value: "3rd Place 🏆", color: "teal" },
    { label: "Cybersecurity Training", value: "Certificate", color: "blue" },
    { label: "University Football", value: "Team Member", color: "blue" },
  ]

  return (
    <section
      id="education"
      aria-labelledby="education-heading"
      className="py-24 bg-white"
    >
      <div className="max-w-300 mx-auto px-5 sm:px-8">
        <div ref={ref} className={`reveal ${visible ? "visible" : ""}`}>
          <div className="grid lg:grid-cols-2 gap-14 items-start">
            <div>
              <p className="text-[#2563EB] text-sm font-semibold tracking-widest uppercase mb-3">
                Education
              </p>
              <h2
                id="education-heading"
                className="font-heading font-bold text-[#172033] mb-8"
                style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}
              >
                Academic background
              </h2>
              <div className="space-y-5">
                <div className="bg-[#E8EEF4] rounded-2xl border border-[rgba(23,63,95,0.14)] p-6 hover:shadow-md transition-all duration-200">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <h3 className="font-heading font-bold text-[#172033] text-lg">
                        Higher Institute of Computer Science of Medenine
                      </h3>
                      <p className="text-[#2563EB] font-semibold text-base mt-1">
                        Licence Degree in Computer Science
                      </p>
                    </div>
                    <span className="chip chip-blue text-xs shrink-0">
                      May 2026
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 mt-4">
                    <div className="bg-[#D7E8F7] rounded-xl p-3 text-center">
                      <div className="text-xl font-extrabold font-heading text-[#2563EB]">
                        14.55
                      </div>
                      <div className="text-xs text-[#4B5B70] mt-0.5">
                        General average /20
                      </div>
                    </div>
                    <div className="bg-[#F0FDF4] rounded-xl p-3 text-center">
                      <div className="text-xl font-extrabold font-heading text-success">
                        17.5
                      </div>
                      <div className="text-xs text-[#4B5B70] mt-0.5">
                        Final-year project /20
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-[#E8EEF4] rounded-2xl border border-[rgba(23,63,95,0.14)] p-6 hover:shadow-md transition-all duration-200">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-heading font-bold text-[#172033] text-lg">
                        Hreireia 2 High School
                      </h3>
                      <p className="text-[#2563EB] font-semibold text-base mt-1">
                        Baccalaureate in Mathematics
                      </p>
                    </div>
                    <span className="chip text-xs shrink-0">2023</span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <p className="text-[#2563EB] text-sm font-semibold tracking-widest uppercase mb-3">
                Achievements
              </p>
              <h2
                className="font-heading font-bold text-[#172033] mb-8"
                style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}
              >
                Highlights
              </h2>
              <div className="space-y-3">
                {achievements.map((a, i) => (
                  <div
                    key={i}
                    className={`flex items-center justify-between rounded-2xl border p-5 transition-all duration-200 hover:shadow-sm ${
                      a.color === "success"
                        ? "bg-[#F0FDF4] border-[#BBF7D0]"
                        : a.color === "teal"
                          ? "bg-[#E8F8F5] border-[rgba(15,139,141,0.3)]"
                          : "bg-[#D7E8F7] border-[rgba(37,99,235,0.3)]"
                    }`}
                  >
                    <span className="text-[#4B5B70] text-sm font-medium">
                      {a.label}
                    </span>
                    <span
                      className={`font-heading font-bold text-base ${
                        a.color === "success"
                          ? "text-success"
                          : a.color === "teal"
                            ? "text-[#0F8B8D]"
                            : "text-[#2563EB]"
                      }`}
                    >
                      {a.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── SKILLS ───────────────────────────────────────────────────── */
function SkillsSection() {
  const { ref, visible } = useScrollReveal()

  const groups = [
    {
      title: "Backend & APIs",
      color: "blue",
      skills: [
        "Python",
        "Django",
        "Django REST Framework",
        "REST APIs",
        "CRUD Operations",
        "JWT Authentication",
        "Role-Based Access Control",
      ],
    },
    {
      title: "Frontend",
      color: "teal",
      skills: [
        "React",
        "TypeScript",
        "JavaScript",
        "HTML5",
        "CSS3",
        "Tailwind CSS",
        "Vite",
        "Axios",
      ],
    },
    {
      title: "Data & Analytics",
      color: "blue",
      skills: [
        "Python",
        "Pandas",
        "OpenPyXL",
        "MySQL",
        "SQL",
        "Data Validation",
        "Data Aggregation",
        "KPI Analytics",
        "Data Visualization",
        "Excel Processing",
      ],
    },
    {
      title: "AI Foundations",
      color: "teal",
      skills: [
        "Prophet",
        "scikit-learn",
        "Data Preparation",
        "Time-Series Forecasting Basics",
        "Model Evaluation Metrics",
        "Google Colab",
      ],
    },
    {
      title: "Tools & Practices",
      color: "blue",
      skills: [
        "Git",
        "GitHub",
        "Postman",
        "VS Code",
      ],
    },
    {
      title: "Professional Strengths",
      color: "teal",
      skills: [
        "Analytical Reasoning",
        "Collaborative Delivery",
        "Rapid Adaptation",
        "Intercultural Awareness",
        "Ownership",
        "Self-Directed Learning",
        "Active Listening",
        "Customer Communication",
      ],
    },
  ]

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="py-24 bg-[#E8EEF4]"
    >
      <div className="max-w-300 mx-auto px-5 sm:px-8">
        <div ref={ref} className={`reveal ${visible ? "visible" : ""}`}>
          <div className="text-center mb-14">
            <p className="text-[#2563EB] text-sm font-semibold tracking-widest uppercase mb-3">
              Skills
            </p>
            <h2
              id="skills-heading"
              className="font-heading font-bold text-[#172033]"
              style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}
            >
              Technology and capabilities
            </h2>
          </div>
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {groups.map((group, i) => (
              <div
                key={i}
                className={`rounded-2xl border p-6 hover:shadow-md transition-all duration-200 ${
                  group.color === "teal"
                    ? "bg-[#E8F8F5] border-[rgba(15,139,141,0.3)]"
                    : "bg-white border-[rgba(23,63,95,0.14)]"
                }`}
              >
                <h3
                  className={`font-heading font-bold text-base mb-4 ${
                    group.color === "teal" ? "text-[#0F8B8D]" : "text-[#2563EB]"
                  }`}
                >
                  {group.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className={`chip text-xs ${
                        group.color === "teal" ? "chip-teal" : ""
                      }`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── ADDITIONAL EXPERIENCE ────────────────────────────────────── */
function AdditionalSection() {
  const { ref, visible } = useScrollReveal()

  const cards = [
    {
      icon: "☕",
      title: "Customer-facing experience",
      text: "Seasonal work in restaurants and coffee shops strengthened communication, active listening, organization, teamwork, and the ability to remain composed during busy periods.",
    },
    {
      icon: "⚽",
      title: "University football",
      text: "Playing on the university football team reinforced discipline, consistency, shared responsibility, and contribution to a collective objective.",
    },
    {
      icon: "🔐",
      title: "Cybersecurity training",
      text: "Participated in a cybersecurity training day and received a Certificate of Participation.",
    },
  ]

  return (
    <section aria-labelledby="additional-heading" className="py-24 bg-white">
      <div className="max-w-300 mx-auto px-5 sm:px-8">
        <div ref={ref} className={`reveal ${visible ? "visible" : ""}`}>
          <p className="text-[#2563EB] text-sm font-semibold tracking-widest uppercase mb-3">
            Beyond technical work
          </p>
          <h2
            id="additional-heading"
            className="font-heading font-bold text-[#172033] mb-10"
            style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}
          >
            Additional experience
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {cards.map((card, i) => (
              <div
                key={i}
                className="bg-[#E8EEF4] rounded-2xl border border-[rgba(23,63,95,0.14)] p-6 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className="text-3xl mb-4">{card.icon}</div>
                <h3 className="font-heading font-bold text-[#172033] text-lg mb-3">
                  {card.title}
                </h3>
                <p className="text-[#4B5B70] text-sm leading-relaxed">
                  {card.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── CONTACT ──────────────────────────────────────────────────── */
function ContactSection() {
  const { ref, visible } = useScrollReveal()

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="py-24 bg-[#E8EEF4]"
    >
      <div className="max-w-300 mx-auto px-5 sm:px-8">
        <div ref={ref} className={`reveal ${visible ? "visible" : ""}`}>
          <div className="bg-white rounded-3xl border border-[rgba(23,63,95,0.14)] p-10 sm:p-14 max-w-3xl mx-auto text-center">
            {/* Glow accent */}
            <div className="w-16 h-16 rounded-2xl bg-[#D7E8F7] border border-[rgba(37,99,235,0.3)] flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-8 h-8 text-[#2563EB]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>

            <p className="text-[#2563EB] text-sm font-semibold tracking-widest uppercase mb-4">
              Get in touch
            </p>
            <h2
              id="contact-heading"
              className="font-heading font-bold text-[#172033] mb-4"
              style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}
            >
              Let’s discuss an opportunity
            </h2>
            <p className="text-[#4B5B70] leading-relaxed text-base mb-8 max-w-xl mx-auto">
              I am currently seeking Work-Study "Alternance" opportunities
              in AI, Data, full-stack development, or another technology
              environment that supports meaningful learning and contribution.
            </p>

            {/* Contact details */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8 text-left">
              <a
                href="mailto:haddadmazen25@gmail.com"
                className="flex items-center gap-4 p-4 rounded-2xl border border-[rgba(23,63,95,0.14)] hover:border-[#2563EB] hover:bg-[#D7E8F7] transition-all duration-200 group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#D7E8F7] flex items-center justify-center shrink-0 group-hover:bg-[#2563EB] transition-colors">
                  <svg
                    className="w-5 h-5 text-[#2563EB] group-hover:text-white transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-[#4B5B70] font-medium mb-0.5">
                    Email
                  </p>
                  <p className="text-[#172033] font-semibold text-sm">
                    haddadmazen25@gmail.com
                  </p>
                </div>
              </a>
              <a
                href="tel:+21658830901"
                className="flex items-center gap-4 p-4 rounded-2xl border border-[rgba(23,63,95,0.14)] hover:border-[#0F8B8D] hover:bg-[#E8F8F5] transition-all duration-200 group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#E8F8F5] flex items-center justify-center shrink-0 group-hover:bg-[#0F8B8D] transition-colors">
                  <svg
                    className="w-5 h-5 text-[#0F8B8D] group-hover:text-white transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-[#4B5B70] font-medium mb-0.5">
                    Phone
                  </p>
                  <p className="text-[#172033] font-semibold text-sm">
                    +216 58 830 901
                  </p>
                </div>
              </a>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap justify-center gap-3">
              <a
                href="mailto:haddadmazen25@gmail.com"
                className="flex items-center gap-2 px-5 py-3 bg-[#2563EB] text-white font-semibold rounded-xl hover:bg-[#1E40AF] transition-all duration-200 hover:shadow-lg hover:shadow-blue-200"
              >
                Send an Email
              </a>
              <a
                href={SITE.linkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-3 border border-[rgba(23,63,95,0.14)] text-[#172033] font-semibold rounded-xl hover:border-[#2563EB] hover:text-[#2563EB] transition-all duration-200"
              >
                <LinkedInIcon /> Visit LinkedIn
              </a>
              <a
                href={SITE.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-3 border border-[rgba(23,63,95,0.14)] text-[#172033] font-semibold rounded-xl hover:border-[#172033] hover:text-[#172033] transition-all duration-200"
              >
                <GitHubIcon /> View GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── FOOTER ───────────────────────────────────────────────────── */
function FooterSection() {
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <footer
      className="bg-white border-t border-[rgba(23,63,95,0.14)] py-10"
      role="contentinfo"
    >
      <div className="max-w-300 mx-auto px-5 sm:px-8">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-lg bg-[#2563EB] flex items-center justify-center text-white font-bold text-xs font-heading">
                MH
              </div>
              <span className="font-heading font-bold text-[#172033]">
                Mazen Haddad
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <a
              href={SITE.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-[#4B5B70] hover:text-[#172033] transition-colors p-2"
            >
              <GitHubIcon />
            </a>
            <a
              href={SITE.linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-[#4B5B70] hover:text-[#2563EB] transition-colors p-2"
            >
              <LinkedInIcon />
            </a>
            {showTop && (
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                aria-label="Back to top"
                className="flex items-center gap-2 px-4 py-2 bg-[#F7FAFC] border border-[rgba(23,63,95,0.14)] text-[#4B5B70] text-sm rounded-xl hover:bg-[#D7E8F7] hover:text-[#2563EB] hover:border-[#2563EB] transition-all duration-200"
              >
                ↑ Back to top
              </button>
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ── ICON HELPERS ─────────────────────────────────────────────── */
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

function BarChartIcon({ size = 24 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      fill="none"
      stroke="#2563EB"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
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

function UploadIcon() {
  return (
    <svg
      className="w-6 h-6 text-[#486581]"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
      />
    </svg>
  )
}

function ChartIcon() {
  return (
    <svg
      className="w-6 h-6 text-[#0F9D8A]"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
      />
    </svg>
  )
}
