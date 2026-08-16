import { useState } from 'react';
import { Building2, CheckCircle2, Send } from 'lucide-react';
import Reveal from './motion/Reveal';
import { submitContact } from '../api/contact.api.js';
import { waHref } from '../data/contact';

const types = ['Office', 'Hotel', 'Event', 'Institution', 'Retail'];

export default function B2BEnquiry() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    type: 'Office',
    message: '',
  });
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setLoading(true);
    try {
      await submitContact({
        name: form.name,
        email: form.email,
        phone: form.phone,
        message: `[B2B · ${form.type}${form.company ? ` · ${form.company}` : ''}]\n${form.message}`,
      });
      setDone(true);
      setForm({ name: '', email: '', phone: '', company: '', type: 'Office', message: '' });
      setTimeout(() => setDone(false), 5000);
    } catch (err) {
      console.error(err);
      alert('Could not send enquiry. Please try WhatsApp or call.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-[#F6F4F0] py-20 md:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 md:px-10 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <p className="font-heading text-[11px] font-bold uppercase tracking-[0.3em] text-[#1E4D6B]">
            B2B supply
          </p>
          <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-[#0C0C0C] sm:text-4xl">
            Offices, hotels & events
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#0C0C0C]/60">
            Need recurring sealed supply for a workplace, property, or gathering? Tell us volume and
            location — we&apos;ll respond with a clear plan.
          </p>
          <a
            href={waHref("Hi WOWPIO, I need B2B / bulk supply details.")}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#1E4D6B] hover:text-[#C9A259]"
          >
            <Building2 className="h-4 w-4" />
            Prefer WhatsApp? Message bulk desk
          </a>
        </Reveal>

        <Reveal delay={0.08} className="lg:col-span-7">
          <form
            onSubmit={onSubmit}
            className="rounded-2xl border border-[#1E4D6B]/10 bg-white p-6 shadow-sm md:p-8"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm">
                <span className="font-heading text-[10px] font-bold uppercase tracking-[0.18em] text-[#0C0C0C]/45">
                  Name
                </span>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="mt-1.5 w-full rounded-xl border border-[#1E4D6B]/15 bg-[#F6F4F0] px-4 py-3 outline-none focus:border-[#C9A259]"
                />
              </label>
              <label className="block text-sm">
                <span className="font-heading text-[10px] font-bold uppercase tracking-[0.18em] text-[#0C0C0C]/45">
                  Work email
                </span>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="mt-1.5 w-full rounded-xl border border-[#1E4D6B]/15 bg-[#F6F4F0] px-4 py-3 outline-none focus:border-[#C9A259]"
                />
              </label>
              <label className="block text-sm">
                <span className="font-heading text-[10px] font-bold uppercase tracking-[0.18em] text-[#0C0C0C]/45">
                  Phone
                </span>
                <input
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="mt-1.5 w-full rounded-xl border border-[#1E4D6B]/15 bg-[#F6F4F0] px-4 py-3 outline-none focus:border-[#C9A259]"
                />
              </label>
              <label className="block text-sm">
                <span className="font-heading text-[10px] font-bold uppercase tracking-[0.18em] text-[#0C0C0C]/45">
                  Company
                </span>
                <input
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                  className="mt-1.5 w-full rounded-xl border border-[#1E4D6B]/15 bg-[#F6F4F0] px-4 py-3 outline-none focus:border-[#C9A259]"
                />
              </label>
            </div>

            <div className="mt-4">
              <p className="font-heading text-[10px] font-bold uppercase tracking-[0.18em] text-[#0C0C0C]/45">
                Requirement type
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {types.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setForm({ ...form, type: t })}
                    className={`rounded-full px-3.5 py-1.5 font-heading text-[11px] font-bold uppercase tracking-[0.12em] ${
                      form.type === t
                        ? 'bg-[#0C0C0C] text-white'
                        : 'bg-[#F6F4F0] text-[#0C0C0C]/55 hover:bg-[#EDE8DF]'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <label className="mt-4 block text-sm">
              <span className="font-heading text-[10px] font-bold uppercase tracking-[0.18em] text-[#0C0C0C]/45">
                Volume & location
              </span>
              <textarea
                required
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="e.g. 40 jars / week for office in Varanasi…"
                className="mt-1.5 w-full resize-none rounded-xl border border-[#1E4D6B]/15 bg-[#F6F4F0] px-4 py-3 outline-none focus:border-[#C9A259]"
              />
            </label>

            <button
              type="submit"
              disabled={loading}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#C9A259] px-6 py-3.5 font-heading text-sm font-bold uppercase tracking-[0.12em] text-[#0C0C0C] hover:bg-[#A8893F] disabled:opacity-60"
            >
              {done ? (
                <>
                  <CheckCircle2 className="h-4 w-4" /> Sent
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  {loading ? 'Sending…' : 'Send B2B enquiry'}
                </>
              )}
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
