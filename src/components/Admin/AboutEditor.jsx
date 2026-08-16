import React, { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import { getAbout, updateAbout } from '../../api/about.api.js';
import ImageUploader from './ImageUploader.jsx';
import natureImgDefault from '../../assets/wowpio-nature-source.png';

const LIVE_DEFAULTS = {
  heading: 'Born from a promise of purity',
  body:
    'WOWPIO was founded on a simple belief — pure drinking water should do more than quench thirst. It should feel clean, taste balanced, and earn trust every single day.\n\nFrom carefully controlled purification to sealed packaging, we craft natural drinking water for homes, workplaces, and partners who refuse to compromise on quality.',
  imageUrl: '',
  mediaType: 'image',
};

const fieldClass =
  'w-full rounded-xl border border-white/15 bg-[#121212] p-3.5 text-sm text-white outline-none transition-colors placeholder:text-white/40 focus:border-[#C9A259]/50 focus:ring-1 focus:ring-[#C9A259]/30';

export default function AboutEditor() {
  const [formData, setFormData] = useState(LIVE_DEFAULTS);
  const [usingDefaults, setUsingDefaults] = useState(true);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchAbout();
  }, []);

  const fetchAbout = async () => {
    try {
      setLoading(true);
      const data = await getAbout();
      const heading = (data?.heading || '').trim();
      const body = (data?.body || '').trim();
      const imageUrl = data?.imageUrl || '';
      const mediaType = data?.mediaType || 'image';

      const hasSavedText = Boolean(heading || body);
      setUsingDefaults(!hasSavedText);
      setFormData({
        heading: heading || LIVE_DEFAULTS.heading,
        body: body || LIVE_DEFAULTS.body,
        imageUrl,
        mediaType,
      });
    } catch (error) {
      console.error('Failed to fetch about', error);
      setUsingDefaults(true);
      setFormData(LIVE_DEFAULTS);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      await updateAbout(formData);
      setUsingDefaults(false);
      alert('About section updated successfully');
    } catch (error) {
      console.error('Failed to update about', error);
      alert('Failed to update');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-white/60">Loading…</div>;

  return (
    <div className="flex max-w-4xl flex-col gap-6">
      <div>
        <h2 className="font-heading text-2xl font-bold text-white">Edit About Section</h2>
        <p className="mt-1 text-sm text-white/45">
          {usingDefaults
            ? 'Showing text currently live on the website (defaults). Edit and save to store in database.'
            : 'Editing saved About content from the database.'}
        </p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
        <div className="flex flex-col gap-8 md:flex-row">
          <div className="flex flex-1 flex-col gap-5">
            <div>
              <div className="mb-2 flex items-center justify-between gap-2">
                <label className="block text-xs font-medium text-white/60">Heading</label>
                {usingDefaults && (
                  <span className="rounded-md bg-white/10 px-2 py-0.5 font-heading text-[9px] font-bold uppercase tracking-[0.14em] text-white/50">
                    Currently on website
                  </span>
                )}
              </div>
              <input
                type="text"
                value={formData.heading}
                onChange={(e) => setFormData({ ...formData, heading: e.target.value })}
                className={fieldClass}
                placeholder="About section heading"
              />
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between gap-2">
                <label className="block text-xs font-medium text-white/60">Body text</label>
                {usingDefaults && (
                  <span className="rounded-md bg-white/10 px-2 py-0.5 font-heading text-[9px] font-bold uppercase tracking-[0.14em] text-white/50">
                    Currently on website
                  </span>
                )}
              </div>
              <textarea
                value={formData.body}
                onChange={(e) => setFormData({ ...formData, body: e.target.value })}
                className={`${fieldClass} min-h-[220px] resize-y`}
                placeholder="About section story…"
              />
            </div>
          </div>

          <div className="w-full md:w-80">
            <label className="mb-2 block text-xs font-medium text-white/60">
              About media (image or video)
            </label>
            <ImageUploader
              currentImage={formData.imageUrl}
              mediaType={formData.mediaType}
              fallbackImage={natureImgDefault}
              fallbackLabel="Currently on website"
              allowVideo
              onUploadSuccess={(url, type) =>
                setFormData({
                  ...formData,
                  imageUrl: url,
                  mediaType: type || 'image',
                })
              }
            />
          </div>
        </div>

        <div className="mt-8 flex justify-end border-t border-white/10 pt-6">
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-xl bg-[#C9A259] px-8 py-3 font-heading text-sm font-bold uppercase tracking-[0.12em] text-[#0C0C0C] transition-colors hover:bg-[#A8893F] disabled:opacity-50"
          >
            <Save className="h-5 w-5" /> {saving ? 'Saving…' : 'Save changes'}
          </button>
        </div>
      </div>
    </div>
  );
}
