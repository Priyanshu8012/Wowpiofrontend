import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageSquare,
  X,
  Bot,
  User,
  Sparkles,
  FileText,
  MessagesSquare,
  Loader2,
  CheckCircle2,
  Phone,
  Factory,
  Package,
  Clock3,
  ShieldCheck,
  ThumbsUp,
  ExternalLink,
} from 'lucide-react';
import { contactData, telHref, waHref } from '../data/contact';
import { submitChatEnquiry } from '../api/chatEnquiry.api.js';

const STORAGE_KEY = 'wowpio_chat_messages_v1';

const INTEREST_OPTIONS = [
  { value: 'order', label: 'Home / office order' },
  { value: 'bulk', label: 'Bulk / society supply' },
  { value: 'distributor', label: 'Distributor enquiry' },
  { value: 'support', label: 'Support' },
  { value: 'other', label: 'Other' },
];

const prebuiltReplies = {
  purity: {
    question: 'How pure is WOWPIO water?',
    answer:
      'WOWPIO follows a multi-stage purity process: source intake → RO → UV disinfection → mineral balance → sealed bottling at Bachcoach under controlled hygiene, aligned with applicable FSSAI standards.',
    links: [{ label: 'See process', to: '/process' }],
  },
  sizes: {
    question: 'What bottle sizes are available?',
    answer:
      'We offer 250ml, 500ml, 1L, 2L packs and 20L jars for homes and offices. Share your city and volume in Enquire for the right mix.',
    links: [{ label: 'View products', to: '/products' }],
  },
  distributor: {
    question: 'How do I become a distributor?',
    answer:
      'Distributor opportunities are open in select zones. Use the Enquire form with your city and territory interest — our team will follow up with onboarding details.',
    links: [{ label: 'Leave enquiry', action: 'form' }],
  },
  manufacturing: {
    question: 'Where is WOWPIO manufactured?',
    answer:
      'WOWPIO is manufactured at Bachcoach, Varanasi. The Manufacturing page lists plant address, licence info, and a live batch log (product, date & time).',
    links: [{ label: 'Manufacturing unit', to: '/manufacturing' }],
  },
  price: {
    question: 'What is the pricing of 20L jars?',
    answer:
      'A standard 20L jar is typically around ₹90. Corporate and society plans get volume pricing. Share quantity in Enquire for an exact quote.',
    links: [
      { label: 'Get a quote', action: 'form' },
      { label: 'WhatsApp', action: 'whatsapp' },
    ],
  },
};

const emptyForm = {
  name: '',
  phone: '',
  email: '',
  city: '',
  interest: 'order',
  message: '',
};

function nowTime() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function isSupportHours() {
  const hour = new Date().getHours();
  return hour >= 9 && hour < 20;
}

function welcomeMessage() {
  return {
    sender: 'bot',
    text: isSupportHours()
      ? 'Welcome to WOWPIO Support. We are online now — ask a quick question, or leave an enquiry and our team will follow up.'
      : 'Welcome to WOWPIO Support. We are currently outside peak hours (9 AM – 8 PM). Leave an enquiry anytime — we reply next business day.',
    time: nowTime(),
  };
}

function loadMessages() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return [welcomeMessage()];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length ? parsed : [welcomeMessage()];
  } catch {
    return [welcomeMessage()];
  }
}

function isValidPhone(phone) {
  const digits = String(phone).replace(/\D/g, '');
  return digits.length >= 10 && digits.length <= 13;
}

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [tab, setTab] = useState('chat');
  const [messages, setMessages] = useState(loadMessages);
  const [isTyping, setIsTyping] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState(false);
  const [hoverTip, setHoverTip] = useState(false);
  const [ratedIds, setRatedIds] = useState(() => new Set());
  const messagesEndRef = useRef(null);
  const online = isSupportHours();

  const whatsappUrl = waHref(
    "Hi WOWPIO, I'm interested in your packaged drinking water. Please share details."
  );

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-40)));
    } catch {
      /* ignore */
    }
  }, [messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping, tab, isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen]);

  const openPanel = useCallback((nextTab = 'chat') => {
    setHoverTip(false);
    setIsOpen(true);
    setTab(nextTab);
    if (nextTab === 'form') setFormSuccess(false);
  }, []);

  const handleLinkAction = (link) => {
    if (link.action === 'form') openPanel('form');
    if (link.action === 'whatsapp') window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const handleQuestionClick = (key) => {
    const qa = prebuiltReplies[key];
    if (!qa || isTyping) return;

    setMessages((prev) => [...prev, { sender: 'user', text: qa.question, time: nowTime() }]);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: qa.answer,
          time: nowTime(),
          links: qa.links || [],
          id: `${Date.now()}`,
        },
      ]);
    }, 850);
  };

  const handleHelpful = (msgId) => {
    setRatedIds((prev) => new Set(prev).add(msgId));
    setMessages((prev) => [
      ...prev,
      {
        sender: 'bot',
        text: 'Glad that helped. Need a quote or delivery in your city? Leave an enquiry — takes under a minute.',
        time: nowTime(),
        links: [{ label: 'Enquire now', action: 'form' }],
      },
    ]);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    if (!form.name.trim() || !form.phone.trim() || !form.message.trim()) {
      setFormError('Please fill name, phone, and message.');
      return;
    }
    if (!isValidPhone(form.phone)) {
      setFormError('Enter a valid mobile number (10+ digits).');
      return;
    }

    const cityLine = form.city.trim() ? `\nCity: ${form.city.trim()}` : '';
    const composed = `${form.message.trim()}${cityLine}`;

    try {
      setSubmitting(true);
      setFormError('');
      await submitChatEnquiry({
        name: form.name.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
        interest: form.interest,
        message: composed,
      });
      setFormSuccess(true);
      setForm(emptyForm);
      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: 'Thanks — your enquiry is with our team. We will contact you shortly. For faster replies, WhatsApp also works.',
          time: nowTime(),
          links: [{ label: 'WhatsApp now', action: 'whatsapp' }],
        },
      ]);
    } catch (err) {
      setFormError(err?.response?.data?.message || 'Could not send enquiry. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const quickActions = [
    {
      label: 'Enquire',
      icon: FileText,
      onClick: () => openPanel('form'),
    },
    {
      label: 'Products',
      icon: Package,
      to: '/products',
    },
    {
      label: 'Plant',
      icon: Factory,
      to: '/manufacturing',
    },
    {
      label: 'Call',
      icon: Phone,
      href: telHref(),
    },
  ];

  return (
    <motion.div
      className="fixed bottom-4 right-4 z-[90] flex flex-col items-end gap-3 md:bottom-5 md:right-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.4 }}
    >
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.06, y: -2 }}
        whileTap={{ scale: 0.95 }}
        className="relative flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/25"
        aria-label="Chat on WhatsApp"
      >
        <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366]/35" />
        <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
      </motion.a>

      <div
        className="relative"
        onMouseEnter={() => {
          if (!isOpen) setHoverTip(true);
        }}
        onMouseLeave={() => setHoverTip(false)}
      >
        <AnimatePresence>
          {hoverTip && !isOpen && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
              transition={{ duration: 0.18 }}
              className="pointer-events-none absolute bottom-1 right-[4.75rem] z-[100] w-[220px] rounded-2xl border border-[#0C0C0C]/10 bg-white px-3.5 py-3 text-left shadow-2xl"
            >
              <p className="font-heading text-[11px] font-bold text-[#0C0C0C]">Need water support?</p>
              <p className="mt-0.5 text-[11px] leading-snug text-[#0C0C0C]/55">
                Ask purity / packs, or leave an enquiry — we reply fast.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          type="button"
          onClick={() => {
            setHoverTip(false);
            if (isOpen) setIsOpen(false);
            else openPanel(tab);
          }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.95 }}
          className="relative z-[101] flex h-14 w-14 items-center justify-center rounded-full bg-[#0C0C0C] text-white shadow-xl shadow-black/25 ring-2 ring-[#C9A259]/45"
          aria-label="Toggle WOWPIO support chat"
        >
          {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6 text-[#C9A259]" />}
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            role="dialog"
            aria-label="WOWPIO support chat"
            initial={{ opacity: 0, y: 28, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ type: 'spring', damping: 22, stiffness: 220 }}
            className="flex h-[min(600px,78vh)] w-[min(400px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-[#0C0C0C]/10 bg-[#F6F4F0] shadow-2xl shadow-black/25"
          >
            {/* Header */}
            <div className="bg-[#0C0C0C] px-4 py-3.5 text-white">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="relative flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-[#C9A259]/30 to-[#1E4D6B]/40 ring-1 ring-[#C9A259]/40">
                    <Bot className="h-5 w-5 text-[#C9A259]" />
                    <span
                      className={`absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full ring-2 ring-[#0C0C0C] ${
                        online ? 'bg-emerald-400' : 'bg-amber-400'
                      }`}
                    />
                  </div>
                  <div className="text-left">
                    <p className="flex items-center gap-1.5 font-heading text-sm font-bold tracking-wide">
                      WOWPIO Support
                      <Sparkles className="h-3.5 w-3.5 text-[#C9A259]" />
                    </p>
                    <p className="mt-0.5 flex items-center gap-1.5 text-[11px] text-white/50">
                      <span
                        className={`inline-block h-1.5 w-1.5 rounded-full ${
                          online ? 'bg-emerald-400' : 'bg-amber-400'
                        }`}
                      />
                      {online ? 'Online · typically replies fast' : 'Away · enquire anytime'}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded-full p-1.5 text-white/50 transition-colors hover:bg-white/10 hover:text-white"
                  aria-label="Close chat"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-3 flex items-center gap-3 text-[10px] text-white/40">
                <span className="inline-flex items-center gap-1">
                  <ShieldCheck className="h-3 w-3 text-[#C9A259]" />
                  Secure enquiry
                </span>
                <span className="inline-flex items-center gap-1">
                  <Clock3 className="h-3 w-3 text-[#C9A259]" />
                  9 AM – 8 PM
                </span>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-1 rounded-xl bg-white/5 p-1">
                <button
                  type="button"
                  onClick={() => setTab('chat')}
                  className={`inline-flex items-center justify-center gap-1.5 rounded-lg px-3 py-2 font-heading text-[11px] font-bold uppercase tracking-[0.12em] transition-colors ${
                    tab === 'chat'
                      ? 'bg-[#C9A259] text-[#0C0C0C]'
                      : 'text-white/55 hover:text-white'
                  }`}
                >
                  <MessagesSquare className="h-3.5 w-3.5" />
                  Chat
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setTab('form');
                    setFormSuccess(false);
                  }}
                  className={`inline-flex items-center justify-center gap-1.5 rounded-lg px-3 py-2 font-heading text-[11px] font-bold uppercase tracking-[0.12em] transition-colors ${
                    tab === 'form'
                      ? 'bg-[#C9A259] text-[#0C0C0C]'
                      : 'text-white/55 hover:text-white'
                  }`}
                >
                  <FileText className="h-3.5 w-3.5" />
                  Enquire
                </button>
              </div>
            </div>

            {/* Quick actions */}
            <div className="flex gap-1.5 overflow-x-auto border-b border-[#0C0C0C]/08 bg-white/70 px-3 py-2.5">
              {quickActions.map((action) => {
                const Icon = action.icon;
                const className =
                  'inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[#0C0C0C]/10 bg-[#F6F4F0] px-2.5 py-1.5 text-[10px] font-semibold text-[#0C0C0C]/70 transition-colors hover:border-[#C9A259]/50 hover:text-[#0C0C0C]';
                if (action.to) {
                  return (
                    <Link key={action.label} to={action.to} className={className} onClick={() => setIsOpen(false)}>
                      <Icon className="h-3 w-3 text-[#1E4D6B]" />
                      {action.label}
                    </Link>
                  );
                }
                if (action.href) {
                  return (
                    <a key={action.label} href={action.href} className={className}>
                      <Icon className="h-3 w-3 text-[#1E4D6B]" />
                      {action.label}
                    </a>
                  );
                }
                return (
                  <button key={action.label} type="button" onClick={action.onClick} className={className}>
                    <Icon className="h-3 w-3 text-[#1E4D6B]" />
                    {action.label}
                  </button>
                );
              })}
            </div>

            {tab === 'chat' ? (
              <>
                <div className="flex-1 space-y-3 overflow-y-auto px-3.5 py-4">
                  {messages.map((msg, i) => (
                    <motion.div
                      key={`${msg.time}-${i}-${msg.id || ''}`}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`flex max-w-[88%] items-end gap-2 ${
                          msg.sender === 'user' ? 'flex-row-reverse' : ''
                        }`}
                      >
                        <div
                          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                            msg.sender === 'user'
                              ? 'bg-[#1E4D6B] text-white'
                              : 'border border-[#0C0C0C]/08 bg-white text-[#1E4D6B]'
                          }`}
                        >
                          {msg.sender === 'user' ? (
                            <User className="h-3.5 w-3.5" />
                          ) : (
                            <Bot className="h-3.5 w-3.5" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <div
                            className={`rounded-2xl px-3.5 py-2.5 text-left text-[12px] leading-relaxed shadow-sm ${
                              msg.sender === 'user'
                                ? 'rounded-br-md bg-[#1E4D6B] text-white'
                                : 'rounded-bl-md border border-[#0C0C0C]/06 bg-white text-[#0C0C0C]/80'
                            }`}
                          >
                            <p>{msg.text}</p>
                            <span className="mt-1.5 block text-right text-[9px] opacity-50">
                              {msg.time}
                            </span>
                          </div>

                          {msg.sender === 'bot' && msg.links?.length ? (
                            <div className="mt-1.5 flex flex-wrap gap-1.5">
                              {msg.links.map((link) =>
                                link.to ? (
                                  <Link
                                    key={link.label}
                                    to={link.to}
                                    onClick={() => setIsOpen(false)}
                                    className="inline-flex items-center gap-1 rounded-full border border-[#1E4D6B]/20 bg-white px-2.5 py-1 text-[10px] font-semibold text-[#1E4D6B] hover:bg-[#1E4D6B] hover:text-white"
                                  >
                                    {link.label}
                                    <ExternalLink className="h-2.5 w-2.5" />
                                  </Link>
                                ) : (
                                  <button
                                    key={link.label}
                                    type="button"
                                    onClick={() => handleLinkAction(link)}
                                    className="inline-flex items-center gap-1 rounded-full border border-[#C9A259]/35 bg-[#C9A259]/10 px-2.5 py-1 text-[10px] font-semibold text-[#0C0C0C] hover:bg-[#C9A259]"
                                  >
                                    {link.label}
                                  </button>
                                )
                              )}
                            </div>
                          ) : null}

                          {msg.sender === 'bot' && msg.id && !ratedIds.has(msg.id) ? (
                            <button
                              type="button"
                              onClick={() => handleHelpful(msg.id)}
                              className="mt-1.5 inline-flex items-center gap-1 text-[10px] font-medium text-[#0C0C0C]/40 hover:text-[#C9A259]"
                            >
                              <ThumbsUp className="h-3 w-3" />
                              Helpful
                            </button>
                          ) : null}
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {isTyping && (
                    <div className="flex items-end gap-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full border border-[#0C0C0C]/08 bg-white text-[#1E4D6B]">
                        <Bot className="h-3.5 w-3.5" />
                      </div>
                      <div className="flex gap-1 rounded-2xl rounded-bl-md border border-[#0C0C0C]/06 bg-white px-3 py-2.5">
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#0C0C0C]/35 [animation-delay:0ms]" />
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#0C0C0C]/35 [animation-delay:150ms]" />
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#0C0C0C]/35 [animation-delay:300ms]" />
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                <div className="border-t border-[#0C0C0C]/08 bg-white/85 px-3 py-3 backdrop-blur">
                  <p className="mb-2 px-0.5 font-heading text-[9px] font-bold uppercase tracking-[0.18em] text-[#0C0C0C]/35">
                    Suggested
                  </p>
                  <div className="flex max-h-24 flex-wrap gap-1.5 overflow-y-auto">
                    {Object.keys(prebuiltReplies).map((key) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => handleQuestionClick(key)}
                        disabled={isTyping}
                        className="rounded-full border border-[#1E4D6B]/15 bg-[#1E4D6B]/05 px-2.5 py-1.5 text-left text-[10px] font-medium text-[#1E4D6B] transition-colors hover:border-[#1E4D6B]/40 hover:bg-[#1E4D6B] hover:text-white disabled:opacity-45"
                      >
                        {prebuiltReplies[key].question}
                      </button>
                    ))}
                  </div>
                  <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-[#0C0C0C]/06 pt-2.5 text-[10px] text-[#0C0C0C]/45">
                    <a href={telHref()} className="inline-flex items-center gap-1 font-medium hover:text-[#1E4D6B]">
                      <Phone className="h-3 w-3" />
                      {contactData.helpline}
                    </a>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-heading font-bold uppercase tracking-[0.1em] text-[#25D366]"
                    >
                      WhatsApp
                    </a>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 overflow-y-auto px-4 py-4">
                {formSuccess ? (
                  <div className="flex h-full flex-col items-center justify-center px-4 text-center">
                    <CheckCircle2 className="h-12 w-12 text-[#C9A259]" />
                    <p className="mt-4 font-heading text-lg font-bold text-[#0C0C0C]">
                      Enquiry received
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-[#0C0C0C]/55">
                      Saved to our admin inbox. We will call or message you shortly.
                    </p>
                    <div className="mt-6 flex flex-wrap justify-center gap-2">
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-xl bg-[#25D366] px-4 py-2.5 font-heading text-[11px] font-bold uppercase tracking-[0.12em] text-white"
                      >
                        WhatsApp now
                      </a>
                      <button
                        type="button"
                        onClick={() => setTab('chat')}
                        className="rounded-xl border border-[#0C0C0C]/15 px-4 py-2.5 font-heading text-[11px] font-bold uppercase tracking-[0.12em] text-[#0C0C0C]/70"
                      >
                        Back to chat
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-3">
                    <div className="rounded-xl border border-[#C9A259]/25 bg-[#C9A259]/08 px-3 py-2.5 text-[11px] leading-relaxed text-[#0C0C0C]/65">
                      Goes straight to the WOWPIO team. Include city + pack size for faster quotes.
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="col-span-2 sm:col-span-1">
                        <label className="mb-1 block font-heading text-[10px] font-bold uppercase tracking-[0.16em] text-[#0C0C0C]/40">
                          Name *
                        </label>
                        <input
                          required
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          className="w-full rounded-xl border border-[#0C0C0C]/12 bg-white px-3.5 py-2.5 text-sm text-[#0C0C0C] outline-none focus:border-[#C9A259]"
                          placeholder="Your name"
                        />
                      </div>
                      <div className="col-span-2 sm:col-span-1">
                        <label className="mb-1 block font-heading text-[10px] font-bold uppercase tracking-[0.16em] text-[#0C0C0C]/40">
                          Phone *
                        </label>
                        <input
                          required
                          type="tel"
                          inputMode="tel"
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          className="w-full rounded-xl border border-[#0C0C0C]/12 bg-white px-3.5 py-2.5 text-sm text-[#0C0C0C] outline-none focus:border-[#C9A259]"
                          placeholder="10-digit mobile"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="mb-1 block font-heading text-[10px] font-bold uppercase tracking-[0.16em] text-[#0C0C0C]/40">
                          City
                        </label>
                        <input
                          value={form.city}
                          onChange={(e) => setForm({ ...form, city: e.target.value })}
                          className="w-full rounded-xl border border-[#0C0C0C]/12 bg-white px-3.5 py-2.5 text-sm text-[#0C0C0C] outline-none focus:border-[#C9A259]"
                          placeholder="Varanasi"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block font-heading text-[10px] font-bold uppercase tracking-[0.16em] text-[#0C0C0C]/40">
                          Interest
                        </label>
                        <select
                          value={form.interest}
                          onChange={(e) => setForm({ ...form, interest: e.target.value })}
                          className="w-full rounded-xl border border-[#0C0C0C]/12 bg-white px-3.5 py-2.5 text-sm text-[#0C0C0C] outline-none focus:border-[#C9A259]"
                        >
                          {INTEREST_OPTIONS.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="mb-1 block font-heading text-[10px] font-bold uppercase tracking-[0.16em] text-[#0C0C0C]/40">
                        Email
                      </label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full rounded-xl border border-[#0C0C0C]/12 bg-white px-3.5 py-2.5 text-sm text-[#0C0C0C] outline-none focus:border-[#C9A259]"
                        placeholder="Optional"
                      />
                    </div>

                    <div>
                      <label className="mb-1 block font-heading text-[10px] font-bold uppercase tracking-[0.16em] text-[#0C0C0C]/40">
                        Message *
                      </label>
                      <textarea
                        required
                        rows={3}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className="w-full resize-none rounded-xl border border-[#0C0C0C]/12 bg-white px-3.5 py-2.5 text-sm text-[#0C0C0C] outline-none focus:border-[#C9A259]"
                        placeholder="Pack size, quantity, delivery area…"
                      />
                    </div>

                    {formError ? (
                      <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-600">
                        {formError}
                      </p>
                    ) : null}

                    <button
                      type="submit"
                      disabled={submitting}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#C9A259] px-4 py-3 font-heading text-xs font-bold uppercase tracking-[0.14em] text-[#0C0C0C] transition-colors hover:bg-[#A8893F] disabled:opacity-55"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Sending…
                        </>
                      ) : (
                        'Submit enquiry'
                      )}
                    </button>
                    <p className="text-center text-[10px] text-[#0C0C0C]/40">
                      Or call{' '}
                      <a href={telHref()} className="font-semibold text-[#1E4D6B]">
                        {contactData.helpline}
                      </a>
                    </p>
                  </form>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
