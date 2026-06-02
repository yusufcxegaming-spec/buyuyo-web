'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const freeFeatures = [
  { text: 'Beslenme rehberi (temel)', included: true },
  { text: '2 psikoloji dersi', included: true },
  { text: '5 ninni', included: true },
  { text: 'WHO büyüme takibi', included: true },
  { text: 'AI Koç (10 mesaj/ay)', included: true },
  { text: 'Tüm psikoloji modülleri', included: false },
  { text: 'Sınırsız AI Koç', included: false },
  { text: 'Aşı hatırlatıcıları', included: false },
  { text: 'Haftalık gelişim bülteni', included: false },
];

const premiumFeatures = [
  { text: 'Beslenme rehberi (tam)', included: true },
  { text: 'Tüm 8 psikoloji modülü', included: true },
  { text: '50+ ninni & çalma listesi', included: true },
  { text: 'Detaylı büyüme grafikleri', included: true },
  { text: 'Sınırsız AI Koç sohbeti', included: true },
  { text: 'Aşı & muayene hatırlatıcıları', included: true },
  { text: 'Haftalık gelişim bültenleri', included: true },
  { text: 'Offline dinleme', included: true },
  { text: 'Öncelikli destek', included: true },
];

const testimonials = [
  {
    text: '"Büyüyo sayesinde bebeğimin her gelişim adımını kaçırmadan takip ediyorum. AI Koç\'a gecenin 3\'ünde soru sorabilmek inanılmaz!"',
    name: 'Elif K.',
    role: 'Yeni anne, İstanbul',
    rating: 5,
  },
  {
    text: '"Psikoloji dersleri gerçekten işe yarıyor. Kızımın öfke nöbetleri çok azaldı. Teşekkürler Büyüyo!"',
    name: 'Ahmet M.',
    role: 'Baba, Ankara',
    rating: 5,
  },
  {
    text: '"Büyüme takibi ve aşı takvimi özelliği mükemmel. Doktora giderken tüm bilgiler hazır oluyor."',
    name: 'Zeynep A.',
    role: 'Anne, İzmir',
    rating: 5,
  },
];

export default function Pricing() {
  const [yearly, setYearly] = useState(true);

  const monthlyPrice = yearly ? '₺49' : '₺99';
  const yearlyTotal = yearly ? '₺599' : '';
  const savings = yearly ? '%50 tasarruf' : '';

  return (
    <section id="pricing" className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <span className="inline-block font-body text-sm font-700 text-primary bg-primary-50 px-4 py-1.5 rounded-full mb-4 tracking-wide uppercase">
            👑 Premium
          </span>
          <h2 className="font-heading font-900 text-4xl sm:text-5xl text-dark mb-5">
            Bebeğinize en iyisini{' '}
            <span className="gradient-text">seçin</span>
          </h2>
          <p className="font-body text-lg text-gray-500 max-w-xl mx-auto">
            İstediğiniz zaman iptal edebilirsiniz. Kredi kartı gerekmez.
          </p>

          {/* Billing toggle */}
          <div className="inline-flex items-center gap-3 mt-6 p-1 bg-surface rounded-full border border-gray-100">
            <button
              onClick={() => setYearly(false)}
              className={`font-heading font-700 text-sm px-5 py-2 rounded-full transition-all duration-200 ${
                !yearly ? 'bg-white text-dark shadow-card' : 'text-gray-400'
              }`}
            >
              Aylık
            </button>
            <button
              onClick={() => setYearly(true)}
              className={`font-heading font-700 text-sm px-5 py-2 rounded-full transition-all duration-200 ${
                yearly ? 'bg-white text-dark shadow-card' : 'text-gray-400'
              }`}
            >
              Yıllık
            </button>
            {yearly && (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="font-heading font-700 text-xs text-white bg-buyuyo-green_accent px-2.5 py-1 rounded-full -ml-1"
              >
                {savings}
              </motion.span>
            )}
          </div>
        </motion.div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-20">
          {/* Free */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-surface border border-gray-100 rounded-3xl p-7 flex flex-col"
          >
            <div className="mb-6">
              <p className="font-heading font-700 text-lg text-dark mb-1">Ücretsiz</p>
              <p className="font-body text-sm text-gray-400 mb-4">Başlamak için mükemmel</p>
              <div className="flex items-end gap-1">
                <span className="font-heading font-900 text-5xl text-dark">₺0</span>
                <span className="font-body text-sm text-gray-400 mb-2">/ay</span>
              </div>
            </div>

            <div className="flex-1 space-y-3 mb-7">
              {freeFeatures.map((f) => (
                <div key={f.text} className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-xs ${f.included ? 'bg-buyuyo-green_accent text-white' : 'bg-gray-100 text-gray-400'}`}>
                    {f.included ? '✓' : '✕'}
                  </div>
                  <p className={`font-body text-sm ${f.included ? 'text-dark' : 'text-gray-300 line-through'}`}>
                    {f.text}
                  </p>
                </div>
              ))}
            </div>

            <motion.a
              href="#"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="font-heading font-700 text-sm text-primary border-2 border-primary px-6 py-3.5 rounded-2xl text-center hover:bg-primary-50 transition-colors"
            >
              Ücretsiz Başla
            </motion.a>
          </motion.div>

          {/* Premium */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative bg-dark rounded-3xl p-7 flex flex-col overflow-hidden"
          >
            {/* Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-transparent pointer-events-none" />

            {/* Badge */}
            <div className="absolute top-5 right-5">
              <span className="font-heading font-700 text-xs text-white bg-primary px-3 py-1 rounded-full shadow-glow">
                En Popüler 🔥
              </span>
            </div>

            <div className="relative mb-6">
              <p className="font-heading font-700 text-lg text-white mb-1">Premium</p>
              <p className="font-body text-sm text-white/50 mb-4">Sınırsız ebeveynlik desteği</p>
              <div className="flex items-end gap-1">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={monthlyPrice}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="font-heading font-900 text-5xl text-white"
                  >
                    {monthlyPrice}
                  </motion.span>
                </AnimatePresence>
                <span className="font-body text-sm text-white/50 mb-2">/ay</span>
              </div>
              {yearly && (
                <p className="font-body text-xs text-white/40 mt-1">
                  Yıllık {yearlyTotal} olarak faturalandırılır
                </p>
              )}
            </div>

            <div className="relative flex-1 space-y-3 mb-7">
              {premiumFeatures.map((f) => (
                <div key={f.text} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-buyuyo-green_accent flex items-center justify-center shrink-0 text-xs text-white">
                    ✓
                  </div>
                  <p className="font-body text-sm text-white/80">{f.text}</p>
                </div>
              ))}
            </div>

            <motion.a
              href="#"
              whileHover={{ scale: 1.03, boxShadow: '0 12px 40px rgba(255,255,255,0.2)' }}
              whileTap={{ scale: 0.97 }}
              className="relative font-heading font-800 text-sm text-primary bg-white px-6 py-3.5 rounded-2xl text-center shadow-xl"
            >
              Premium'a Geç 👑
            </motion.a>
          </motion.div>
        </div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
        >
          <h3 className="font-heading font-800 text-2xl text-dark text-center mb-8">
            50.000+ ebeveyn güveniyor ❤️
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="bg-surface border border-gray-100 rounded-2xl p-6 shadow-card"
              >
                <div className="flex mb-3">
                  {[...Array(t.rating)].map((_, j) => (
                    <span key={j} className="text-amber-400 text-sm">★</span>
                  ))}
                </div>
                <p className="font-body text-sm text-gray-600 leading-relaxed mb-4 italic">{t.text}</p>
                <div>
                  <p className="font-heading font-700 text-sm text-dark">{t.name}</p>
                  <p className="font-body text-xs text-gray-400">{t.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
