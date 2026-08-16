import { Link } from 'react-router-dom';
import PageHero from './PageHero';
import Reveal from './motion/Reveal';
import { contactData } from '../data/contact';

export default function LegalDocument({
  title,
  subtitle,
  crumb,
  updated = '8 August 2026',
  sections = [],
  related = [],
}) {
  return (
    <>
      <PageHero
        title={title}
        subtitle={subtitle}
        crumbs={[{ label: crumb || title }]}
      />

      <section className="bg-[#F6F4F0] pb-20 md:pb-28">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 md:px-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-3">
            <div className="lg:sticky lg:top-28">
              <p className="font-heading text-[11px] font-bold uppercase tracking-[0.24em] text-[#1E4D6B]">
                On this page
              </p>
              <nav className="mt-4 space-y-2">
                {sections.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className="block text-sm text-[#0C0C0C]/55 transition-colors hover:text-[#C9A259]"
                  >
                    {s.title}
                  </a>
                ))}
              </nav>

              {related.length > 0 && (
                <div className="mt-10 border-t border-[#0C0C0C]/10 pt-8">
                  <p className="font-heading text-[11px] font-bold uppercase tracking-[0.24em] text-[#1E4D6B]">
                    Related
                  </p>
                  <ul className="mt-4 space-y-2">
                    {related.map((r) => (
                      <li key={r.to}>
                        <Link
                          to={r.to}
                          className="text-sm text-[#0C0C0C]/55 transition-colors hover:text-[#C9A259]"
                        >
                          {r.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </Reveal>

          <div className="lg:col-span-9">
            <Reveal>
              <p className="font-heading text-[11px] font-bold uppercase tracking-[0.22em] text-[#C9A259]">
                Last updated · {updated}
              </p>
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-[#0C0C0C]/60">
                This policy applies to {contactData.brandName} ({contactData.website}) and related
                services operated from {contactData.address}. For questions, write to{' '}
                <a
                  href={`mailto:${contactData.careEmail}`}
                  className="font-medium text-[#1E4D6B] underline decoration-[#1E4D6B]/25 underline-offset-2 hover:text-[#C9A259]"
                >
                  {contactData.careEmail}
                </a>
                .
              </p>
            </Reveal>

            <div className="mt-12 space-y-12">
              {sections.map((section, i) => (
                <Reveal key={section.id} delay={Math.min(i * 0.04, 0.2)}>
                  <article id={section.id} className="scroll-mt-28">
                    <h2 className="font-heading text-2xl font-extrabold tracking-tight text-[#0C0C0C]">
                      {section.title}
                    </h2>
                    <div className="mt-4 space-y-4 text-base leading-relaxed text-[#0C0C0C]/65">
                      {section.paragraphs?.map((p) => (
                        <p key={p}>{p}</p>
                      ))}
                      {section.bullets?.length > 0 && (
                        <ul className="space-y-2 border-l-2 border-[#C9A259]/40 pl-5">
                          {section.bullets.map((b) => (
                            <li key={b}>{b}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.1} className="mt-16 rounded-2xl bg-[#0C0C0C] px-6 py-8 md:px-8">
              <p className="font-heading text-[11px] font-bold uppercase tracking-[0.24em] text-[#C9A259]">
                Need clarity?
              </p>
              <h3 className="mt-3 font-heading text-xl font-bold text-white md:text-2xl">
                Our team is happy to help with privacy or cookie questions.
              </h3>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/contact"
                  className="inline-flex rounded-xl bg-[#C9A259] px-5 py-3 font-heading text-sm font-bold uppercase tracking-[0.12em] text-white hover:bg-[#A8893F]"
                >
                  Contact support
                </Link>
                <a
                  href={`mailto:${contactData.careEmail}`}
                  className="inline-flex rounded-xl border border-white/20 px-5 py-3 font-heading text-sm font-bold uppercase tracking-[0.12em] text-white hover:border-white/40"
                >
                  Email care
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
