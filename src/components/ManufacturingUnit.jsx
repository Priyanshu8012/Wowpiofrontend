import { Link } from 'react-router-dom';
import { Factory, MapPin, Calendar, FileBadge, Building2, ArrowRight } from 'lucide-react';
import Reveal, { Stagger, StaggerItem } from './motion/Reveal';
import { manufacturingUnit } from '../data/manufacturing';
import bottlingImg from '../assets/wowpio-bottling-line.png';

const details = [
  {
    icon: MapPin,
    label: 'Place of manufacture',
    value: manufacturingUnit.placeOfMfg,
  },
  {
    icon: Building2,
    label: 'Factory name',
    value: manufacturingUnit.factoryName,
  },
  {
    icon: Calendar,
    label: 'Established / date',
    value: manufacturingUnit.establishedDate,
  },
  {
    icon: FileBadge,
    label: 'Licence number',
    value: manufacturingUnit.licenseNumber,
  },
];

export default function ManufacturingUnit({ compact = false }) {
  return (
    <section className={`bg-[#F6F4F0] ${compact ? 'py-16 md:py-20' : 'py-20 md:py-28'}`}>
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-5">
            <p className="font-heading text-[11px] font-bold uppercase tracking-[0.3em] text-[#1E4D6B]">
              Manufacturing unit
            </p>
            <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-[#0C0C0C] sm:text-4xl">
              Made at Bachcoach — purity with a place
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#0C0C0C]/60">
              {manufacturingUnit.note}
            </p>

            <div className="mt-6 flex items-start gap-3 rounded-2xl border border-[#1E4D6B]/10 bg-white p-4">
              <Factory className="mt-0.5 h-5 w-5 shrink-0 text-[#C9A259]" />
              <div>
                <p className="font-heading text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A259]">
                  Plant address
                </p>
                <p className="mt-1 text-sm leading-relaxed text-[#0C0C0C]/70">
                  {manufacturingUnit.address}
                </p>
              </div>
            </div>

            {compact && (
              <Link
                to="/manufacturing"
                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#0C0C0C] px-6 py-3.5 font-heading text-sm font-bold uppercase tracking-[0.12em] text-white hover:bg-[#1E4D6B]"
              >
                View unit details
                <ArrowRight className="h-4 w-4" />
              </Link>
            )}
          </Reveal>

          <Reveal direction="right" className="lg:col-span-7">
            <div className="overflow-hidden rounded-2xl">
              <img
                src={bottlingImg}
                alt="WOWPIO manufacturing unit"
                className="h-[260px] w-full object-cover md:h-[360px]"
              />
            </div>
          </Reveal>
        </div>

        <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {details.map(({ icon: Icon, label, value }) => (
            <StaggerItem
              key={label}
              className="rounded-2xl border border-[#1E4D6B]/10 bg-white p-5"
            >
              <Icon className="h-5 w-5 text-[#1E4D6B]" />
              <p className="mt-4 font-heading text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A259]">
                {label}
              </p>
              <p className="mt-2 font-heading text-base font-bold leading-snug text-[#0C0C0C]">
                {value}
              </p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
