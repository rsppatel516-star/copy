import { useState } from 'react'
import { BrowserRouter, Link, Route, Routes, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, BookOpen, Check, Code2, Copy, Download, GraduationCap, Layers3, Sparkles } from 'lucide-react'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import Breadcrumb from './components/common/Breadcrumb'
import EmptyState from './components/common/EmptyState'
import Navbar from './components/layout/Navbar'
import PageContainer from './components/layout/PageContainer'
import Footer from './components/layout/Footer'
import { ThemeProvider } from './context/ThemeContext'
import {
  getAdjacentPracticals,
  getAllSubjectsWithCount,
  getPracticalById,
  getPracticalsBySubject,
  getSubjectBySlug,
} from './lib/practical-utils'
import type { Subject } from './types/subject'
import './App.css'

const subjectPalette: Record<string, string> = {
  blue: 'from-blue-500 via-indigo-500 to-cyan-500',
  violet: 'from-violet-500 via-fuchsia-500 to-purple-500',
  emerald: 'from-emerald-500 via-teal-500 to-cyan-500',
  amber: 'from-amber-500 via-orange-500 to-rose-500',
}

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="app-shell min-h-screen bg-slate-100 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/subjects" element={<SubjectsPage />} />
            <Route path="/subjects/:subjectSlug" element={<SubjectPage />} />
            <Route path="/subjects/:subjectSlug/practical/:practicalId" element={<PracticalPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          <Footer />
        </div>
        <Analytics />
        <SpeedInsights />
      </BrowserRouter>
    </ThemeProvider>
  )
}

function HomePage() {
  const subjects = getAllSubjectsWithCount()
  const totalPracticals = subjects.reduce((sum, subject) => sum + (subject.practicalCount ?? 0), 0)

  return (
    <PageContainer className="space-y-12 pb-16">
      <section className="surface-panel hero-panel overflow-hidden rounded-[28px] border border-slate-200 bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)] dark:border-slate-800 dark:bg-slate-900 lg:p-12">
        <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-indigo-700 shadow-sm dark:border-indigo-900/70 dark:bg-indigo-950/60 dark:text-indigo-300">
              <Sparkles size={14} />
              Practical learning hub
            </span>
            <h1 className="mt-5 text-4xl font-black tracking-tight text-slate-900 dark:text-white md:text-5xl">
              Learn by doing with subject-wise practicals.
            </h1>
            <p className="mt-4 max-w-xl text-base text-slate-600 dark:text-slate-300 md:text-lg">
              Explore clean explanations, ready-to-run code samples, and output notes for each practical topic in one organized place.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                to="/subjects"
                className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition duration-200 hover:-translate-y-0.5 hover:bg-indigo-500"
              >
                Browse subjects
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/subjects/subject-1"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                Open first practical
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-indigo-50 p-5 shadow-sm dark:border-slate-800 dark:from-slate-950 dark:to-slate-900">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300">
                <Layers3 size={20} />
              </div>
              <p className="mt-4 text-3xl font-bold text-slate-900 dark:text-white">{subjects.length}</p>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Subjects</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-emerald-50 p-5 shadow-sm dark:border-slate-800 dark:from-slate-950 dark:to-slate-900">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-300">
                <Code2 size={20} />
              </div>
              <p className="mt-4 text-3xl font-bold text-slate-900 dark:text-white">{totalPracticals}</p>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Practicals</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-amber-50 p-5 shadow-sm dark:border-slate-800 dark:from-slate-950 dark:to-slate-900 sm:col-span-2">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-300">
                  <GraduationCap size={20} />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Study flow</p>
                  <p className="text-lg font-semibold text-slate-900 dark:text-white">Theory → code → output</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="grid gap-6 md:grid-cols-3">
        {[
          { title: 'Structured notes', text: 'Every practical is organized with purpose, theory, implementation, and conclusion.' },
          { title: 'Ready code', text: 'Copy the code snippets directly and understand how each concept works in practice.' },
          { title: 'Quick search', text: 'Find the exact practical you need from across all subjects in seconds.' },
        ].map((item) => (
          <div key={item.title} className="surface-panel rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_14px_30px_rgba(15,23,42,0.06)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(99,102,241,0.12)] dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300">
              <BookOpen size={18} />
            </div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">{item.title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{item.text}</p>
          </div>
        ))}
      </div>

      <section className="space-y-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">Subjects</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Pick a subject</h2>
          </div>
          <Link to="/subjects" className="text-sm font-semibold text-indigo-600 transition hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
            View all
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {subjects.map((subject) => (
            <SubjectCard key={subject.id} subject={subject} />
          ))}
        </div>
      </section>
    </PageContainer>
  )
}

function SubjectsPage() {
  const subjects = getAllSubjectsWithCount()

  return (
    <PageContainer className="space-y-8 pb-16">
      <Breadcrumb crumbs={[{ label: 'Subjects' }]} />

      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">Catalog</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white md:text-4xl">
            All subject practicals
          </h1>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {subjects.map((subject) => (
          <SubjectCard key={subject.id} subject={subject} />
        ))}
      </div>
    </PageContainer>
  )
}

function SubjectPage() {
  const { subjectSlug } = useParams()
  const subject = subjectSlug ? getSubjectBySlug(subjectSlug) : undefined

  if (!subject) {
    return (
      <PageContainer>
        <EmptyState
          title="Subject not found"
          description="This subject is not available in the current catalog."
          actionLabel="Back to subjects"
          actionTo="/subjects"
        />
      </PageContainer>
    )
  }

  const practicals = getPracticalsBySubject(subject.id)

  return (
    <PageContainer className="space-y-8 pb-16">
      <Breadcrumb
        crumbs={[
          { label: 'Subjects', to: '/subjects' },
          { label: subject.name },
        ]}
      />

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:p-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="inline-flex items-center rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
              {subject.shortName}
            </span>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 dark:text-white md:text-4xl">
              {subject.name}
            </h1>
          </div>
          <div className="rounded-2xl bg-slate-100 px-4 py-2 text-sm font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            {practicals.length} practical{practicals.length !== 1 ? 's' : ''}
          </div>
        </div>
        <p className="mt-5 max-w-3xl text-base leading-7 text-slate-600 dark:text-slate-300">
          {subject.description}
        </p>
      </section>

      <div className="grid gap-5 lg:grid-cols-2">
        {practicals.map((practical) => (
          <div
            key={practical.id}
            className="surface-panel rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_14px_30px_rgba(15,23,42,0.05)] transition duration-200 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-[0_18px_40px_rgba(79,70,229,0.12)] dark:border-slate-800 dark:bg-slate-900 dark:hover:border-indigo-900"
          >
            <Link to={`/subjects/${subject.slug}/practical/${practical.id}`} className="block">
              <div className="flex items-center justify-between gap-4">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">
                  Practical {practical.number.toString().padStart(2, '0')}
                </span>
                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                  {practical.language}
                </span>
              </div>
              <h2 className="mt-4 text-xl font-bold text-slate-900 dark:text-white">{practical.title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{practical.aim}</p>
              <div className="mt-4 flex items-center justify-between text-sm font-medium text-indigo-600 dark:text-indigo-400">
                <span>Open practical</span>
                <ArrowRight size={16} />
              </div>
            </Link>

            <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2">
              <CopyCodeButton code={practical.code} />
              <DownloadCodeButton
                code={practical.code}
                filename={`${subject.slug}-practical-${practical.number.toString().padStart(2, '0')}.${getFileExtension(practical.language)}`}
              />
            </div>
          </div>
        ))}
      </div>
    </PageContainer>
  )
}

function PracticalPage() {
  const { subjectSlug, practicalId } = useParams()
  const subject = subjectSlug ? getSubjectBySlug(subjectSlug) : undefined

  if (!subject || !practicalId) {
    return (
      <PageContainer>
        <EmptyState
          title="Practical not found"
          description="The requested practical could not be found in this subject."
          actionLabel="Return to subject"
          actionTo={subjectSlug ? `/subjects/${subjectSlug}` : '/subjects'}
        />
      </PageContainer>
    )
  }

  const practical = getPracticalById(subject.id, practicalId)

  if (!practical) {
    return (
      <PageContainer>
        <EmptyState
          title="Practical not found"
          description="This practical does not exist in the selected subject."
          actionLabel="Browse subjects"
          actionTo="/subjects"
        />
      </PageContainer>
    )
  }

  const { prev, next } = getAdjacentPracticals(subject.id, practical.id)

  return (
    <PageContainer className="pb-16">
      <Breadcrumb
        crumbs={[
          { label: 'Subjects', to: '/subjects' },
          { label: subject.name, to: `/subjects/${subject.slug}` },
          { label: `Practical ${practical.number.toString().padStart(2, '0')}` },
        ]}
      />

      <article className="space-y-8">
        <header className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:p-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="inline-flex items-center rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                Practical {practical.number.toString().padStart(2, '0')}
              </span>
              <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 dark:text-white md:text-4xl">
                {practical.title}
              </h1>
            </div>
            <div className="flex flex-wrap gap-2 text-sm">
              <span className="rounded-full bg-slate-100 px-3 py-1.5 text-slate-600 dark:bg-slate-800 dark:text-slate-300">{practical.language}</span>
              <span className="rounded-full bg-emerald-100 px-3 py-1.5 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">{subject.shortName}</span>
            </div>
          </div>
        </header>

        <div className="grid gap-8 xl:grid-cols-[1.4fr_0.6fr]">
          <div className="space-y-8">
            <section className="surface-panel rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
              <h2 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">Aim</h2>
              <p className="text-base leading-7 text-slate-600 dark:text-slate-300">{practical.aim}</p>
            </section>

            <section className="surface-panel rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
              <h2 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">Theory</h2>
              <div className="space-y-4 text-base leading-7 text-slate-600 dark:text-slate-300">
                {practical.theory.split('\n').filter(Boolean).map((paragraph, index) => (
                  <p key={`${practical.id}-theory-${index}`} className="whitespace-pre-line">{paragraph}</p>
                ))}
              </div>
            </section>

            <section className="surface-panel rounded-2xl border border-slate-200 bg-white p-0 dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center justify-between gap-3 border-b border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-800 dark:bg-slate-950/80">
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Code</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">{practical.language}</span>
                  <DownloadCodeButton
                    code={practical.code}
                    filename={`${subject.slug}-practical-${practical.number.toString().padStart(2, '0')}.${getFileExtension(practical.language)}`}
                    compact
                  />
                  <CopyCodeButton code={practical.code} compact />
                </div>
              </div>
              <pre className="code-window overflow-x-auto p-4 text-sm leading-6 text-slate-100">
                <code>{practical.code}</code>
              </pre>
            </section>

            {practical.output && (
              <section className="surface-panel rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
                <h2 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">Output</h2>
                <pre className="whitespace-pre-wrap rounded-xl bg-slate-950 p-4 text-sm leading-6 text-emerald-300">{practical.output}</pre>
              </section>
            )}

            {practical.conclusion && (
              <section className="surface-panel rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
                <h2 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">Conclusion</h2>
                <p className="text-base leading-7 text-slate-600 dark:text-slate-300">{practical.conclusion}</p>
              </section>
            )}
          </div>

          <aside className="space-y-5">
            <div className="surface-panel rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Quick navigation</h3>
              <div className="mt-4 space-y-3">
                {prev ? (
                  <Link
                    to={`/subjects/${subject.slug}/practical/${prev.id}`}
                    className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:border-indigo-200 hover:bg-indigo-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-indigo-900 dark:hover:bg-indigo-950/30"
                  >
                    <span className="inline-flex items-center gap-2"><ArrowLeft size={14} /> Previous</span>
                    <span>{prev.title}</span>
                  </Link>
                ) : (
                  <div className="rounded-xl border border-dashed border-slate-200 px-3 py-2.5 text-sm text-slate-400 dark:border-slate-700 dark:text-slate-500">
                    Start of subject
                  </div>
                )}

                {next ? (
                  <Link
                    to={`/subjects/${subject.slug}/practical/${next.id}`}
                    className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:border-indigo-200 hover:bg-indigo-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-indigo-900 dark:hover:bg-indigo-950/30"
                  >
                    <span className="inline-flex items-center gap-2">Next <ArrowRight size={14} /></span>
                    <span>{next.title}</span>
                  </Link>
                ) : (
                  <div className="rounded-xl border border-dashed border-slate-200 px-3 py-2.5 text-sm text-slate-400 dark:border-slate-700 dark:text-slate-500">
                    End of subject
                  </div>
                )}
              </div>
            </div>

            <div className="surface-panel rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Subject overview</h3>
              <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-300">{subject.description}</p>
              <Link
                to={`/subjects/${subject.slug}`}
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
              >
                Back to all practicals
                <ArrowRight size={14} />
              </Link>
            </div>
          </aside>
        </div>
      </article>
    </PageContainer>
  )
}

function CopyCodeButton({ code, compact = false }: { code: string; compact?: boolean }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1500)
    } catch (error) {
      console.error('Unable to copy code:', error)
    }
  }

  return (
    <button
      type="button"
      onClick={(event) => {
        event.preventDefault()
        event.stopPropagation()
        void handleCopy()
      }}
      className={compact
        ? 'inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 transition duration-200 hover:border-indigo-200 hover:text-indigo-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-indigo-900 dark:hover:text-indigo-400'
        : 'inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition duration-200 hover:border-indigo-200 hover:text-indigo-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-indigo-900 dark:hover:text-indigo-400'}
    >
      {copied ? <Check size={14} /> : <Copy size={14} />}
      {copied ? 'Copied!' : 'Copy this code'}
    </button>
  )
}

function getFileExtension(language: string): string {
  const lang = language.toLowerCase()
  if (lang.includes('python')) return 'py'
  if (lang.includes('sql')) return 'sql'
  if (lang.includes('java')) return 'java'
  if (lang.includes('c++') || lang.includes('cpp')) return 'cpp'
  if (lang.includes('c')) return 'c'
  if (lang.includes('javascript') || lang.includes('js')) return 'js'
  if (lang.includes('typescript') || lang.includes('ts')) return 'ts'
  if (lang.includes('html')) return 'html'
  if (lang.includes('css')) return 'css'
  return 'txt'
}

function DownloadCodeButton({
  code,
  filename,
  compact = false,
}: {
  code: string
  filename: string
  compact?: boolean
}) {
  const handleDownload = () => {
    const blob = new Blob([code], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <button
      type="button"
      onClick={(event) => {
        event.preventDefault()
        event.stopPropagation()
        handleDownload()
      }}
      title={`Download ${filename}`}
      className={
        compact
          ? 'inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 transition duration-200 hover:border-indigo-200 hover:text-indigo-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-indigo-900 dark:hover:text-indigo-400'
          : 'inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition duration-200 hover:border-indigo-200 hover:text-indigo-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-indigo-900 dark:hover:text-indigo-400'
      }
    >
      <Download size={compact ? 13 : 15} />
      <span>Download</span>
    </button>
  )
}

function NotFoundPage() {
  return (
    <PageContainer>
      <EmptyState
        title="Page not found"
        description="The link you followed may be broken or no longer available."
        actionLabel="Go home"
        actionTo="/"
      />
    </PageContainer>
  )
}

function SubjectCard({ subject }: { subject: Subject & { practicalCount?: number } }) {
  const gradient = subjectPalette[subject.color] ?? 'from-indigo-500 via-violet-500 to-sky-500'

  return (
    <Link
      to={`/subjects/${subject.slug}`}
      className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_14px_30px_rgba(15,23,42,0.04)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(79,70,229,0.12)] dark:border-slate-800 dark:bg-slate-900"
    >
      <div className={`h-2 bg-gradient-to-r ${gradient}`} />
      <div className="p-5">
        <div className="flex items-center justify-between gap-3">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200">
            <BookOpen size={18} />
          </span>
          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            {subject.practicalCount ?? 0} items
          </span>
        </div>
        <h3 className="mt-5 text-xl font-bold text-slate-900 dark:text-white">{subject.name}</h3>
        <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{subject.description}</p>
        <div className="mt-5 flex items-center justify-between text-sm font-medium text-indigo-600 dark:text-indigo-400">
          <span>Explore practicals</span>
          <ArrowRight size={16} className="transition group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  )
}

export default App
