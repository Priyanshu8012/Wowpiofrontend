import { Link } from 'react-router-dom';
import { Download, ArrowLeft, Phone, Mail, MapPin } from 'lucide-react';
import PageHero from '../components/PageHero';
import { contactData, telHref, waHref } from '../data/contact';
import { certifications, packs, batchParams } from '../data/brand';
import { manufacturingUnit } from '../data/manufacturing';
import BrandLogo from '../components/BrandLogo';

export default function BrochurePage() {
  const download = () => window.print();

  return (
    <>
      <div className="print:hidden">
        <PageHero
          title="Brand Brochure"
          subtitle="WOWPIO at a glance — purity process, packs, and partnership essentials."
          crumbs={[{ label: 'Brochure' }]}
        />
      </div>

      <section className="bg-[#F6F4F0] pb-20 print:bg-white print:pb-0">
        <div className="mx-auto max-w-4xl px-5 md:px-10">
          <div className="mb-8 flex flex-wrap gap-3 print:hidden">
            <button
              type="button"
              onClick={download}
              className="inline-flex items-center gap-2 rounded-xl bg-[#C9A259] px-6 py-3.5 font-heading text-sm font-bold uppercase tracking-[0.12em] text-[#0C0C0C] hover:bg-[#A8893F]"
            >
              <Download className="h-4 w-4" />
              Download / Print PDF
            </button>
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-xl border border-[#1E4D6B]/20 bg-white px-6 py-3.5 font-heading text-sm font-bold uppercase tracking-[0.12em] text-[#1E4D6B]"
            >
              <ArrowLeft className="h-4 w-4" />
              Back home
            </Link>
          </div>

          <article className="rounded-2xl border border-[#1E4D6B]/10 bg-white p-8 shadow-sm md:p-12 print:rounded-none print:border-0 print:shadow-none">
            <div className="flex flex-wrap items-start justify-between gap-6 border-b border-[#0C0C0C]/10 pb-8">
              <BrandLogo size="md" asLink={false} variant="dark" showTagline />
              <div className="text-right text-sm text-[#0C0C0C]/55">
                <p className="font-heading text-[11px] font-bold uppercase tracking-[0.2em] text-[#C9A259]">
                  Brand kit 2026
                </p>
                <p className="mt-1">{contactData.website}</p>
              </div>
            </div>

            <h1 className="mt-8 font-heading text-3xl font-extrabold text-[#0C0C0C]">
              Pure water. Clear conscience. Everyday excellence.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#0C0C0C]/60">
              WOWPIO is packaged drinking water crafted through multi-stage purification, mineral
              balance, and sealed packaging — for homes, offices, and distribution partners.
            </p>

            <h2 className="mt-10 font-heading text-xl font-bold text-[#0C0C0C]">Trust markers</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {certifications.map((c) => (
                <li key={c.code} className="rounded-xl bg-[#F6F4F0] px-4 py-3 text-sm">
                  <strong className="text-[#1E4D6B]">{c.code}</strong> — {c.label}
                </li>
              ))}
            </ul>

            <h2 className="mt-10 font-heading text-xl font-bold text-[#0C0C0C]">Batch quality focus</h2>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {batchParams.map((p) => (
                <li key={p.key} className="text-sm text-[#0C0C0C]/65">
                  <strong>{p.key}:</strong> {p.value} · {p.note}
                </li>
              ))}
            </ul>

            <h2 className="mt-10 font-heading text-xl font-bold text-[#0C0C0C]">Pack formats</h2>
            <ul className="mt-4 space-y-2">
              {packs.map((p) => (
                <li key={p.size} className="text-sm text-[#0C0C0C]/65">
                  <strong>{p.size}</strong> ({p.name}) — {p.bestFor}
                </li>
              ))}
            </ul>

            <h2 className="mt-10 font-heading text-xl font-bold text-[#0C0C0C]">Manufacturing unit</h2>
            <ul className="mt-4 space-y-2 text-sm text-[#0C0C0C]/65">
              <li>
                <strong>Place of manufacture:</strong> {manufacturingUnit.placeOfMfg}
              </li>
              <li>
                <strong>Factory name:</strong> {manufacturingUnit.factoryName}
              </li>
              <li>
                <strong>Date / established:</strong> {manufacturingUnit.establishedDate}
              </li>
              <li>
                <strong>Address:</strong> {manufacturingUnit.address}
              </li>
              <li>
                <strong>Licence number:</strong> {manufacturingUnit.licenseNumber}
              </li>
            </ul>

            <div className="mt-12 space-y-2 border-t border-[#0C0C0C]/10 pt-8 text-sm text-[#0C0C0C]/60">
              <p className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 text-[#C9A259]" />
                <a href={telHref()}>{contactData.helpline}</a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-[#C9A259]" />
                {contactData.supportEmail}
              </p>
              <p className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#C9A259]" />
                {contactData.address}
              </p>
              <a
                href={waHref()}
                className="mt-4 inline-block font-heading text-xs font-bold uppercase tracking-[0.14em] text-[#1E4D6B] print:hidden"
              >
                WhatsApp order →
              </a>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
