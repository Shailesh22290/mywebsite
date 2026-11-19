import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Copy, Check, ExternalLink, ArrowLeft } from 'lucide-react';
import { theses } from '@/data/theses';

const Todo = ({ children }) => (
  <span className="inline-block px-2 py-0.5 rounded bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200 text-sm font-mono">
    [TODO: {children}]
  </span>
);

// Shows a TODO box until the image file exists in public/.
const Figure = ({ src, alt, caption }) => {
  const [missing, setMissing] = useState(false);
  return (
    <figure className="my-8">
      {missing ? (
        <div className="flex items-center justify-center h-48 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600">
          <Todo>add figure public{src}</Todo>
        </div>
      ) : (
        <img src={src} alt={alt} loading="lazy" onError={() => setMissing(true)} className="w-full rounded-lg border border-gray-200 dark:border-gray-700" />
      )}
      {caption && <figcaption className="mt-2 text-sm text-gray-500 dark:text-gray-400 text-center">{caption}</figcaption>}
    </figure>
  );
};

const Stats = ({ items }) => (
  <dl className="grid grid-cols-2 sm:grid-cols-3 gap-4 my-6">
    {items.map((s) => (
      <div key={s.label} className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
        <dt className="sr-only">{s.label}</dt>
        <dd className="text-2xl font-bold text-blue-600 dark:text-blue-400">{s.value}</dd>
        <dd className="mt-1 text-xs text-gray-600 dark:text-gray-300 leading-snug">{s.label}</dd>
      </div>
    ))}
  </dl>
);

const Section = ({ title, children }) => (
  <section className="py-8 border-t border-gray-200 dark:border-gray-700">
    {title && <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{title}</h2>}
    {children}
  </section>
);

const ThesisPage = () => {
  const { id } = useParams();
  const t = theses[id];
  const [copied, setCopied] = useState(false);

  if (!t) return <div className="text-center py-16">404 - Page Not Found</div>;

  const copyBibtex = async () => {
    try {
      await navigator.clipboard.writeText(t.bibtex);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked; text is still selectable */
    }
  };

  const p = 'text-gray-700 dark:text-gray-300 leading-relaxed mb-4';

  return (
    <article className="max-w-[760px] mx-auto px-4 sm:px-6 pt-28 pb-16">
      <Helmet>
        <title>{`${t.pageTitle} – Shailesh Kachhi`}</title>
        <meta name="description" content={t.cardBlurb} />
      </Helmet>

      <Link to="/" className="inline-flex items-center gap-1 text-sm text-blue-600 dark:text-blue-400 hover:underline mb-6">
        <ArrowLeft className="w-4 h-4" /> Home
      </Link>

      <header className="pb-8">
        {t.ongoing && (
          <span className="inline-block mb-3 px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200">
            Ongoing
          </span>
        )}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white leading-tight">{t.title}</h1>
        <p className="mt-3 text-gray-500 dark:text-gray-400">{t.subtitle}</p>
      </header>

      <Section>
        <p className={p}>{t.intro}</p>
        <dl className="text-sm space-y-1">
          {t.meta.map((m) => (
            <div key={m.label} className="flex flex-wrap gap-x-2">
              <dt className="font-semibold text-gray-900 dark:text-white">{m.label}:</dt>
              <dd className="text-gray-700 dark:text-gray-300">{m.value}</dd>
            </div>
          ))}
        </dl>
        {t.heroFigure && <Figure {...t.heroFigure} />}
      </Section>

      {t.summary.length > 0 && (
        <Section title="Summary">
          {t.summary.map((s) => <p key={s} className={p}>{s}</p>)}
          {t.summaryFigures?.map((f) => <Figure key={f.src} {...f} />)}
          {t.summaryFigure && <Figure {...t.summaryFigure} />}
        </Section>
      )}

      {t.stats.length > 0 && (
        <Section title="Key results">
          <Stats items={t.stats} />
        </Section>
      )}

      {(t.links.length > 0 || t.bibtex) && (
        <Section title="Publications & resources">
          <div className="flex flex-wrap gap-3">
            {t.links.map((l) =>
              l.url ? (
                <a key={l.label} href={l.url} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors">
                  {l.label} <ExternalLink className="w-4 h-4" />
                </a>
              ) : (
                <span key={l.label} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-dashed border-gray-300 dark:border-gray-600 text-sm text-gray-500 dark:text-gray-400">
                  {l.label} <Todo>{l.todo}</Todo>
                </span>
              )
            )}
          </div>
          {t.bibtex && (
            <div className="relative mt-6">
              <button onClick={copyBibtex} aria-label="Copy BibTeX"
                className="absolute top-2 right-2 inline-flex items-center gap-1 px-2 py-1 rounded bg-gray-700 text-white text-xs hover:bg-gray-600">
                {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />} {copied ? 'Copied' : 'Copy'}
              </button>
              <pre className="p-4 pt-10 rounded-lg bg-gray-900 text-green-300 text-xs font-mono overflow-x-auto">{t.bibtex}</pre>
            </div>
          )}
        </Section>
      )}

      {t.highlights.length > 0 && (
        <Section title="Highlights of the research">
          {t.highlights.map((h) => (
            <div key={h.title} className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{h.title}</h3>
              <p className={p}>{h.text}</p>
              {h.note && <p className="text-sm italic text-gray-500 dark:text-gray-400 -mt-2 mb-4">{h.note}</p>}
              {h.stats && <Stats items={h.stats} />}
              {h.figure && <Figure {...h.figure} />}
            </div>
          ))}
        </Section>
      )}

      {t.presentations.length > 0 && (
        <Section title="Presentations">
          <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
            {t.presentations.map((pr) => (
              <li key={pr.label}>
                {pr.url ? (
                  <a href={pr.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">{pr.label}</a>
                ) : (
                  <>{pr.label} <Todo>{pr.todo}</Todo></>
                )}
              </li>
            ))}
          </ul>
        </Section>
      )}

      {t.acknowledgements && (
        <Section title="Acknowledgements">
          <p className={p}>{t.acknowledgements}</p>
        </Section>
      )}

      <footer className="pt-8 border-t border-gray-200 dark:border-gray-700 text-sm text-gray-500 dark:text-gray-400">
        Last updated: November 2026
      </footer>
    </article>
  );
};

export default ThesisPage;
