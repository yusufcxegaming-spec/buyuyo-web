'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const links = {
  Ürün: ['Özellikler', 'AI Koç', 'Ninniler', 'Gelişim Takibi', 'Fiyatlar'],
  Şirket: ['Hakkımızda', 'Blog', 'Basın', 'Kariyer', 'İletişim'],
  Destek: ['Yardım Merkezi', 'Gizlilik Politikası', 'Kullanım Şartları', 'Çerez Politikası'],
};

export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle');

  const subscribe = async () => {
    if (!email) return;
    setStatus('loading');
    try {
      const res = await fetch('https://formspree.io/f/xdavnaol', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ email }),
      });
      setStatus(res.ok ? 'ok' : 'error');
    } catch {
      setStatus('error');
    }
  };

  return (
    <footer className="bg-dark pt-20 pb-10 px-6 relative overflow-hidden">
      {/* Background orb */}
      <div className="orb w-[600px] h-[600px] bg-primary bottom-[-200px] left-[-100px] opacity-10" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-5">
              <span className="text-3xl">👶</span>
              <span className="font-heading font-800 text-xl text-white">Büyüyo</span>
            </div>
            <p className="font-body text-sm text-white/50 leading-relaxed mb-6 max-w-xs">
              Bebeğinizin büyüme yolculuğunda yanınızda. Bilimsel, sevecen ve
              her zaman erişilebilir.
            </p>

            {/* Social */}
            <div className="flex gap-3">
              {['🐦', '📷', '▶️', '💼'].map((icon, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.15, backgroundColor: 'rgba(255,255,255,0.15)' }}
                  whileTap={{ scale: 0.9 }}
                  className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-sm transition-colors"
                >
                  {icon}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <p className="font-heading font-700 text-sm text-white mb-4">{category}</p>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="font-body text-sm text-white/40 hover:text-white transition-colors duration-200"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 mb-16">
          <div>
            <p className="font-heading font-700 text-base text-white mb-1">📧 Haftalık Gelişim Bülteni</p>
            <p className="font-body text-sm text-white/50">Bebeğinizin yaşına özel haftalık ipuçları alın</p>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            {status === 'ok' ? (
              <p className="font-heading font-700 text-sm text-green-400 py-2.5">✅ Abone oldunuz, teşekkürler!</p>
            ) : (
              <>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="E-posta adresiniz"
                  className="flex-1 sm:w-64 bg-white/10 border border-white/10 rounded-xl px-4 py-2.5 font-body text-sm text-white placeholder-white/30 outline-none focus:border-primary transition-colors"
                />
                <motion.button
                  onClick={subscribe}
                  disabled={status === 'loading'}
                  whileHover={{ scale: 1.04, boxShadow: '0 6px 24px rgba(79,70,229,0.5)' }}
                  whileTap={{ scale: 0.97 }}
                  className="font-heading font-700 text-sm text-white bg-primary px-5 py-2.5 rounded-xl shadow-glow whitespace-nowrap disabled:opacity-50"
                >
                  {status === 'loading' ? '...' : 'Abone Ol'}
                </motion.button>
              </>
            )}
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/10">
          <p className="font-body text-xs text-white/30">
            © 2024 Büyüyo. Tüm hakları saklıdır.
          </p>
          <div className="flex items-center gap-2">
            <span className="font-body text-xs text-white/30">Made with</span>
            <motion.span
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-sm"
            >
              ❤️
            </motion.span>
            <span className="font-body text-xs text-white/30">for babies everywhere</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 bg-white/5 rounded-lg px-3 py-1.5">
              <span className="text-sm">🍎</span>
              <p className="font-body text-xs text-white/40">App Store</p>
            </div>
            <div className="flex items-center gap-1.5 bg-white/5 rounded-lg px-3 py-1.5">
              <span className="text-sm">🤖</span>
              <p className="font-body text-xs text-white/40">Google Play</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
