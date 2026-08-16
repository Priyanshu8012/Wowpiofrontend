import { useEffect, useState } from 'react';
import { Search, X } from 'lucide-react';
import Reveal from './motion/Reveal';
import { getBatches } from '../api/batch.api.js';
import { manufacturingUnit } from '../data/manufacturing';

export default function BatchCoachTable() {
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const data = await getBatches();
        if (alive) setBatches(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Failed to load batches', err);
        if (alive) setBatches([]);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  const factoryNameOf = (row) =>
    row.factoryName || manufacturingUnit.factoryName;

  const licenseOf = (row) =>
    row.licenseNumber || manufacturingUnit.licenseNumber || 'FSSAI Licensed';

  const filteredBatches = batches.filter((row) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    const batchCode = (row.batchCode || '').toLowerCase();
    const factoryName = factoryNameOf(row).toLowerCase();
    const address = (row.address || '').toLowerCase();
    const licenseNumber = licenseOf(row).toLowerCase();
    return (
      batchCode.includes(query) ||
      factoryName.includes(query) ||
      address.includes(query) ||
      licenseNumber.includes(query)
    );
  });

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <Reveal>
          <p className="font-heading text-[11px] font-bold uppercase tracking-[0.3em] text-[#1E4D6B]">
            Bachcoach · Batch log
          </p>
          <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-[#0C0C0C] sm:text-4xl">
            Batch, factory, and licence
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#0C0C0C]/60">
            Live production records from our manufacturing unit — batch code, factory name,
            plant address, and licence number for each batch.
          </p>
        </Reveal>

        {/* Search Bar */}
        <Reveal delay={0.03} className="mt-8 flex justify-end">
          <div className="relative w-full sm:max-w-xs md:max-w-sm">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
              <Search className="h-4 w-4 text-[#1E4D6B]/50" />
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search batches..."
              className="w-full pl-10 pr-10 py-2.5 bg-white border border-[#1E4D6B]/15 rounded-xl font-heading text-sm text-[#0C0C0C] placeholder-[#0C0C0C]/45 focus:outline-none focus:ring-2 focus:ring-[#1E4D6B]/20 focus:border-[#1E4D6B]/40 transition-all duration-300 shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-[#0C0C0C]/45 hover:text-[#0C0C0C]/75 transition-colors"
                type="button"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </Reveal>

        <Reveal delay={0.06} className="mt-4 overflow-hidden rounded-2xl border border-[#1E4D6B]/12 bg-[#F6F4F0]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left">
              <thead>
                <tr className="border-b border-[#1E4D6B]/10 bg-[#0C0C0C] text-[10px] font-heading uppercase tracking-[0.18em] text-white/70">
                  <th className="px-5 py-4 font-bold">Batch code</th>
                  <th className="px-5 py-4 font-bold">Factory name</th>
                  <th className="px-5 py-4 font-bold">Address</th>
                  <th className="px-5 py-4 font-bold">Licence number</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={4} className="px-5 py-12 text-center text-sm text-[#0C0C0C]/45">
                      Loading batch records…
                    </td>
                  </tr>
                ) : batches.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-5 py-12 text-center text-sm text-[#0C0C0C]/45">
                      No batch records published yet. Add rows from Admin → Batch log.
                    </td>
                  </tr>
                ) : filteredBatches.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-5 py-12 text-center text-sm text-[#0C0C0C]/45">
                      No matching records found for "{searchQuery}".
                    </td>
                  </tr>
                ) : (
                  filteredBatches.map((row, i) => (
                    <tr
                      key={row._id}
                      className={`border-b border-[#1E4D6B]/08 ${
                        i % 2 === 0 ? 'bg-white/60' : 'bg-transparent'
                      }`}
                    >
                      <td className="px-5 py-4 font-mono text-sm font-semibold text-[#1E4D6B]">
                        {row.batchCode || '—'}
                      </td>
                      <td className="px-5 py-4 font-heading text-sm font-bold text-[#0C0C0C]">
                        {factoryNameOf(row)}
                      </td>
                      <td className="max-w-[280px] px-5 py-4 text-sm leading-snug text-[#0C0C0C]/65">
                        {row.address}
                      </td>
                      <td className="px-5 py-4 font-mono text-xs text-[#0C0C0C]/70">
                        {licenseOf(row)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
