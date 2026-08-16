import { Link } from 'react-router-dom';
import { ArrowRight, FileText } from 'lucide-react';
import Reveal, { Stagger, StaggerItem } from './motion/Reveal';
import { franchiseKit } from '../data/brand';
import { waHref } from '../data/contact';

export default function FranchiseKit() {
  return (
    <section className="bg-[#F6F4F0] py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <Reveal className="max-w-2xl">
          <p className="font-heading text-[11px] font-bold uppercase tracking-[0.3em] text-[#1E4D6B]">
            Franchise kit
          </p>
          <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-[#0C0C0C] sm:text-4xl">
            Partner economics, without the fog
          </h2>
          <p className="mt-4 text-base text-[#0C0C0C]/55">
            Territory, supply, brand support, and a clear growth path — the essentials serious partners ask for first.
          </p>
        </Reveal>

        <Stagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {franchiseKit.map((item) => (
            <StaggerItem
              key={item.title}
              className="rounded-2xl border border-[#1E4D6B]/10 bg-white p-5"
            >
              <h3 className="font-heading text-base font-bold text-[#0C0C0C]">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#0C0C0C]/55">{item.text}</p>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.08} className="mt-10 flex flex-wrap gap-3">
          <a
            href={waHref("Hi WOWPIO, I'd like franchise / distributor details for my city.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-[#C9A259] px-6 py-3.5 font-heading text-sm font-bold uppercase tracking-[0.12em] text-[#0C0C0C] hover:bg-[#A8893F]"
          >
            Ask on WhatsApp
            <ArrowRight className="h-4 w-4" />
          </a>
          <Link
            to="/brochure"
            className="inline-flex items-center gap-2 rounded-xl border border-[#1E4D6B]/20 bg-white px-6 py-3.5 font-heading text-sm font-bold uppercase tracking-[0.12em] text-[#1E4D6B] hover:border-[#1E4D6B]/40"
          >
            <FileText className="h-4 w-4" />
            Brand brochure
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
