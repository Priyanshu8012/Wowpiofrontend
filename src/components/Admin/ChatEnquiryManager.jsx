import React, { useEffect, useState } from 'react';
import { Mail, MailOpen, Trash2, ChevronLeft, ChevronRight, X, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  getChatEnquiries,
  markChatEnquiryRead,
  deleteChatEnquiry,
} from '../../api/chatEnquiry.api.js';

const INTEREST_LABELS = {
  order: 'Order',
  bulk: 'Bulk / society',
  distributor: 'Distributor',
  support: 'Support',
  other: 'Other',
};

export default function ChatEnquiryManager({ onUnreadChange }) {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selected, setSelected] = useState(null);

  const fetchList = async (p = page) => {
    try {
      setLoading(true);
      const data = await getChatEnquiries(p);
      setEnquiries(data.enquiries || []);
      setTotalPages(data.pages || 1);
      setPage(data.page || p);
      if (typeof data.unread === 'number') onUnreadChange?.(data.unread);
    } catch (err) {
      console.error('Failed to load chat enquiries', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchList(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const handleRead = async (id) => {
    try {
      await markChatEnquiryRead(id);
      const next = enquiries.map((m) => (m._id === id ? { ...m, isRead: true } : m));
      setEnquiries(next);
      if (selected?._id === id) setSelected({ ...selected, isRead: true });
      onUnreadChange?.(next.filter((m) => !m.isRead).length);
      const data = await getChatEnquiries(page);
      if (typeof data.unread === 'number') onUnreadChange?.(data.unread);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id, e) => {
    e?.stopPropagation();
    if (!window.confirm('Delete this chat enquiry?')) return;
    try {
      await deleteChatEnquiry(id);
      if (selected?._id === id) setSelected(null);
      fetchList(page);
    } catch (err) {
      console.error(err);
    }
  };

  const openEnquiry = (row) => {
    setSelected(row);
    if (!row.isRead) handleRead(row._id);
  };

  return (
    <div className="relative flex max-w-6xl flex-col gap-6">
      <p className="text-sm text-white/50">
        Enquiries submitted from the website chatbot form (Enquire tab).
      </p>

      {loading && !enquiries.length ? (
        <div className="text-white/60">Loading chat enquiries…</div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-md">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.02] text-xs uppercase tracking-wider text-white/40">
                  <th className="w-12 p-4 font-medium" />
                  <th className="p-4 font-medium">Name</th>
                  <th className="p-4 font-medium">Phone</th>
                  <th className="p-4 font-medium">Interest</th>
                  <th className="w-1/3 p-4 font-medium">Message</th>
                  <th className="p-4 font-medium">Date</th>
                  <th className="p-4 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {enquiries.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-10 text-center text-white/40">
                      <MessageSquare className="mx-auto mb-2 h-7 w-7 opacity-40" />
                      No chatbot enquiries yet.
                    </td>
                  </tr>
                ) : (
                  enquiries.map((row) => (
                    <tr
                      key={row._id}
                      onClick={() => openEnquiry(row)}
                      className={`cursor-pointer border-b border-white/5 transition-colors hover:bg-white/[0.04] ${
                        !row.isRead ? 'bg-[#C9A259]/5' : ''
                      }`}
                    >
                      <td className="p-4">
                        {row.isRead ? (
                          <MailOpen className="h-4 w-4 text-white/30" />
                        ) : (
                          <Mail className="h-4 w-4 text-[#C9A259]" />
                        )}
                      </td>
                      <td className={`p-4 text-sm ${row.isRead ? 'text-white/70' : 'font-semibold text-white'}`}>
                        {row.name}
                      </td>
                      <td className="p-4 text-sm text-white/55">{row.phone}</td>
                      <td className="p-4">
                        <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white/60">
                          {INTEREST_LABELS[row.interest] || row.interest}
                        </span>
                      </td>
                      <td className="max-w-xs truncate p-4 text-sm text-white/45">{row.message}</td>
                      <td className="whitespace-nowrap p-4 text-xs text-white/40">
                        {new Date(row.createdAt).toLocaleString()}
                      </td>
                      <td className="p-4 text-right">
                        <button
                          type="button"
                          onClick={(e) => handleDelete(row._id, e)}
                          className="rounded-lg border border-red-500/20 p-2 text-red-300/80 hover:bg-red-500/10"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-end gap-2 border-t border-white/10 px-4 py-3">
              <button
                type="button"
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="rounded-lg border border-white/10 p-2 text-white/60 disabled:opacity-30"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="text-xs text-white/40">
                {page} / {totalPages}
              </span>
              <button
                type="button"
                disabled={page >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className="rounded-lg border border-white/10 p-2 text-white/60 disabled:opacity-30"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      )}

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 12, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#121212] p-6 shadow-2xl"
            >
              <div className="mb-4 flex items-start justify-between gap-3">
                <div>
                  <p className="font-heading text-lg font-bold text-white">{selected.name}</p>
                  <p className="mt-1 text-sm text-white/45">
                    {INTEREST_LABELS[selected.interest] || selected.interest} ·{' '}
                    {new Date(selected.createdAt).toLocaleString()}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className="rounded-lg p-1.5 text-white/40 hover:bg-white/10 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="space-y-3 text-sm">
                <p>
                  <span className="text-white/35">Phone: </span>
                  <a href={`tel:${selected.phone}`} className="text-[#C9A259] hover:underline">
                    {selected.phone}
                  </a>
                </p>
                {selected.email ? (
                  <p>
                    <span className="text-white/35">Email: </span>
                    <a href={`mailto:${selected.email}`} className="text-[#C9A259] hover:underline">
                      {selected.email}
                    </a>
                  </p>
                ) : null}
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 leading-relaxed text-white/75">
                  {selected.message}
                </div>
              </div>

              <div className="mt-5 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={(e) => handleDelete(selected._id, e)}
                  className="rounded-xl border border-red-500/25 px-4 py-2 font-heading text-xs font-bold uppercase tracking-wider text-red-300 hover:bg-red-500/10"
                >
                  Delete
                </button>
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className="rounded-xl bg-[#C9A259] px-4 py-2 font-heading text-xs font-bold uppercase tracking-wider text-[#0C0C0C]"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
