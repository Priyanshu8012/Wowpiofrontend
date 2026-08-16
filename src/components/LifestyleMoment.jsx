import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Reveal from './motion/Reveal';
import natureImg from '../assets/wowpio-nature-source.png';
import bottleImg from '../assets/wowpio-bottle.png';

export default function LifestyleMoment() {
  return (
    <section className="relative overflow-hidden bg-[#0C0C0C]">
      <div className="absolute inset-0">
        <img src={natureImg} alt="" className="h-full w-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0C0C0C] via-[#0C0C0C]/75 to-[#0C0C0C]/40" />
      </div>

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-10 px-5 py-20 md:px-10 md:py-28 lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          <p className="font-heading text-[11px] font-bold uppercase tracking-[0.3em] text-[#C9A259]">
            First pour
          </p>
          <h2 className="mt-4 max-w-xl font-heading text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl md:text-[2.75rem]">
            The moment the seal breaks — freshness should feel inevitable
          </h2>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-white/60">
            One strong lifestyle frame: cold pack, clean pour, quiet confidence. No clutter — just the
            product doing its job.
          </p>
          <Link
            to="/gallery"
            className="mt-8 inline-flex items-center gap-2 rounded-xl border border-white/20 px-6 py-3.5 font-heading text-sm font-bold uppercase tracking-[0.12em] text-white hover:border-[#C9A259]/50 hover:text-[#C9A259]"
          >
            See the gallery
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>

        <Reveal direction="right" className="flex justify-center lg:col-span-5">
          <img
            src={bottleImg}
            alt="WOWPIO bottle"
            className="h-[320px] w-auto object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.55)] md:h-[400px]"
          />
        </Reveal>
      </div>
    </section>
  );
}
