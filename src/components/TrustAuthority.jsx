import { ShieldCheck, FlaskConical, BadgeCheck, Waves } from 'lucide-react';
import Reveal, { Stagger, StaggerItem } from './motion/Reveal';
import { certifications, partners } from '../data/brand';

const icons = [ShieldCheck, BadgeCheck, FlaskConical, Waves];

export default function TrustAuthority() {
  return (
    <section className="relative overflow-hidden bg-[#0C0C0C] py-16 md:py-20">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#C9A259]/40 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 md:px-10">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="font-heading text-[11px] font-bold uppercase tracking-[0.3em] text-[#C9A259]">
            Verified purity
          </p>
          <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Trust you can taste — and check
          </h2>
          <p className="mt-4 text-base text-white/55">
            Standards, lab discipline, and multi-stage purification — the quiet backbone of a serious water brand.
          </p>
        </Reveal>

        <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {certifications.map((item, i) => {
            const Icon = icons[i % icons.length];
            return (
              <StaggerItem
                key={item.code}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-colors hover:border-[#C9A259]/35"
              >
                <Icon className="h-5 w-5 text-[#C9A259]" />
                <p className="mt-4 font-heading text-lg font-bold text-white">{item.code}</p>
                <p className="mt-1 text-sm font-medium text-white/80">{item.label}</p>
                <p className="mt-2 text-xs leading-relaxed text-white/45">{item.detail}</p>
              </StaggerItem>
            );
          })}
        </Stagger>

        <Reveal delay={0.1} className="mt-14 border-t border-white/10 pt-10">
          <p className="text-center font-heading text-[10px] font-bold uppercase tracking-[0.28em] text-white/35">
            Built for places people trust
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 md:gap-4">
            {partners.map((name) => (
              <span
                key={name}
                className="rounded-full border border-white/10 px-4 py-2 font-heading text-[11px] font-bold uppercase tracking-[0.16em] text-white/55"
              >
                {name}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
