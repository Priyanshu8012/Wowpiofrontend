import Reveal, { Stagger, StaggerItem } from './motion/Reveal';
import { batchParams } from '../data/brand';

export default function BatchQuality() {
  return (
    <section className="bg-[#F6F4F0] py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <div className="grid items-end gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="font-heading text-[11px] font-bold uppercase tracking-[0.3em] text-[#1E4D6B]">
              Every batch tested
            </p>
            <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-[#0C0C0C] sm:text-4xl">
              Quality you can read in the numbers
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-[#0C0C0C]/60">
              Before water moves to sealed packaging, we validate the parameters that shape taste, safety,
              and everyday drinkability — so every pack feels consistent.
            </p>
          </Reveal>

          <Stagger className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
            {batchParams.map((p) => (
              <StaggerItem
                key={p.key}
                className="rounded-2xl border border-[#1E4D6B]/10 bg-white p-5"
              >
                <p className="font-heading text-[11px] font-bold uppercase tracking-[0.22em] text-[#C9A259]">
                  {p.key}
                </p>
                <p className="mt-2 font-heading text-2xl font-extrabold text-[#0C0C0C]">{p.value}</p>
                <p className="mt-1 text-sm text-[#0C0C0C]/50">{p.note}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
