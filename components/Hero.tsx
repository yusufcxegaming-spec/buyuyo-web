'use client';

import { motion, useReducedMotion, useInView } from 'framer-motion';
import { useRef, useMemo } from 'react';

const STARS = Array.from({ length: 80 }, (_, i) => ({
  id: i,
  top: `${Math.random() * 100}%`,
  left: `${Math.random() * 100}%`,
  size: Math.random() * 2.5 + 1,
  duration: Math.random() * 20 + 15,
  delay: Math.random() * 20,
  slow: i % 3 === 0,
}));

const stats = [
  { value: '50K+', label: 'Mutlu Ebeveyn' },
  { value: '4.9★', label: 'App Store Puanı' },
  { value: '200+', label: 'Uzman İçeriği' },
  { value: '%98', label: 'Memnuniyet' },
];

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true });

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 32 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-hero-gradient pt-20 pb-16">

      {/* Animated star field */}
      {!prefersReducedMotion && STARS.map(s => (
        <span
          key={s.id}
          className={`star ${s.slow ? 'star-slow' : ''} pointer-events-none`}
          style={{
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            animationDuration: `${s.duration}s`,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}

      {/* Breathing orbs */}
      <div
        className="orb orb-breathe w-[600px] h-[600px] bg-primary-light"
        style={{ top: -100, left: -150, animationDuration: '7s' }}
      />
      <div
        className="orb orb-breathe w-[500px] h-[500px] bg-[#EC4899]"
        style={{ top: '30%', right: -100, animationDuration: '9s', animationDelay: '2s' }}
      />
      <div
        className="orb orb-breathe w-[400px] h-[400px] bg-[#38BDF8]"
        style={{ bottom: -50, left: '20%', animationDuration: '11s', animationDelay: '4s' }}
      />

      {/* Hero content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center px-6 max-w-4xl mx-auto"
      >
        {/* Badge */}
        <motion.div variants={itemVariants} className="inline-flex items-center gap-2 glass-dark rounded-full px-4 py-2 mb-8">
          <span className="text-sm">✨</span>
          <span className="font-body text-xs font-600 text-white/80 uppercase tracking-wider">
            Türkiye'nin #1 Bebek Gelişim Platformu
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={itemVariants}
          className="font-heading font-900 text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-tight mb-6"
        >
          Bebeğinizin{' '}
          <span className="relative inline-block">
            <span className="text-[#818CF8]">Büyüme</span>
            <motion.svg
              className="absolute -bottom-2 left-0 w-full"
              viewBox="0 0 200 12"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 1, duration: 0.8, ease: 'easeOut' }}
            >
              <motion.path
                d="M2 9 Q50 2 100 6 Q150 10 198 4"
                stroke="#818CF8"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
              />
            </motion.svg>
          </span>
          {' '}Yolculuğu
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          variants={itemVariants}
          className="font-body text-lg sm:text-xl text-white/75 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Beslenme, psikoloji, ninni ve gelişim takibini tek uygulamada birleştiren,
          AI destekli kişisel koçunuzla ebeveynlik yolculuğunuzu kolaylaştırıyoruz.
        </motion.p>

        {/* CTA buttons */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
          <motion.a
            href="#download"
            whileHover={{ scale: 1.05, boxShadow: '0 12px 40px rgba(255,255,255,0.3)' }}
            whileTap={{ scale: 0.97 }}
            className="font-heading font-800 text-base text-primary bg-white px-8 py-4 rounded-full shadow-xl w-full sm:w-auto text-center flex items-center justify-center gap-2"
          >
            <span>🤖</span> Google Play'den İndir
          </motion.a>
          <motion.a
            href="#features"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="font-heading font-700 text-base text-white border-2 border-white/30 hover:border-white/60 px-8 py-4 rounded-full w-full sm:w-auto text-center transition-colors"
          >
            Özellikleri Keşfet ↓
          </motion.a>
        </motion.div>

        <div id="download" />

        {/* Phone mockup */}
        <motion.div
          variants={itemVariants}
          className="relative mx-auto"
          style={{ maxWidth: 380 }}
        >
          <motion.div
            animate={{ y: prefersReducedMotion ? 0 : [0, -12, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="relative"
          >
            <div className="relative mx-auto w-72 sm:w-80 bg-dark-mid rounded-[3rem] p-3 shadow-[0_40px_80px_rgba(0,0,0,0.5)] border border-white/10">
              <div className="bg-surface rounded-[2.5rem] overflow-hidden">
                <div className="bg-dark-mid h-7 flex items-center justify-center">
                  <div className="w-20 h-4 bg-dark rounded-full" />
                </div>
                <div className="bg-[#F8F7FF] px-4 pb-4 pt-3 min-h-[420px]">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="font-body text-xs text-gray-400">Merhaba! 👋</p>
                      <p className="font-heading font-800 text-lg text-dark">Bebek Ahmet</p>
                      <p className="font-body text-xs text-primary">8 aylık, 2 haftalık</p>
                    </div>
                    <div className="bg-white rounded-2xl p-2 shadow-card text-center min-w-[52px]">
                      <p className="text-xl">🔥</p>
                      <p className="font-heading font-800 text-base text-dark">7</p>
                      <p className="font-body text-[10px] text-gray-400">gün</p>
                    </div>
                  </div>
                  <div className="bg-primary rounded-2xl p-3 mb-4 flex items-center justify-between shadow-glow">
                    <div>
                      <p className="font-heading font-800 text-sm text-white">AI Koç</p>
                      <p className="font-body text-xs text-white/70">Soru sorun...</p>
                    </div>
                    <span className="text-2xl">🤖</span>
                  </div>
                  <p className="font-heading font-700 text-sm text-dark mb-3">Modüller</p>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { emoji: '🥛', title: 'Beslenme', bg: '#FEF3C7', color: '#D97706' },
                      { emoji: '🧠', title: 'Psikoloji', bg: '#EDE9FE', color: '#7C3AED' },
                      { emoji: '🎵', title: 'Ninniler', bg: '#FCE7F3', color: '#DB2777' },
                      { emoji: '📈', title: 'Gelişim', bg: '#D1FAE5', color: '#059669' },
                    ].map((m) => (
                      <div key={m.title} className="rounded-2xl p-3 shadow-card" style={{ backgroundColor: m.bg }}>
                        <p className="text-2xl mb-1">{m.emoji}</p>
                        <p className="font-heading font-700 text-xs" style={{ color: m.color }}>{m.title}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Scroll-reveal side badges */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="absolute -left-4 sm:-left-12 top-16 glass rounded-2xl px-4 py-2.5 shadow-soft hidden sm:flex items-center gap-2"
          >
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <p className="font-heading font-700 text-sm text-dark">7 gün serisi</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.5, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="absolute -right-4 sm:-right-12 top-32 glass rounded-2xl px-4 py-2.5 shadow-soft hidden sm:flex items-center gap-2"
          >
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <p className="font-heading font-700 text-sm text-dark">Ders tamamlandı</p>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Stats bar */}
      <motion.div
        ref={statsRef}
        initial={{ opacity: 0, y: 40 }}
        animate={statsInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-4xl mx-auto px-6 mt-16"
      >
        <div className="glass-dark rounded-3xl px-6 py-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={statsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <p className="font-heading font-900 text-2xl sm:text-3xl text-white mb-1">{stat.value}</p>
              <p className="font-body text-xs sm:text-sm text-white/50">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 80L1440 80L1440 40C1200 80 960 20 720 40C480 60 240 10 0 40L0 80Z" fill="#F8F7FF" />
        </svg>
      </div>
    </section>
  );
}
