'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useModal } from './ModalContext';

const navLinks = [
  { label: 'Özellikler', href: '#features' },
  { label: 'AI Koç', href: '#coach' },
  { label: 'Fiyatlar', href: '#pricing' },
  { label: 'Ebeveyn Paneli', href: '#dashboard' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { open } = useModal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 shadow-sm py-3"
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <motion.div
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.25 }}
            className="w-10 h-10 bg-primary rounded-[14px] flex items-center justify-center shadow-glow shrink-0"
          >
            <svg width="22" height="22" viewBox="0 0 30 30" fill="none">
              <circle cx="15" cy="11" r="7" fill="white"/>
              <circle cx="9" cy="20" r="4" fill="white" opacity=".85"/>
              <circle cx="21" cy="20" r="4" fill="white" opacity=".85"/>
              <circle cx="15" cy="25" r="3" fill="white" opacity=".55"/>
            </svg>
          </motion.div>
          <span className="font-heading font-900 text-xl text-dark tracking-tight">
            Büyüy<span className="text-primary-light">o</span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-body text-sm font-600 text-dark/70 hover:text-primary transition-colors duration-200 relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-primary group-hover:w-full transition-all duration-300 rounded-full" />
            </a>
          ))}
        </nav>

        {/* CTA buttons */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={open}
            className="font-heading font-700 text-sm text-primary hover:text-primary/80 transition-colors px-4 py-2"
          >
            Giriş Yap
          </button>
          <motion.button
            onClick={open}
            whileHover={{ scale: 1.04, boxShadow: '0 8px 24px rgba(79,70,229,0.35)' }}
            whileTap={{ scale: 0.97 }}
            className="font-heading font-700 text-sm text-white bg-primary px-5 py-2.5 rounded-full shadow-glow transition-all duration-200 flex items-center gap-2"
          >
            Ücretsiz Başla 🚀
          </motion.button>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Menü"
        >
          <motion.span
            animate={{ rotate: mobileOpen ? 45 : 0, y: mobileOpen ? 8 : 0 }}
            className="block w-6 h-0.5 bg-dark rounded-full"
          />
          <motion.span
            animate={{ opacity: mobileOpen ? 0 : 1 }}
            className="block w-6 h-0.5 bg-dark rounded-full"
          />
          <motion.span
            animate={{ rotate: mobileOpen ? -45 : 0, y: mobileOpen ? -8 : 0 }}
            className="block w-6 h-0.5 bg-dark rounded-full"
          />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-white/30 overflow-hidden"
          >
            <div className="px-6 py-5 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="font-heading font-700 text-base text-dark/80 hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <button
                onClick={() => { setMobileOpen(false); open(); }}
                className="font-heading font-700 text-sm text-white bg-primary px-5 py-3 rounded-2xl text-center shadow-glow mt-2"
              >
                Ücretsiz Başla 🚀
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
