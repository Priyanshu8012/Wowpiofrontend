import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, Star, Download } from 'lucide-react';
import {
  getTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from '../../api/testimonial.api.js';
import { defaultTestimonials } from '../../data/testimonials.js';

function Avatar({ initials, large = false }) {
  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#1E4D6B] to-[#C9A259] font-heading font-bold text-white ${
        large ? 'h-16 w-16 text-lg' : 'h-11 w-11 text-sm'
      }`}
    >
      {initials || '?'}
    </div>
  );
}

export default function TestimonialManager() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [importing, setImporting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    review: '',
    rating: 5,
    initials: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const data = await getTestimonials();
      setTestimonials(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to fetch testimonials', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleEdit = (t) => {
    setEditingId(t._id);
    setFormData({
      name: t.name || '',
      role: t.role || '',
      review: t.review || '',
      rating: t.rating || 5,
      initials: t.initials || '',
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this testimonial?')) return;
    try {
      await deleteTestimonial(id);
      fetchTestimonials();
    } catch (error) {
      console.error('Failed to delete testimonial', error);
    }
  };

  const handleSave = async () => {
    if (!formData.name || !formData.review || !formData.initials) {
      alert('Name, review, and initials are required.');
      return;
    }
    try {
      setSubmitting(true);
      if (editingId === 'new') {
        await createTestimonial(formData);
      } else {
        await updateTestimonial(editingId, formData);
      }
      setEditingId(null);
      fetchTestimonials();
    } catch (error) {
      console.error('Failed to save testimonial', error);
      alert('Failed to save. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const importDefaults = async () => {
    try {
      setImporting(true);
      for (const item of defaultTestimonials) {
        await createTestimonial(item);
      }
      await fetchTestimonials();
    } catch (error) {
      console.error('Failed to import defaults', error);
      alert('Could not import defaults.');
    } finally {
      setImporting(false);
    }
  };

  if (loading) return <div className="text-white/60">Loading testimonials…</div>;

  const empty = testimonials.length === 0;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm text-white/50">
            Reviews shown on the public homepage. Edit or add new voices of trust.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {empty && (
            <button
              type="button"
              onClick={importDefaults}
              disabled={importing}
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 font-heading text-xs font-bold uppercase tracking-[0.12em] text-white hover:border-[#C9A259]/40 disabled:opacity-50"
            >
              <Download className="h-3.5 w-3.5" />
              {importing ? 'Importing…' : 'Import live defaults'}
            </button>
          )}
          <button
            type="button"
            onClick={() => {
              setFormData({ name: '', role: '', review: '', rating: 5, initials: '' });
              setEditingId('new');
            }}
            className="inline-flex items-center gap-2 rounded-xl bg-[#C9A259] px-5 py-2.5 font-heading text-xs font-bold uppercase tracking-[0.12em] text-[#0C0C0C] hover:bg-[#A8893F]"
          >
            <Plus className="h-4 w-4" /> Add testimonial
          </button>
        </div>
      </div>

      {editingId && (
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="font-heading text-lg font-bold text-white">
              {editingId === 'new' ? 'Add testimonial' : 'Edit testimonial'}
            </h3>
            <button type="button" onClick={() => setEditingId(null)} className="text-white/40 hover:text-white">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="mb-6 flex items-center gap-4 rounded-xl border border-white/10 bg-[#121212] p-4">
            <Avatar initials={formData.initials || 'WP'} large />
            <div className="min-w-0">
              <p className="font-heading text-[10px] font-bold uppercase tracking-[0.18em] text-[#C9A259]">
                Live avatar preview
              </p>
              <p className="truncate font-heading text-base font-bold text-white">
                {formData.name || 'Customer name'}
              </p>
              <p className="truncate text-xs text-white/45">{formData.role || 'Role / company'}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-white/60">Customer name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => {
                  const val = e.target.value;
                  const init = val
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .substring(0, 2)
                    .toUpperCase();
                  setFormData({
                    ...formData,
                    name: val,
                    initials: formData.initials && editingId !== 'new' ? formData.initials : init,
                  });
                }}
                className="w-full rounded-xl border border-white/10 bg-[#121212] p-3 text-white outline-none focus:border-[#C9A259]/45"
                placeholder="e.g. Priya Sharma"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-white/60">Role / subtitle</label>
              <input
                type="text"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-[#121212] p-3 text-white outline-none focus:border-[#C9A259]/45"
                placeholder="e.g. HR Manager, TechVantage"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-white/60">Initials (avatar)</label>
              <input
                type="text"
                maxLength={3}
                value={formData.initials}
                onChange={(e) => setFormData({ ...formData, initials: e.target.value.toUpperCase() })}
                className="w-full rounded-xl border border-white/10 bg-[#121212] p-3 text-white outline-none focus:border-[#C9A259]/45"
                placeholder="e.g. PS"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-white/60">Rating (1–5)</label>
              <input
                type="number"
                min="1"
                max="5"
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                className="w-full rounded-xl border border-white/10 bg-[#121212] p-3 text-white outline-none focus:border-[#C9A259]/45"
              />
            </div>
            <div className="md:col-span-2">
              <label className="mb-1.5 block text-xs font-medium text-white/60">Review</label>
              <textarea
                value={formData.review}
                onChange={(e) => setFormData({ ...formData, review: e.target.value })}
                rows={4}
                className="w-full resize-none rounded-xl border border-white/10 bg-[#121212] p-3 text-white outline-none focus:border-[#C9A259]/45"
                placeholder="What did they say about WOWPIO?"
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setEditingId(null)}
              className="px-5 py-2.5 text-sm text-white/60 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={submitting}
              className="rounded-xl bg-[#C9A259] px-6 py-2.5 font-heading text-xs font-bold uppercase tracking-[0.12em] text-[#0C0C0C] hover:bg-[#A8893F] disabled:opacity-50"
            >
              {submitting ? 'Saving…' : 'Save testimonial'}
            </button>
          </div>
        </div>
      )}

      {empty ? (
        <div className="space-y-4">
          <div className="rounded-2xl border border-[#C9A259]/25 bg-[#C9A259]/8 px-5 py-4">
            <p className="font-heading text-[11px] font-bold uppercase tracking-[0.2em] text-[#C9A259]">
              Currently on website
            </p>
            <p className="mt-1 text-sm text-white/60">
              These default reviews are live on the homepage until you save testimonials in the database.
              Import them to edit, or add new ones.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {defaultTestimonials.map((t) => (
              <div
                key={t.initials}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
              >
                <div className="mb-3 flex items-center gap-3">
                  <Avatar initials={t.initials} />
                  <div>
                    <p className="font-heading text-sm font-bold text-white">{t.name}</p>
                    <p className="text-xs text-white/45">{t.role}</p>
                  </div>
                </div>
                <div className="mb-2 flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-sm italic text-white/65 line-clamp-4">&ldquo;{t.review}&rdquo;</p>
                <span className="mt-4 inline-block rounded-md bg-white/10 px-2 py-1 font-heading text-[9px] font-bold uppercase tracking-[0.14em] text-white/50">
                  Default · live
                </span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t._id}
              className="group flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.04] p-5"
            >
              <div>
                <div className="mb-3 flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <Avatar initials={t.initials} />
                    <div>
                      <h4 className="font-heading text-sm font-bold text-white">{t.name}</h4>
                      <p className="text-xs text-white/50">{t.role}</p>
                    </div>
                  </div>
                  <div className="flex gap-1 opacity-100 md:opacity-0 md:group-hover:opacity-100">
                    <button
                      type="button"
                      onClick={() => handleEdit(t)}
                      className="rounded-lg bg-white/5 p-1.5 text-white/50 hover:bg-[#C9A259]/15 hover:text-[#C9A259]"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(t._id)}
                      className="rounded-lg bg-white/5 p-1.5 text-white/50 hover:bg-red-500/15 hover:text-red-300"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="mb-2 flex gap-0.5">
                  {Array.from({
                    length: Math.max(1, Math.min(5, Math.floor(Number(t.rating)) || 5)),
                  }).map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-sm italic text-white/65 line-clamp-4">&ldquo;{t.review}&rdquo;</p>
              </div>
              <span className="mt-4 inline-block w-fit rounded-md bg-[#C9A259]/15 px-2 py-1 font-heading text-[9px] font-bold uppercase tracking-[0.14em] text-[#C9A259]">
                · Live On Website
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
