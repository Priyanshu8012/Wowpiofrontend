import React, { useState } from 'react';
import { contactData } from '../data/contact';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

import { submitContact } from '../api/contact.api.js';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    try {
      await submitContact(formData);
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: '', email: '', phone: '', message: '' });
      }, 5000);
    } catch (error) {
      console.error('Failed to submit contact message', error);
      alert('Failed to send message, please try again.');
    }
  };

  const socialLinks = [
    {
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
      href: '#',
      color: 'hover:text-blue-600 hover:bg-blue-50'
    },
    {
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
      ),
      href: '#',
      color: 'hover:text-pink-600 hover:bg-pink-50'
    },
    {
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ),
      href: '#',
      color: 'hover:text-black hover:bg-gray-100'
    },
    {
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
      href: '#',
      color: 'hover:text-blue-700 hover:bg-blue-50'
    }
  ];


  return (
    <section id="contact" className="py-24 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-blue-50/50 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="font-heading font-extrabold text-3xl sm:text-4xl text-primary-dark"
          >
            Get In <span className="text-gradient">Touch With Us</span>
          </motion.h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: '80px' }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-1 bg-gradient-to-r from-accent-cyan to-accent-ocean mx-auto mt-4 rounded-full"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
          
          {/* Left Column: Form Card */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 shadow-lg border border-blue-50 hover:shadow-xl hover:border-accent-cyan/15 transition-all duration-300 relative overflow-hidden"
          >
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form 
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit} 
                  className="space-y-8"
                >
                  <h3 className="font-heading font-bold text-xl text-primary-blue mb-4">
                    Send Us a Message
                  </h3>

                  {/* Name Input with Floating Label */}
                  <div className="relative">
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder=" "
                      required
                      className="peer w-full border-b-2 border-gray-200 focus:border-accent-ocean outline-none py-3 text-sm text-primary-dark font-sans transition-all bg-transparent"
                    />
                    <label
                      htmlFor="name"
                      className="absolute left-0 top-3 text-primary-dark/45 text-sm transition-all duration-300 pointer-events-none peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:top-[-12px] peer-focus:text-xs peer-focus:text-accent-ocean peer-[:not(:placeholder-shown)]:top-[-12px] peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-accent-ocean"
                    >
                      Your Name
                    </label>
                  </div>

                  {/* Email Input with Floating Label */}
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder=" "
                      required
                      className="peer w-full border-b-2 border-gray-200 focus:border-accent-ocean outline-none py-3 text-sm text-primary-dark font-sans transition-all bg-transparent"
                    />
                    <label
                      htmlFor="email"
                      className="absolute left-0 top-3 text-primary-dark/45 text-sm transition-all duration-300 pointer-events-none peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:top-[-12px] peer-focus:text-xs peer-focus:text-accent-ocean peer-[:not(:placeholder-shown)]:top-[-12px] peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-accent-ocean"
                    >
                      Email Address
                    </label>
                  </div>

                  {/* Phone Input with Floating Label */}
                  <div className="relative">
                    <input
                      type="tel"
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder=" "
                      className="peer w-full border-b-2 border-gray-200 focus:border-accent-ocean outline-none py-3 text-sm text-primary-dark font-sans transition-all bg-transparent"
                    />
                    <label
                      htmlFor="phone"
                      className="absolute left-0 top-3 text-primary-dark/45 text-sm transition-all duration-300 pointer-events-none peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:top-[-12px] peer-focus:text-xs peer-focus:text-accent-ocean peer-[:not(:placeholder-shown)]:top-[-12px] peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-accent-ocean"
                    >
                      Phone Number (Optional)
                    </label>
                  </div>

                  {/* Message Input with Floating Label */}
                  <div className="relative">
                    <textarea
                      id="message"
                      rows="4"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder=" "
                      required
                      className="peer w-full border-b-2 border-gray-200 focus:border-accent-ocean outline-none py-3 text-sm text-primary-dark font-sans transition-all bg-transparent resize-none"
                    ></textarea>
                    <label
                      htmlFor="message"
                      className="absolute left-0 top-3 text-primary-dark/45 text-sm transition-all duration-300 pointer-events-none peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:top-[-12px] peer-focus:text-xs peer-focus:text-accent-ocean peer-[:not(:placeholder-shown)]:top-[-12px] peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-accent-ocean"
                    >
                      Your Message
                    </label>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full py-4 rounded-full font-heading text-xs font-bold tracking-wider uppercase text-white bg-gradient-to-r from-accent-ocean to-accent-cyan hover:shadow-lg hover:shadow-accent-cyan/20 transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <span>Send Inquiry</span>
                    <Send className="w-3.5 h-3.5" />
                  </motion.button>
                </motion.form>
              ) : (
                <motion.div 
                  key="success"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="h-full min-h-[350px] flex flex-col items-center justify-center text-center space-y-4"
                >
                  <CheckCircle2 className="w-16 h-16 text-accent-teal animate-bounce" />
                  <h3 className="font-heading font-extrabold text-2xl text-primary-dark">
                    Thank You!
                  </h3>
                  <p className="font-sans text-sm text-primary-dark/70 max-w-sm leading-relaxed">
                    Your inquiry has been successfully transmitted. Our customer success team will contact you within the next 24 business hours.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Right Column: Contact Info & Map */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 flex flex-col space-y-6 justify-between"
          >
            {/* Quick Contact Details */}
            <div className="bg-gradient-to-br from-blue-50/50 via-cyan-50/20 to-white rounded-3xl p-8 border border-blue-50/60 shadow-sm flex flex-col space-y-6">
              <h3 className="font-heading font-bold text-xl text-primary-blue">
                Contact Information
              </h3>
              
              <div className="flex items-start space-x-4">
                <MapPin className="w-5 h-5 text-accent-ocean shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span className="font-heading text-xs font-bold text-primary-dark/40 uppercase tracking-wider">Address</span>
                  <span className="font-sans text-sm text-primary-dark/80 font-medium">{contactData.address}</span>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Phone className="w-5 h-5 text-accent-teal shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span className="font-heading text-xs font-bold text-primary-dark/40 uppercase tracking-wider">Consumer Helpline</span>
                  <span className="font-sans text-sm text-primary-dark/80 font-medium">{contactData.helpline}</span>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Mail className="w-5 h-5 text-accent-cyan shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span className="font-heading text-xs font-bold text-primary-dark/40 uppercase tracking-wider">Support</span>
                  <span className="font-sans text-sm text-primary-dark/80 font-medium">{contactData.supportEmail}</span>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <Mail className="w-5 h-5 text-accent-teal shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span className="font-heading text-xs font-bold text-primary-dark/40 uppercase tracking-wider">Care</span>
                  <span className="font-sans text-sm text-primary-dark/80 font-medium">{contactData.careEmail}</span>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-2 border-t border-gray-100 flex flex-col space-y-3">
                <span className="font-heading text-xs font-bold text-primary-dark/40 uppercase tracking-wider">Follow Us</span>
                <div className="flex space-x-3">
                  {socialLinks.map((social, i) => (
                    <motion.a
                      key={i}
                      href={social.href}
                      whileHover={{ y: -4, scale: 1.05 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 10 }}
                      className={`p-3 bg-gray-100/50 border border-gray-200/40 rounded-full text-primary-dark/60 transition-colors ${social.color}`}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>

            {/* Google Map Embed */}
            <div className="relative h-64 bg-gray-100 rounded-3xl overflow-hidden shadow-sm flex items-center justify-center group select-none">
              <iframe 
                src="https://maps.google.com/maps?q=Plot%20No.%20118K,%20Tilmapur,%20Ashapur,%20Varanasi,%20U.P,%20221007&t=&z=15&ie=UTF8&iwloc=&output=embed" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="WOWPIO HQ Location Map"
                className="absolute inset-0 grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
