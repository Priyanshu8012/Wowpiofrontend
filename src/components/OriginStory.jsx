import { Link } from 'react-router-dom';
import { ArrowRight, MapPin } from 'lucide-react';
import Reveal from './motion/Reveal';
import natureImg from '../assets/wowpio-nature-source.png';

export default function OriginStory({ compact = false }) {
  return (
    <section className={`bg-[#F6F4F0] ${compact ? 'py-16 md:py-20' : 'py-20 md:py-28'}`}>
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 md:px-10 lg:grid-cols-12 lg:gap-14">
        <Reveal className="overflow-hidden rounded-2xl lg:col-span-6">
          <img
            src={natureImg}
            alt="WOWPIO origin — Varanasi"
            className="h-[280px] w-full object-cover md:h-[420px]"
          />
        </Reveal>

        <Reveal direction="right" className="lg:col-span-6">
          <p className="font-heading text-[11px] font-bold uppercase tracking-[0.3em] text-[#1E4D6B]">
            Origin chapter
          </p>
          <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-[#0C0C0C] sm:text-4xl">
            Born in Varanasi. Built for everyday purity.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#0C0C0C]/60">
            WOWPIO started with a simple belief: drinking water should feel trustworthy without asking
            for attention. From Tilmapur, Ashapur, we craft sealed packs that carry that standard into
            homes, offices, and partner stores.
          </p>
          <div className="mt-6 flex items-start gap-3 text-sm text-[#0C0C0C]/55">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#C9A259]" />
            Plot No. 118K, Tilmapur, Ashapur, Varanasi, U.P, 221007
          </div>
          {!compact && (
            <Link
              to="/about"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#0C0C0C] px-6 py-3.5 font-heading text-sm font-bold uppercase tracking-[0.12em] text-white hover:bg-[#1E4D6B]"
            >
              Read our journey
              <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </Reveal>
      </div>
    </section>
  );
}
