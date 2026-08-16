import React, { useState, useEffect } from 'react';
import { Mail, MailOpen, Trash2, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { getMessages, markAsRead, deleteMessage } from '../../api/contact.api.js';
import { motion, AnimatePresence } from 'framer-motion';

export default function ContactInbox({ onUnreadChange }) {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedMsg, setSelectedMsg] = useState(null);

    useEffect(() => {
        fetchMessages(page);
    }, [page]);

    const fetchMessages = async (p) => {
        try {
            setLoading(true);
            const data = await getMessages(p);
            setMessages(data.messages);
            setTotalPages(data.pages);
            if (typeof data.unread === 'number') {
                onUnreadChange?.(data.unread);
            }
        } catch (error) {
            console.error('Failed to fetch messages', error);
        } finally {
            setLoading(false);
        }
    };

    const handleRead = async (id) => {
        try {
            await markAsRead(id);
            const next = messages.map(m => m._id === id ? { ...m, isRead: true } : m);
            setMessages(next);
            if (selectedMsg && selectedMsg._id === id) {
                setSelectedMsg({ ...selectedMsg, isRead: true });
            }
            onUnreadChange?.(next.filter((m) => !m.isRead).length);
            // refresh accurate global unread (other pages may have unread)
            const data = await getMessages(page);
            if (typeof data.unread === 'number') onUnreadChange?.(data.unread);
        } catch (error) {
            console.error('Failed to mark read', error);
        }
    };

    const handleDelete = async (id, e) => {
        if (e) e.stopPropagation();
        if (!window.confirm('Delete this message?')) return;
        try {
            await deleteMessage(id);
            if (selectedMsg && selectedMsg._id === id) {
                setSelectedMsg(null);
            }
            fetchMessages(page);
        } catch (error) {
            console.error('Failed to delete', error);
        }
    };

    const openMessage = (msg) => {
        setSelectedMsg(msg);
        if (!msg.isRead) {
            handleRead(msg._id);
        }
    };

    return (
        <div className="flex flex-col h-full gap-6 max-w-6xl relative">
            <h2 className="text-2xl font-bold text-white font-heading">Contact Inbox</h2>

            {loading && !messages.length ? (
                <div className="text-white/60">Loading inbox...</div>
            ) : (
                <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden backdrop-blur-md">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-white/10 text-xs uppercase text-white/40 bg-white/[0.02]">
                                    <th className="p-4 font-medium w-12"></th>
                                    <th className="p-4 font-medium">Name</th>
                                    <th className="p-4 font-medium">Email</th>
                                    <th className="p-4 font-medium">Phone</th>
                                    <th className="p-4 font-medium w-1/3">Message Preview</th>
                                    <th className="p-4 font-medium">Date</th>
                                    <th className="p-4 font-medium text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {messages.length === 0 ? (
                                    <tr>
                                        <td colSpan="7" className="p-8 text-center text-white/40 italic">
                                            No messages found.
                                        </td>
                                    </tr>
                                ) : (
                                    messages.map((msg) => (
                                        <tr 
                                            key={msg._id} 
                                            onClick={() => openMessage(msg)}
                                            className={`border-b border-white/5 cursor-pointer transition-colors hover:bg-white/[0.04] ${!msg.isRead ? 'bg-accent-cyan/[0.03]' : ''}`}
                                        >
                                            <td className="p-4 text-center">
                                                {!msg.isRead ? (
                                                    <Mail className="w-5 h-5 text-accent-cyan inline-block" />
                                                ) : (
                                                    <MailOpen className="w-5 h-5 text-white/30 inline-block" />
                                                )}
                                            </td>
                                            <td className={`p-4 ${!msg.isRead ? 'text-white font-semibold' : 'text-white/70'}`}>
                                                {msg.name}
                                            </td>
                                            <td className="p-4 text-sm text-white/60">
                                                {msg.email}
                                            </td>
                                            <td className="p-4 text-sm text-white/60">
                                                {msg.phone || <span className="text-white/30 italic">Not provided</span>}
                                            </td>
                                            <td className="p-4">
                                                <div className={`text-sm truncate max-w-xs ${!msg.isRead ? 'text-white/90 font-medium' : 'text-white/50'}`}>
                                                    {msg.message}
                                                </div>
                                            </td>
                                            <td className="p-4 text-xs text-white/50 whitespace-nowrap">
                                                {new Date(msg.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="p-4 text-right">
                                                <button
                                                    onClick={(e) => handleDelete(msg._id, e)}
                                                    className="p-2 text-red-400/60 hover:text-red-400 hover:bg-red-500/10 rounded-md transition-colors"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                    
                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="p-4 border-t border-white/10 flex items-center justify-between text-sm">
                            <span className="text-white/50">
                                Page {page} of {totalPages}
                            </span>
                            <div className="flex gap-2">
                                <button 
                                    disabled={page === 1}
                                    onClick={() => setPage(p => p - 1)}
                                    className="p-1 rounded bg-white/5 text-white hover:bg-white/10 disabled:opacity-30"
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                </button>
                                <button 
                                    disabled={page === totalPages}
                                    onClick={() => setPage(p => p + 1)}
                                    className="p-1 rounded bg-white/5 text-white hover:bg-white/10 disabled:opacity-30"
                                >
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Read Message Modal */}
            <AnimatePresence>
                {selectedMsg && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary-navy/80 backdrop-blur-sm"
                        onClick={() => setSelectedMsg(null)}
                    >
                        <motion.div
                            initial={{ y: 20, scale: 0.95 }}
                            animate={{ y: 0, scale: 1 }}
                            exit={{ y: 20, scale: 0.95 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-[#0b172a] border border-white/10 rounded-2xl p-6 w-full max-w-2xl shadow-2xl relative"
                        >
                            <button
                                onClick={() => setSelectedMsg(null)}
                                className="absolute top-4 right-4 p-2 text-white/40 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                            
                            <h3 className="text-xl font-semibold text-white mb-6 pr-8">Message Details</h3>
                            
                            <div className="grid grid-cols-2 gap-4 mb-6 p-4 rounded-lg bg-white/5 border border-white/5">
                                <div>
                                    <span className="block text-xs text-white/40 uppercase tracking-wider mb-1">From</span>
                                    <span className="text-white font-medium">{selectedMsg.name}</span>
                                </div>
                                <div>
                                    <span className="block text-xs text-white/40 uppercase tracking-wider mb-1">Date</span>
                                    <span className="text-white/80">{new Date(selectedMsg.createdAt).toLocaleString()}</span>
                                </div>
                                <div>
                                    <span className="block text-xs text-white/40 uppercase tracking-wider mb-1">Email</span>
                                    <a href={`mailto:${selectedMsg.email}`} className="text-accent-cyan hover:underline">{selectedMsg.email}</a>
                                </div>
                                <div>
                                    <span className="block text-xs text-white/40 uppercase tracking-wider mb-1">Phone</span>
                                    <span className="text-white/80">{selectedMsg.phone || 'N/A'}</span>
                                </div>
                            </div>
                            
                            <div className="mb-8">
                                <span className="block text-xs text-white/40 uppercase tracking-wider mb-2">Message</span>
                                <div className="p-4 rounded-lg bg-white/5 border border-white/5 text-white/90 leading-relaxed whitespace-pre-wrap">
                                    {selectedMsg.message}
                                </div>
                            </div>
                            
                            <div className="flex justify-end gap-3 border-t border-white/10 pt-4 mt-auto">
                                <button
                                    onClick={() => {
                                        handleDelete(selectedMsg._id);
                                    }}
                                    className="px-4 py-2 text-red-400 hover:text-white bg-red-500/10 hover:bg-red-500 rounded-lg transition-colors flex items-center gap-2 text-sm"
                                >
                                    <Trash2 className="w-4 h-4" /> Delete Message
                                </button>
                                <a
                                    href={`mailto:${selectedMsg.email}`}
                                    className="px-6 py-2 bg-accent-cyan text-primary-navy font-semibold rounded-lg hover:bg-accent-cyan/90 transition-colors text-sm flex items-center"
                                >
                                    Reply via Email
                                </a>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
