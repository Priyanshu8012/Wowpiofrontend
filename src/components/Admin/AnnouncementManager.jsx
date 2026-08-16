import React, { useEffect, useRef, useState } from 'react';
import { Save, AlertCircle, CheckCircle2, Megaphone, ChevronDown, Check } from 'lucide-react';
import { getAnnouncementAdmin, updateAnnouncement } from '../../api/announcement.api.js';

const empty = {
  text: '',
  ctaText: 'Order now',
  ctaType: 'whatsapp',
  ctaMessage: '',
  ctaLink: '/products',
  secondaryText: 'Brand brochure',
  secondaryLink: '/brochure',
  isActive: true,
};

const CTA_OPTIONS = [
  { value: 'whatsapp', label: 'WhatsApp message' },
  { value: 'link', label: 'Page / URL link' },
  { value: 'none', label: 'No CTA' },
];

export default function AnnouncementManager() {
  const [form, setForm] = useState(empty);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [ctaOpen, setCtaOpen] = useState(false);
  const ctaRef = useRef(null);

  useEffect(() => {
    const onDoc = (e) => {
      if (ctaRef.current && !ctaRef.current.contains(e.target)) setCtaOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const data = await getAnnouncementAdmin();
        setForm({
          text: data.text || '',
          ctaText: data.ctaText || 'Order now',
          ctaType: data.ctaType || 'whatsapp',
          ctaMessage: data.ctaMessage || '',
          ctaLink: data.ctaLink || '/products',
          secondaryText: data.secondaryText || '',
          secondaryLink: data.secondaryLink || '/brochure',
          isActive: data.isActive !== false,
        });
      } catch (e) {
        console.error(e);
        setErrorMsg('Failed to load announcement settings.');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const save = async () => {
    try {
      setSaving(true);
      setErrorMsg('');
      setSuccessMsg('');
      await updateAnnouncement(form);
      setSuccessMsg('Announcement bar updated. Refresh the site to see it.');
      setTimeout(() => setSuccessMsg(''), 3500);
    } catch (e) {
      console.error(e);
      setErrorMsg(e.response?.data?.message || 'Failed to save.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-white/60">Loading announcement…</div>;

  return (
    <div className="flex max-w-3xl flex-col gap-6">
      <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#C9A259]/12 text-[#C9A259]">
          <Megaphone className="h-5 w-5" />
        </span>
        <div>
          <p className="text-sm font-semibold text-white">Top strip across the public site</p>
          <p className="text-xs text-white/40">Edit text, CTA, and visibility — then save.</p>
        </div>
      </div>

      {errorMsg && (
        <div className="flex items-center gap-3 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-red-400">
          <AlertCircle className="h-5 w-5" />
          <p>{errorMsg}</p>
        </div>
      )}
      {successMsg && (
        <div className="flex items-center gap-3 rounded-xl border border-green-500/20 bg-green-500/10 p-4 text-green-400">
          <CheckCircle2 className="h-5 w-5" />
          <p>{successMsg}</p>
        </div>
      )}

      <div className="flex flex-col gap-5 rounded-2xl border border-white/10 bg-white/[0.04] p-6">
        <label className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
          <span className="text-sm font-medium text-white">Show announcement bar</span>
          <input
            type="checkbox"
            checked={form.isActive}
            onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
            className="h-4 w-4 accent-[#C9A259]"
          />
        </label>

        <div>
          <label className="mb-2 block text-xs font-medium text-white/60">Announcement text</label>
          <textarea
            rows={3}
            value={form.text}
            onChange={(e) => setForm({ ...form, text: e.target.value })}
            className="w-full rounded-lg border border-white/10 bg-white/5 p-3 text-white outline-none focus:ring-1 focus:ring-accent-cyan"
            placeholder="New: 20L sealed pack for homes & offices…"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-xs font-medium text-white/60">CTA button text</label>
            <input
              value={form.ctaText}
              onChange={(e) => setForm({ ...form, ctaText: e.target.value })}
              className="w-full rounded-lg border border-white/10 bg-white/5 p-3 text-white outline-none focus:ring-1 focus:ring-accent-cyan"
            />
          </div>
          <div ref={ctaRef} className="relative">
            <label className="mb-2 block text-xs font-medium text-white/60">CTA type</label>
            <button
              type="button"
              onClick={() => setCtaOpen((v) => !v)}
              className="flex w-full items-center justify-between rounded-lg border border-white/10 bg-[#141414] p-3 text-left text-white outline-none focus:border-[#C9A259]/50 focus:ring-1 focus:ring-[#C9A259]/40"
            >
              <span>
                {CTA_OPTIONS.find((o) => o.value === form.ctaType)?.label || 'Select type'}
              </span>
              <ChevronDown
                className={`h-4 w-4 text-white/50 transition-transform ${ctaOpen ? 'rotate-180' : ''}`}
              />
            </button>
            {ctaOpen && (
              <ul className="absolute left-0 right-0 z-20 mt-1.5 overflow-hidden rounded-lg border border-white/10 bg-[#1A1A1A] py-1 shadow-2xl">
                {CTA_OPTIONS.map((opt) => {
                  const active = form.ctaType === opt.value;
                  return (
                    <li key={opt.value}>
                      <button
                        type="button"
                        onClick={() => {
                          setForm({ ...form, ctaType: opt.value });
                          setCtaOpen(false);
                        }}
                        className={`flex w-full items-center justify-between px-3 py-2.5 text-left text-sm transition-colors ${
                          active
                            ? 'bg-[#C9A259]/15 text-[#C9A259]'
                            : 'text-white/80 hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        {opt.label}
                        {active && <Check className="h-3.5 w-3.5" />}
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>

        {form.ctaType === 'whatsapp' && (
          <div>
            <label className="mb-2 block text-xs font-medium text-white/60">WhatsApp prefilled message</label>
            <input
              value={form.ctaMessage}
              onChange={(e) => setForm({ ...form, ctaMessage: e.target.value })}
              className="w-full rounded-lg border border-white/10 bg-white/5 p-3 text-white outline-none focus:ring-1 focus:ring-accent-cyan"
            />
          </div>
        )}

        {form.ctaType === 'link' && (
          <div>
            <label className="mb-2 block text-xs font-medium text-white/60">CTA link</label>
            <input
              value={form.ctaLink}
              onChange={(e) => setForm({ ...form, ctaLink: e.target.value })}
              className="w-full rounded-lg border border-white/10 bg-white/5 p-3 text-white outline-none focus:ring-1 focus:ring-accent-cyan"
              placeholder="/products or https://…"
            />
          </div>
        )}

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-xs font-medium text-white/60">Secondary link text</label>
            <input
              value={form.secondaryText}
              onChange={(e) => setForm({ ...form, secondaryText: e.target.value })}
              className="w-full rounded-lg border border-white/10 bg-white/5 p-3 text-white outline-none focus:ring-1 focus:ring-accent-cyan"
              placeholder="Brand brochure (leave empty to hide)"
            />
          </div>
          <div>
            <label className="mb-2 block text-xs font-medium text-white/60">Secondary link</label>
            <input
              value={form.secondaryLink}
              onChange={(e) => setForm({ ...form, secondaryLink: e.target.value })}
              className="w-full rounded-lg border border-white/10 bg-white/5 p-3 text-white outline-none focus:ring-1 focus:ring-accent-cyan"
              placeholder="/brochure"
            />
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-[#1E4D6B]/40 px-4 py-3">
          <p className="mb-2 font-heading text-[10px] font-bold uppercase tracking-[0.2em] text-[#E8D5A3]">
            Live preview
          </p>
          <p className="truncate font-heading text-[11px] font-bold uppercase tracking-[0.12em] text-white">
            {form.text || '…'}{' '}
            {form.ctaType !== 'none' && form.ctaText && (
              <span className="text-[#E8D5A3]">{form.ctaText}</span>
            )}
            {form.secondaryText && (
              <>
                <span className="mx-2 text-white/30">·</span>
                <span className="text-white/80">{form.secondaryText}</span>
              </>
            )}
          </p>
        </div>

        <button
          type="button"
          onClick={save}
          disabled={saving}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#C9A259] px-6 py-3.5 font-heading text-sm font-bold uppercase tracking-[0.12em] text-[#0C0C0C] hover:bg-[#A8893F] disabled:opacity-60"
        >
          <Save className="h-4 w-4" />
          {saving ? 'Saving…' : 'Save announcement'}
        </button>
      </div>
    </div>
  );
}
