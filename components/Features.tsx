'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const modules = [
  {
    emoji: '🥛',
    title: 'Beslenme Rehberi',
    desc: 'Bebeğinizin yaşına özel beslenme programları, tamamlayıcı gıda önerileri ve günlük takip sistemi.',
    bg: 'from-amber-50 to-yellow-50',
    border: 'border-amber-100',
    accent: '#F59E0B',
    accentBg: '#FEF3C7',
    tags: ['Yaşa özel menüler', 'Alerjik gıda uyarıları', 'Besin takibi'],
    delay: 0,
  },
  {
    emoji: '🧠',
    title: 'Psikoloji & Duygusal Gelişim',
    desc: '8 kapsamlı ders modülüyle bebeğinizin duygusal zekasını ve bilişsel gelişimini destekleyin.',
    bg: 'from-violet-50 to-indigo-50',
    border: 'border-indigo-100',
    accent: '#4F46E5',
    accentBg: '#EDE9FE',
    tags: ['Güvenli bağlanma', 'Öfke yönetimi', 'Sosyal gelişim'],
    delay: 0.1,
  },
  {
    emoji: '🎵',
    title: 'Ninniler & Uyku Müziği',
    desc: 'Geleneksel ve modern ninnilerden oluşan özel derlememizle bebeğinizi huzurla uyutun.',
    bg: 'from-pink-50 to-rose-50',
    border: 'border-pink-100',
    accent: '#EC4899',
    accentBg: '#FCE7F3',
    tags: ['50+ ninni', 'Vinyl animasyonu', 'Offline dinleme'],
    delay: 0.2,
  },
  {
    emoji: '📈',
    title: 'WHO Büyüme Takibi',
    desc: 'Bebeğinizin boy, kilo ve baş çevresi ölçümlerini WHO standartlarına göre takip edin.',
    bg: 'from-emerald-50 to-teal-50',
    border: 'border-emerald-100',
    accent: '#10B981',
    accentBg: '#D1FAE5',
    tags: ['Büyüme grafikleri', 'Percentil hesabı', 'Doktor notları'],
    delay: 0.3,
  },
];

const extraFeatures = [
  { icon: '📅', title: 'Aşı & Muayene', desc: 'Hatırlatıcılar ve zamanlama rehberi' },
  { icon: '🤖', title: 'AI Koç', desc: 'Sınırsız soru-cevap asistanı' },
  { icon: '📚', title: 'Haftalık Bülten', desc: 'Uzman gelişim önerileri' },
  { icon: '🔥', title: 'Streak Sistemi', desc: 'Motivasyonu yüksek tutun' },
  { icon: '👑', title: 'Premium İçerik', desc: 'Kilitli modüllere erişim' },
  { icon: '🌙', title: 'Gece Modu', desc: 'Gözlere dost arayüz' },
];

function ModuleCard({ module }: { module: typeof modules[0] }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: module.delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -8, boxShadow: '0 20px 60px rgba(0,0,0,0.12)' }}
      className={`relative bg-gradient-to-br ${module.bg} border ${module.border} rounded-3xl p-6 cursor-default group overflow-hidden transition-shadow duration-300`}
    >
      {/* Decorative circle */}
      <div
        className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-20 group-hover:opacity-30 transition-opacity duration-300"
        style={{ backgroundColor: module.accent }}
      />

      {/* Emoji */}
      <motion.div
        whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
        transition={{ duration: 0.4 }}
        className="text-5xl mb-4 inline-block"
      >
        {module.emoji}
      </motion.div>

      {/* Title */}
      <h3 className="font-heading font-800 text-xl text-dark mb-2">{module.title}</h3>

      {/* Description */}
      <p className="font-body text-sm text-gray-500 leading-relaxed mb-4">{module.desc}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {module.tags.map((tag) => (
          <span
            key={tag}
            className="font-body text-xs font-600 px-3 py-1 rounded-full"
            style={{ backgroundColor: module.accentBg, color: module.accent }}
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function Features() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-60px' });

  return (
    <section id="features" className="py-24 px-6 bg-surface">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block font-body text-sm font-700 text-primary bg-primary-50 px-4 py-1.5 rounded-full mb-4 tracking-wide uppercase">
            ✨ Özellikler
          </span>
          <h2 className="font-heading font-900 text-4xl sm:text-5xl text-dark mb-5">
            Her şey tek bir{' '}
            <span className="gradient-text">uygulamada</span>
          </h2>
          <p className="font-body text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Bebeğinizin ilk günden okula başlamasına kadar ihtiyacınız olan tüm araçlar,
            bilimsel rehberlik ve sevecen bir AI koç.
          </p>
        </motion.div>

        {/* Module grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
          {modules.map((m) => (
            <ModuleCard key={m.title} module={m} />
          ))}
        </div>

        {/* Extra features grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
          className="bg-dark rounded-3xl p-8 sm:p-10"
        >
          <h3 className="font-heading font-800 text-2xl text-white text-center mb-8">
            Ve daha fazlası...
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
            {extraFeatures.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center text-center p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors cursor-default"
              >
                <span className="text-3xl mb-2">{feature.icon}</span>
                <p className="font-heading font-700 text-sm text-white mb-1">{feature.title}</p>
                <p className="font-body text-xs text-white/50">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
