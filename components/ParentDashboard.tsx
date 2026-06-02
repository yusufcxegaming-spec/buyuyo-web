'use client';

import { motion } from 'framer-motion';

const growthData = [
  { month: 'Oca', weight: 5.2, height: 58 },
  { month: 'Şub', weight: 5.8, height: 61 },
  { month: 'Mar', weight: 6.4, height: 63 },
  { month: 'Nis', weight: 7.0, height: 66 },
  { month: 'May', weight: 7.5, height: 68 },
  { month: 'Haz', weight: 7.9, height: 70 },
];

const maxWeight = Math.max(...growthData.map(d => d.weight));

const milestones = [
  { emoji: '😊', label: 'İlk gülümseme', date: 'Mar 2024', done: true },
  { emoji: '🙃', label: 'Baş kontrolü', date: 'Nis 2024', done: true },
  { emoji: '🤲', label: 'Nesne tutma', date: 'May 2024', done: true },
  { emoji: '🪑', label: 'Oturma', date: 'Haz 2024', done: false },
  { emoji: '🏃', label: 'Emekleme', date: 'Ağu 2024', done: false },
];

const vaccinations = [
  { name: 'HepB (1. Doz)', date: 'Doğumda', done: true },
  { name: 'BCG', date: 'Doğumda', done: true },
  { name: '2. Ay Aşıları', date: 'Mar 2024', done: true },
  { name: '4. Ay Aşıları', date: 'May 2024', done: true },
  { name: '6. Ay Aşıları', date: 'Tem 2024', done: false },
  { name: '12. Ay Aşıları', date: 'Oca 2025', done: false },
];

export default function ParentDashboard() {
  return (
    <section id="dashboard" className="py-24 px-6 bg-surface">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block font-body text-sm font-700 text-primary bg-primary-50 px-4 py-1.5 rounded-full mb-4 tracking-wide uppercase">
            👨‍👩‍👧 Ebeveyn Paneli
          </span>
          <h2 className="font-heading font-900 text-4xl sm:text-5xl text-dark mb-5">
            Şeffaf, güvenilir{' '}
            <span className="gradient-text">takip sistemi</span>
          </h2>
          <p className="font-body text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Bebeğinizin büyüme verileri, aşı takvimi ve gelişim kilometre taşları
            tek ekranda. Her şey görünür, hiçbir şey kaçmaz.
          </p>
        </motion.div>

        {/* Dashboard mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white rounded-3xl shadow-soft border border-gray-100 overflow-hidden"
        >
          {/* Dashboard header bar */}
          <div className="bg-dark px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <p className="font-body text-xs text-white/40">buyuyo.app — Ebeveyn Paneli</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-sm shadow-glow">
                👩
              </div>
              <p className="font-heading font-700 text-sm text-white hidden sm:block">Anne Fatma</p>
            </div>
          </div>

          <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Baby header */}
              <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-primary-50 to-surface rounded-2xl border border-primary-100">
                <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center text-3xl shadow-glow">
                  👶
                </div>
                <div className="flex-1">
                  <p className="font-heading font-800 text-lg text-dark">Ahmet</p>
                  <p className="font-body text-sm text-primary">8 aylık, 2 haftalık</p>
                  <p className="font-body text-xs text-gray-400">Doğum: 01 Ekim 2023</p>
                </div>
                <div className="flex gap-4">
                  {[
                    { val: '7.9kg', label: 'Kilo' },
                    { val: '70cm', label: 'Boy' },
                    { val: '44cm', label: 'Baş' },
                  ].map((stat) => (
                    <div key={stat.label} className="text-center hidden sm:block">
                      <p className="font-heading font-800 text-base text-dark">{stat.val}</p>
                      <p className="font-body text-xs text-gray-400">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Growth chart */}
              <div className="bg-surface rounded-2xl p-5 border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <p className="font-heading font-700 text-base text-dark">📊 Büyüme Grafiği</p>
                  <span className="font-body text-xs text-primary bg-primary-50 px-2 py-1 rounded-lg">Kilo (kg)</span>
                </div>
                <div className="flex items-end gap-2 h-32">
                  {growthData.map((d, i) => (
                    <motion.div
                      key={d.month}
                      className="flex-1 flex flex-col items-center gap-1"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <p className="font-body text-xs text-gray-400">{d.weight}</p>
                      <motion.div
                        className={`w-full rounded-t-lg ${i === growthData.length - 1 ? 'bg-primary' : 'bg-primary/30'}`}
                        initial={{ height: 0 }}
                        whileInView={{ height: `${(d.weight / maxWeight) * 96}px` }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + i * 0.08, duration: 0.6, ease: 'easeOut' }}
                      />
                      <p className="font-body text-xs text-gray-400">{d.month}</p>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-3 p-3 bg-white rounded-xl flex items-center gap-2">
                  <span className="text-buyuyo-green_accent text-lg">📈</span>
                  <p className="font-body text-xs text-gray-500">
                    Son 6 ayda <strong className="text-dark">2.7kg</strong> alındı — WHO 50. persantil ✅
                  </p>
                </div>
              </div>

              {/* Milestones */}
              <div className="bg-surface rounded-2xl p-5 border border-gray-100">
                <p className="font-heading font-700 text-base text-dark mb-4">🏆 Gelişim Kilometre Taşları</p>
                <div className="space-y-2.5">
                  {milestones.map((m, i) => (
                    <motion.div
                      key={m.label}
                      initial={{ opacity: 0, x: -15 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.07 }}
                      className={`flex items-center gap-3 p-3 rounded-xl ${m.done ? 'bg-white' : 'bg-white/60'}`}
                    >
                      <span className="text-xl">{m.emoji}</span>
                      <div className="flex-1">
                        <p className={`font-heading font-700 text-sm ${m.done ? 'text-dark' : 'text-gray-400'}`}>
                          {m.label}
                        </p>
                        <p className="font-body text-xs text-gray-400">{m.date}</p>
                      </div>
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${m.done ? 'bg-buyuyo-green_accent text-white' : 'border-2 border-gray-200'}`}>
                        {m.done && '✓'}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right column */}
            <div className="space-y-6">
              {/* Streak & quick stats */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { emoji: '🔥', val: '12', label: 'Gün serisi' },
                  { emoji: '📚', val: '5/8', label: 'Ders tamamlandı' },
                  { emoji: '🎵', val: '3', label: 'Sevilen ninni' },
                  { emoji: '🤖', val: '24', label: 'Koç sorusu' },
                ].map((s, i) => (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07 }}
                    className="bg-surface rounded-xl p-3 text-center border border-gray-100"
                  >
                    <p className="text-2xl mb-1">{s.emoji}</p>
                    <p className="font-heading font-800 text-lg text-dark">{s.val}</p>
                    <p className="font-body text-xs text-gray-400">{s.label}</p>
                  </motion.div>
                ))}
              </div>

              {/* Vaccination schedule */}
              <div className="bg-surface rounded-2xl p-4 border border-gray-100">
                <p className="font-heading font-700 text-sm text-dark mb-3">💉 Aşı Takvimi</p>
                <div className="space-y-2">
                  {vaccinations.map((v, i) => (
                    <motion.div
                      key={v.name}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.06 }}
                      className="flex items-center gap-2"
                    >
                      <div className={`w-4 h-4 rounded-full shrink-0 flex items-center justify-center text-xs ${v.done ? 'bg-buyuyo-green_accent text-white' : 'border-2 border-dashed border-gray-300'}`}>
                        {v.done && '✓'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`font-body text-xs truncate ${v.done ? 'text-dark' : 'text-gray-400'}`}>
                          {v.name}
                        </p>
                      </div>
                      <p className="font-body text-xs text-gray-400 shrink-0">{v.date}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Next appointment */}
              <div className="bg-primary rounded-2xl p-4 shadow-glow">
                <p className="font-heading font-700 text-sm text-white mb-2">📅 Sonraki Randevu</p>
                <p className="font-heading font-800 text-xl text-white mb-1">15 Temmuz 2024</p>
                <p className="font-body text-xs text-white/70">6. Ay Kontrol Muayenesi</p>
                <p className="font-body text-xs text-white/50 mt-1">Dr. Ayşe Kaya — 14:30</p>
              </div>

              {/* Weekly insight */}
              <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-4 border border-amber-100">
                <p className="font-heading font-700 text-sm text-amber-700 mb-2">💡 Bu Hafta</p>
                <p className="font-body text-xs text-amber-600 leading-relaxed">
                  Ahmet bu hafta yabancı kaygısı geliştirebilir — bu normal bir gelişim basamağı.
                  Güven verin ve rutini bozmamaya çalışın.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
