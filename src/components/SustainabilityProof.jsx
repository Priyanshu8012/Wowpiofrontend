import { Link } from 'react-router-dom';
import { ArrowRight, Leaf } from 'lucide-react';
import Reveal, { Stagger, StaggerItem } from './motion/Reveal';
import { sustainabilityProof } from '../data/brand';

export default function SustainabilityProof() {
  return (
    <section className="bg-[#0C0C0C] py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Leaf className="mx-auto h-6 w-6 text-[#C9A259]" />
          <p className="mt-4 font-heading text-[11px] font-bold uppercase tracking-[0.3em] text-[#C9A259]">
            Sustainability proof
          </p>
          <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Purity with a lighter footprint
          </h2>
        </Reveal>

        <Stagger className="mt-12 grid gap-5 md:grid-cols-3">
          {sustainabilityProof.map((item) => (
            <StaggerItem
              key={item.stat}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center"
            >
              <p className="font-heading text-xl font-bold text-[#C9A259]">{item.stat}</p>
              <p className="mt-3 text-sm leading-relaxed text-white/55">{item.text}</p>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.08} className="mt-10 text-center">
          <Link
            to="/sustainability"
            className="inline-flex items-center gap-2 font-heading text-sm font-bold uppercase tracking-[0.14em] text-white/70 hover:text-[#C9A259]"
          >
            Our sustainability page
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
