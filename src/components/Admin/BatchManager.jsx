import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, Save, X, RefreshCw } from 'lucide-react';
import {
  getAllBatches,
  createBatch,
  updateBatch,
  deleteBatch,
} from '../../api/batch.api.js';
import { admin } from './adminStyles.js';

const DEFAULT_ADDRESS =
  'Bachcoach, Plot No. 118K, Tilmapur, Ashapur, Varanasi, U.P, 221007';

const DEFAULT_FACTORY = 'WOWPIO Packaged Drinking Water Plant';
const DEFAULT_LICENSE = 'FSSAI Licensed';

const emptyForm = () => ({
  productName: '',
  productSize: '',
  manufacturedAt: toLocalInput(new Date()),
  address: DEFAULT_ADDRESS,
  placeOfMfg: 'Bachcoach',
  factoryName: DEFAULT_FACTORY,
  licenseNumber: DEFAULT_LICENSE,
  batchCode: '',
  isActive: true,
  tds: '',
  ph: '',
  calcium: '',
  magnesium: '',
  turbidity: '',
  microbial: '',
});

function toLocalInput(date) {
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return '';
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export default function BatchManager() {
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(emptyForm());
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const fetchList = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await getAllBatches();
      setBatches(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setError('Could not load batch log. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const handleAddNew = () => {
    setEditingId('new');
    setFormData(emptyForm());
    setError('');
  };

  const handleEdit = (row) => {
    setEditingId(row._id);
    setFormData({
      productName: row.productName || '',
      productSize: row.productSize || '',
      manufacturedAt: toLocalInput(row.manufacturedAt),
      address: row.address || DEFAULT_ADDRESS,
      placeOfMfg: row.placeOfMfg || 'Bachcoach',
      factoryName: row.factoryName || DEFAULT_FACTORY,
      licenseNumber: row.licenseNumber || DEFAULT_LICENSE,
      batchCode: row.batchCode || '',
      isActive: row.isActive !== false,
      tds: row.tds !== undefined && row.tds !== null ? String(row.tds) : '',
      ph: row.ph !== undefined && row.ph !== null ? String(row.ph) : '',
      calcium: row.calcium !== undefined && row.calcium !== null ? String(row.calcium) : '',
      magnesium: row.magnesium !== undefined && row.magnesium !== null ? String(row.magnesium) : '',
      turbidity: row.turbidity !== undefined && row.turbidity !== null ? String(row.turbidity) : '',
      microbial: row.microbial || '',
    });
    setError('');
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData(emptyForm());
    setError('');
  };

  const handleSave = async () => {
    if (!formData.productName.trim() || !formData.manufacturedAt) {
      setError('Product name and date/time are required.');
      return;
    }
    if (!formData.licenseNumber.trim()) {
      setError('Licence number is required.');
      return;
    }
    try {
      setSaving(true);
      setError('');
      const payload = {
        ...formData,
        factoryName: (formData.factoryName || DEFAULT_FACTORY).trim(),
        licenseNumber: (formData.licenseNumber || DEFAULT_LICENSE).trim(),
        manufacturedAt: new Date(formData.manufacturedAt).toISOString(),
        tds: formData.tds !== '' ? Number(formData.tds) : null,
        ph: formData.ph !== '' ? Number(formData.ph) : null,
        calcium: formData.calcium !== '' ? Number(formData.calcium) : null,
        magnesium: formData.magnesium !== '' ? Number(formData.magnesium) : null,
        turbidity: formData.turbidity !== '' ? Number(formData.turbidity) : null,
      };
      if (editingId === 'new') {
        await createBatch(payload);
      } else {
        await updateBatch(editingId, payload);
      }
      setEditingId(null);
      await fetchList();
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || 'Failed to save batch.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this batch row?')) return;
    try {
      await deleteBatch(id);
      fetchList();
    } catch (err) {
      console.error(err);
      setError('Failed to delete batch.');
    }
  };

  return (
    <div className="flex max-w-5xl flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <p className="max-w-xl text-sm text-white/50">
          Rows shown on the public Manufacturing page: batch code, factory name, address, and
          licence number. Saving a licence on any batch updates every row.
        </p>
        <div className="flex gap-2">
          <button type="button" onClick={fetchList} className={admin.btnGhost}>
            <RefreshCw className="h-3.5 w-3.5" />
            Refresh
          </button>
          {editingId === null && (
            <button type="button" onClick={handleAddNew} className={admin.btnPrimary}>
              <Plus className="h-3.5 w-3.5" />
              Add batch
            </button>
          )}
        </div>
      </div>

      {error ? <div className={admin.alertError}>{error}</div> : null}

      {editingId !== null && (
        <div className={admin.card}>
          <div className="mb-4 flex items-center justify-between gap-3">
            <h3 className="font-heading text-lg font-bold text-white">
              {editingId === 'new' ? 'New batch row' : 'Edit batch row'}
            </h3>
            <button type="button" onClick={handleCancel} className={admin.btnGhost}>
              <X className="h-3.5 w-3.5" />
              Cancel
            </button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={admin.label}>Product name *</label>
              <input
                className={admin.input}
                value={formData.productName}
                onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                placeholder="WOWPIO Packaged Drinking Water"
              />
            </div>
            <div>
              <label className={admin.label}>Pack size</label>
              <input
                className={admin.input}
                value={formData.productSize}
                onChange={(e) => setFormData({ ...formData, productSize: e.target.value })}
                placeholder="1L / 500ml / 20L"
              />
            </div>
            <div>
              <label className={admin.label}>Manufactured date &amp; time *</label>
              <input
                type="datetime-local"
                className={admin.input}
                value={formData.manufacturedAt}
                onChange={(e) => setFormData({ ...formData, manufacturedAt: e.target.value })}
              />
            </div>
            <div>
              <label className={admin.label}>Batch code</label>
              <input
                className={admin.input}
                value={formData.batchCode}
                onChange={(e) => setFormData({ ...formData, batchCode: e.target.value })}
                placeholder="WP-1L-080826-A"
              />
            </div>
            <div>
              <label className={admin.label}>Place of manufacture</label>
              <input
                className={admin.input}
                value={formData.placeOfMfg}
                onChange={(e) => setFormData({ ...formData, placeOfMfg: e.target.value })}
              />
            </div>
            <div>
              <label className={admin.label}>Factory name</label>
              <input
                className={admin.input}
                value={formData.factoryName}
                onChange={(e) => setFormData({ ...formData, factoryName: e.target.value })}
                placeholder="WOWPIO Packaged Drinking Water Plant"
              />
            </div>
            <div>
              <label className={admin.label}>Licence number *</label>
              <input
                className={admin.input}
                value={formData.licenseNumber}
                onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                placeholder="FSSAI licence number"
              />
            </div>
            <div className="flex items-end pb-1">
              <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-white/70">
                <input
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="h-4 w-4 rounded border-white/20 bg-[#121212] text-[#C9A259]"
                />
                Show on website
              </label>
            </div>
            <div className="sm:col-span-2">
              <label className={admin.label}>Address *</label>
              <textarea
                rows={2}
                className={admin.textarea}
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
            </div>

            {/* Water Quality Parameters Section */}
            <div className="sm:col-span-2 border-t border-white/10 pt-4 mt-2">
              <h4 className="font-heading text-sm font-bold text-[#C9A259] mb-3">
                Water Quality Parameters (Optional — falls back to automatic values if left empty)
              </h4>
              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label className={admin.label}>TDS (ppm)</label>
                  <input
                    type="number"
                    step="any"
                    className={admin.input}
                    value={formData.tds}
                    onChange={(e) => setFormData({ ...formData, tds: e.target.value })}
                    placeholder="e.g. 115"
                  />
                </div>
                <div>
                  <label className={admin.label}>pH Level</label>
                  <input
                    type="number"
                    step="0.1"
                    className={admin.input}
                    value={formData.ph}
                    onChange={(e) => setFormData({ ...formData, ph: e.target.value })}
                    placeholder="e.g. 7.2"
                  />
                </div>
                <div>
                  <label className={admin.label}>Calcium (mg/L)</label>
                  <input
                    type="number"
                    step="any"
                    className={admin.input}
                    value={formData.calcium}
                    onChange={(e) => setFormData({ ...formData, calcium: e.target.value })}
                    placeholder="e.g. 13.5"
                  />
                </div>
                <div>
                  <label className={admin.label}>Magnesium (mg/L)</label>
                  <input
                    type="number"
                    step="any"
                    className={admin.input}
                    value={formData.magnesium}
                    onChange={(e) => setFormData({ ...formData, magnesium: e.target.value })}
                    placeholder="e.g. 4.0"
                  />
                </div>
                <div>
                  <label className={admin.label}>Turbidity (NTU)</label>
                  <input
                    type="number"
                    step="0.01"
                    className={admin.input}
                    value={formData.turbidity}
                    onChange={(e) => setFormData({ ...formData, turbidity: e.target.value })}
                    placeholder="e.g. 0.02"
                  />
                </div>
                <div>
                  <label className={admin.label}>Microbial Pathogens</label>
                  <input
                    className={admin.input}
                    value={formData.microbial}
                    onChange={(e) => setFormData({ ...formData, microbial: e.target.value })}
                    placeholder="e.g. 0 CFU/ml (Absent)"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5">
            <button type="button" disabled={saving} onClick={handleSave} className={admin.btnPrimary}>
              <Save className="h-3.5 w-3.5" />
              {saving ? 'Saving…' : 'Save batch'}
            </button>
          </div>
        </div>
      )}

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
        {loading ? (
          <div className="p-10 text-center text-white/40">Loading batch log…</div>
        ) : batches.length === 0 ? (
          <div className="p-12 text-center text-sm text-white/45">
            No batches yet. Click “Add batch” or run <code className="text-[#C9A259]">node seedBatches.js</code> in
            the backend folder.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] text-left">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.02] text-[10px] font-heading uppercase tracking-[0.16em] text-white/40">
                  <th className="px-4 py-3 font-medium">Batch code</th>
                  <th className="px-4 py-3 font-medium">Factory name</th>
                  <th className="px-4 py-3 font-medium">Address</th>
                  <th className="px-4 py-3 font-medium">Licence</th>
                  <th className="px-4 py-3 font-medium">Live</th>
                  <th className="px-4 py-3 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {batches.map((row) => (
                  <tr key={row._id} className="border-b border-white/5 hover:bg-white/[0.03]">
                    <td className="px-4 py-3">
                      <p className="font-mono text-sm font-medium text-white">{row.batchCode || '—'}</p>
                      <p className="text-xs text-white/40">
                        {[row.productName, row.productSize].filter(Boolean).join(' · ') || '—'}
                      </p>
                    </td>
                    <td className="px-4 py-3 text-xs text-white/55">
                      {row.factoryName || DEFAULT_FACTORY}
                    </td>
                    <td className="max-w-[220px] px-4 py-3 text-xs leading-snug text-white/45">
                      {row.address}
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-white/55">
                      {row.licenseNumber || DEFAULT_LICENSE}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                          row.isActive
                            ? 'bg-emerald-500/15 text-emerald-300'
                            : 'bg-white/10 text-white/40'
                        }`}
                      >
                        {row.isActive ? 'Yes' : 'No'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="inline-flex gap-2">
                        <button
                          type="button"
                          onClick={() => handleEdit(row)}
                          className="rounded-lg border border-white/10 p-2 text-white/70 hover:border-[#C9A259]/40 hover:text-[#C9A259]"
                        >
                          <Edit2 className="h-3.5 w-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(row._id)}
                          className="rounded-lg border border-red-500/20 p-2 text-red-300/80 hover:bg-red-500/10"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
