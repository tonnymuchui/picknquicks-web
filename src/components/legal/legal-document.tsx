import Link from 'next/link';

interface LegalSection {
  title: string;
  paragraphs: readonly string[];
  items?: readonly string[];
}

interface LegalDocumentProps {
  eyebrow: string;
  intro: string;
  sections: readonly LegalSection[];
  title: string;
}

export function LegalDocument({ eyebrow, intro, sections, title }: LegalDocumentProps) {
  return (
    <main className="bg-[#f7f5f2] text-[#1f1c17]">
      <div className="mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-24">
        <header className="border-b border-black/15 pb-10 sm:pb-14">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#9a5d3b]">
            {eyebrow}
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-[-0.045em] sm:text-6xl">
            {title}
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-black/60 sm:text-lg">{intro}</p>
          <p className="mt-5 text-xs font-medium uppercase tracking-[0.1em] text-black/40">
            Last updated 2 September 2026
          </p>
        </header>

        <div className="divide-y divide-black/10">
          {sections.map((section, index) => (
            <section
              key={section.title}
              aria-labelledby={`legal-section-${index}`}
              className="grid gap-4 py-8 sm:grid-cols-[3rem_minmax(0,1fr)] sm:gap-6 sm:py-10"
            >
              <span className="text-xs font-semibold tabular-nums text-black/35">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div>
                <h2
                  className="text-xl font-semibold tracking-[-0.025em] sm:text-2xl"
                  id={`legal-section-${index}`}
                >
                  {section.title}
                </h2>
                <div className="mt-4 space-y-4 text-sm leading-7 text-black/65 sm:text-base sm:leading-8">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  {section.items ? (
                    <ul className="list-disc space-y-2 pl-5 marker:text-black/35">
                      {section.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </div>
            </section>
          ))}
        </div>

        <aside className="mt-6 border border-black/15 bg-white p-6 sm:flex sm:items-center sm:justify-between sm:gap-8 sm:p-8">
          <div>
            <h2 className="text-lg font-semibold">Questions about this document?</h2>
            <p className="mt-2 text-sm leading-6 text-black/55">
              Contact PickNQuicks through your order details or our order-support page.
            </p>
          </div>
          <Link
            className="mt-5 inline-flex min-h-11 shrink-0 items-center justify-center bg-black px-5 text-xs font-semibold uppercase tracking-[0.1em] text-white transition-colors hover:bg-black/75 sm:mt-0"
            href="/track-order"
          >
            Order support
          </Link>
        </aside>
      </div>
    </main>
  );
}
