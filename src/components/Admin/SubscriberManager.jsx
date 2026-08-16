import React, { useEffect, useState } from 'react';
import { Mail, Trash2, RefreshCw, Copy, Check } from 'lucide-react';
import { getSubscribers, deleteSubscriber } from '../../api/subscriber.api.js';

export default function SubscriberManager() {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [copied, setCopied] = useState(false);

  const fetchList = async (p = page) => {
    try {
      setLoading(true);
      const data = await getSubscribers(p);
      setSubscribers(data.subscribers || []);
      setTotalPages(data.pages || 1);
      setTotal(data.total || 0);
      setPage(data.page || p);
    } catch (error) {
      console.error('Failed to load subscribers', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchList(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const handleDelete = async (id) => {
    if (!window.confirm('Remove this subscriber?')) return;
    try {
      await deleteSubscriber(id);
      fetchList(page);
    } catch (error) {
      console.error('Failed to delete subscriber', error);
    }
  };

  const copyAll = async () => {
    const list = subscribers.map((s) => s.email).join(', ');
    try {
      await navigator.clipboard.writeText(list);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  return (
    <div className="flex max-w-4xl flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-sm text-white/50">
            Emails collected from the website newsletter (“Stay in the flow”).
          </p>
          <p className="mt-1 font-heading text-xs font-bold uppercase tracking-[0.16em] text-[#C9A259]">
            {total} subscriber{total === 1 ? '' : 's'}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={copyAll}
            disabled={!subscribers.length}
            className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 font-heading text-[11px] font-bold uppercase tracking-[0.12em] text-white hover:border-[#C9A259]/40 disabled:opacity-40"
          >
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            {copied ? 'Copied' : 'Copy emails'}
          </button>
          <button
            type="button"
            onClick={() => fetchList(page)}
            className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 font-heading text-[11px] font-bold uppercase tracking-[0.12em] text-white hover:border-[#C9A259]/40"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Refresh
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
        {loading ? (
          <div className="p-10 text-center text-white/40">Loading subscribers…</div>
        ) : subscribers.length === 0 ? (
          <div className="p-12 text-center">
            <Mail className="mx-auto h-8 w-8 text-white/25" />
            <p className="mt-3 text-sm text-white/45">No subscribers yet.</p>
            <p className="mt-1 text-xs text-white/30">
              When someone subscribes from the footer, they will appear here.
            </p>
          </div>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.02] text-[10px] font-heading uppercase tracking-[0.16em] text-white/40">
                <th className="px-5 py-3 font-medium">Email</th>
                <th className="px-5 py-3 font-medium">Joined</th>
                <th className="px-5 py-3 text-right font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {subscribers.map((s) => (
                <tr key={s._id} className="border-b border-white/5 hover:bg-white/[0.03]">
                  <td className="px-5 py-4">
                    <a
                      href={`mailto:${s.email}`}
                      className="text-sm font-medium text-white hover:text-[#C9A259]"
                    >
                      {s.email}
                    </a>
                  </td>
                  <td className="px-5 py-4 text-xs text-white/45">
                    {new Date(s.createdAt).toLocaleString()}
                  </td>
                  <td className="px-5 py-4 text-right">
                    <button
                      type="button"
                      onClick={() => handleDelete(s._id)}
                      className="rounded-lg bg-white/5 p-2 text-white/40 hover:bg-red-500/15 hover:text-red-300"
                      aria-label="Delete subscriber"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3">
          <button
            type="button"
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="rounded-lg border border-white/10 px-3 py-1.5 text-xs text-white/60 disabled:opacity-30"
          >
            Prev
          </button>
          <span className="text-xs text-white/40">
            Page {page} / {totalPages}
          </span>
          <button
            type="button"
            disabled={page >= totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            className="rounded-lg border border-white/10 px-3 py-1.5 text-xs text-white/60 disabled:opacity-30"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
