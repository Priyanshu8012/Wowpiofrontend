import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import Reveal, { Stagger, StaggerItem } from './motion/Reveal';
import { packs } from '../data/brand';
import { waHref } from '../data/contact';

export default function PackCompare() {
  return (
    <section className="bg-[#F6F4F0] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="font-heading text-[11px] font-bold uppercase tracking-[0.3em] text-[#1E4D6B]">
            Pack size guide
          </p>
          <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-[#0C0C0C] sm:text-4xl">
            Choose the pour that fits your day
          </h2>
          <p className="mt-4 text-base text-[#0C0C0C]/55">
            Clear formats for personal, home, and office — so buying feels as simple as drinking.
          </p>
        </Reveal>

        <Stagger className="mt-12 grid gap-5 md:grid-cols-3">
          {packs.map((pack) => (
            <StaggerItem
              key={pack.size}
              className={`relative flex flex-col rounded-2xl border p-6 md:p-7 ${
                pack.highlight
                  ? 'border-[#C9A259]/50 bg-[#0C0C0C] text-white shadow-[0_24px_60px_-30px_rgba(201,162,89,0.55)]'
                  : 'border-[#1E4D6B]/10 bg-white text-[#0C0C0C]'
              }`}
            >
              {pack.highlight && (
                <span className="absolute -top-3 left-6 rounded-full bg-[#C9A259] px-3 py-1 font-heading text-[10px] font-bold uppercase tracking-[0.16em] text-[#0C0C0C]">
                  Most chosen
                </span>
              )}
              <p
                className={`font-heading text-[11px] font-bold uppercase tracking-[0.22em] ${
                  pack.highlight ? 'text-[#C9A259]' : 'text-[#1E4D6B]'
                }`}
              >
                {pack.fit}
              </p>
              <h3 className="mt-3 font-heading text-3xl font-extrabold">{pack.size}</h3>
              <p className={`mt-1 font-heading text-lg font-bold ${pack.highlight ? 'text-white' : 'text-[#0C0C0C]'}`}>
                {pack.name}
              </p>
              <p className={`mt-4 flex-1 text-sm leading-relaxed ${pack.highlight ? 'text-white/60' : 'text-[#0C0C0C]/55'}`}>
                {pack.bestFor}
              </p>
              <ul className="mt-5 space-y-2 text-sm">
                {['Sealed hygiene', 'Mineral-balanced taste', 'Ready supply'].map((t) => (
                  <li key={t} className="flex items-center gap-2">
                    <Check className={`h-3.5 w-3.5 ${pack.highlight ? 'text-[#C9A259]' : 'text-[#1E4D6B]'}`} />
                    <span className={pack.highlight ? 'text-white/70' : 'text-[#0C0C0C]/65'}>{t}</span>
                  </li>
                ))}
              </ul>
              <a
                href={waHref(`Hi WOWPIO, I'm interested in the ${pack.size} ${pack.name} pack.`)}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-7 inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3.5 font-heading text-xs font-bold uppercase tracking-[0.14em] ${
                  pack.highlight
                    ? 'bg-[#C9A259] text-[#0C0C0C] hover:bg-[#A8893F]'
                    : 'bg-[#1E4D6B] text-white hover:bg-[#163A52]'
                }`}
              >
                Order {pack.size}
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.08} className="mt-10 text-center">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 font-heading text-sm font-bold uppercase tracking-[0.14em] text-[#1E4D6B] hover:text-[#C9A259]"
          >
            View full range
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
