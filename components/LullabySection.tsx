'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const lullabies = [
  { id: '1', emoji: '🌙', title: 'Turkish Lullaby',      artist: 'Geleneksel',        duration: '2:00', src: '/turkish-lullaby.mp3',     lang: null },
  { id: '2', emoji: '🕊️', title: 'Kanat Açmış',          artist: 'Geleneksel',        duration: '2:00', src: '/kanat-acmis.mp3',          lang: null },
  { id: '3', emoji: '⭐', title: 'Ay Doğdu, Altın Toz',  artist: 'Türk Halk Müziği',  duration: '2:00', src: '/ay-dogdu-altin-toz.mp3',   lang: null },
  { id: '4', emoji: '🇫🇷', title: 'Dodo Chut-Lune',       artist: 'Fransız Geleneksel',duration: '2:00', src: '/dodo-chut-lune.mp3',       lang: 'fr' },
];

function Waveform({ playing }: { playing: boolean }) {
  const bars = [3, 5, 8, 6, 4, 7, 5, 3, 6, 8, 4, 5];
  return (
    <div className="flex items-center gap-0.5 h-6">
      {bars.map((h, i) => (
        <motion.div
          key={i}
          className="w-1 rounded-full bg-primary-light"
          animate={playing ? { height: [h * 2, h * 4, h * 2] } : { height: h * 2 }}
          transition={{ duration: 0.6, delay: i * 0.05, repeat: playing ? Infinity : 0 }}
          style={{ height: h * 2 }}
        />
      ))}
    </div>
  );
}

export default function LullabySection() {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggle = (id: string) => {
    const lullaby = lullabies.find(l => l.id === id);
    if (!lullaby?.src) return; // src yoksa çalma

    if (playingId === id) {
      // Aynı şarkıya basıldı → durdur
      audioRef.current?.pause();
      setPlayingId(null);
    } else {
      // Farklı şarkı → önce eskiyi durdur, yenisini başlat
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      const audio = new Audio(lullaby.src);
      audio.onended = () => setPlayingId(null);
      audio.play();
      audioRef.current = audio;
      setPlayingId(id);
    }
  };

  // Unmount'ta durdur
  useEffect(() => {
    return () => { audioRef.current?.pause(); };
  }, []);

  const current = lullabies.find(l => l.id === playingId);

  return (
    <section className="py-24 px-6 bg-[#1E1B4B] relative overflow-hidden">
      {/* Background decoration */}
      <div className="orb w-[500px] h-[500px] bg-primary top-[-100px] right-[-100px] opacity-20" />
      <div className="orb w-[400px] h-[400px] bg-pink-500 bottom-[-80px] left-[-80px] opacity-10" />

      {/* Stars */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-white"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.5 + 0.2,
          }}
          animate={{ opacity: [0.2, 0.8, 0.2] }}
          transition={{
            duration: 2 + Math.random() * 3,
            delay: Math.random() * 2,
            repeat: Infinity,
          }}
        />
      ))}

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Vinyl player mockup */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center"
          >
            {/* Vinyl disc */}
            <div className="relative mb-8">
              <motion.div
                animate={{ rotate: playingId ? 360 : 0 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear', repeatType: 'loop' }}
                className="w-48 h-48 sm:w-64 sm:h-64 rounded-full bg-gradient-to-br from-dark-mid to-dark flex items-center justify-center border-4 border-primary-light/30 shadow-[0_0_60px_rgba(79,70,229,0.4)]"
              >
                {/* Vinyl grooves */}
                {[60, 70, 80].map(size => (
                  <div
                    key={size}
                    className="absolute rounded-full border border-white/5"
                    style={{ width: `${size}%`, height: `${size}%` }}
                  />
                ))}
                {/* Center */}
                <div className="relative z-10 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-primary flex items-center justify-center text-4xl sm:text-5xl shadow-glow">
                  {current ? current.emoji : '🎵'}
                </div>
              </motion.div>

              {/* Tonearm */}
              <motion.div
                animate={{ rotate: playingId ? 22 : 8 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className="absolute -right-6 -top-4 origin-top-right"
              >
                <div className="w-1 h-20 bg-gradient-to-b from-gray-400 to-gray-600 rounded-full" />
                <div className="absolute bottom-0 left-0 w-4 h-1 bg-gray-400 rounded-full -translate-x-3" />
              </motion.div>
            </div>

            {/* Now playing */}
            <AnimatePresence mode="wait">
              {current ? (
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-center mb-4"
                >
                  <p className="font-heading font-800 text-xl text-white mb-1">{current.title}</p>
                  <p className="font-body text-sm text-white/50 mb-3">{current.artist}</p>
                  <div className="flex justify-center">
                    <Waveform playing={!!playingId} />
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center mb-4"
                >
                  <p className="font-body text-white/40 text-sm">Bir ninni seçin...</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Controls */}
            <div className="flex items-center gap-6">
              <button
                onClick={() => {
                  if (!playingId) return;
                  const idx = lullabies.findIndex(l => l.id === playingId);
                  if (idx > 0) setPlayingId(lullabies[idx - 1].id);
                }}
                className="text-white/40 hover:text-white text-2xl transition-colors"
              >
                ⏮
              </button>
              <motion.button
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => toggle(playingId ?? lullabies[0].id)}
                className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-2xl shadow-glow"
              >
                {playingId ? '⏸' : '▶'}
              </motion.button>
              <button
                onClick={() => {
                  const idx = lullabies.findIndex(l => l.id === (playingId ?? lullabies[0].id));
                  if (idx < lullabies.length - 1) setPlayingId(lullabies[idx + 1].id);
                }}
                className="text-white/40 hover:text-white text-2xl transition-colors"
              >
                ⏭
              </button>
            </div>
          </motion.div>

          {/* Track list */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="inline-block font-body text-sm font-700 text-primary-light bg-primary/20 px-4 py-1.5 rounded-full mb-5 tracking-wide uppercase">
              🎵 Ninniler
            </span>
            <h2 className="font-heading font-900 text-4xl sm:text-5xl text-white mb-4 leading-tight">
              Tatlı rüyalar için
              <br />
              <span className="text-primary-light">özel melodi</span>
            </h2>
            <p className="font-body text-lg text-white/60 mb-8 leading-relaxed">
              50'den fazla geleneksel ve modern ninni ile bebeğinizi huzurla uyutun.
              Gece modu, zamanlayıcı ve çevrimdışı dinleme desteği.
            </p>

            <div className="space-y-3">
              {lullabies.map((lullaby, i) => {
                const isActive = playingId === lullaby.id;
                return (
                  <motion.button
                    key={lullaby.id}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                    whileHover={{ x: 4 }}
                    onClick={() => toggle(lullaby.id)}
                    className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-200 ${
                      isActive
                        ? 'bg-primary shadow-glow'
                        : 'bg-white/5 hover:bg-white/10 border border-white/10'
                    }`}
                  >
                    <span className="text-2xl">{lullaby.emoji}</span>
                    <div className="flex-1 text-left">
                      <p className={`font-heading font-700 text-sm ${isActive ? 'text-white' : 'text-white/80'}`}>
                        {lullaby.title}
                      </p>
                      <p className={`font-body text-xs ${isActive ? 'text-white/70' : 'text-white/40'}`}>
                        {lullaby.artist}
                      </p>
                    </div>
                    {isActive ? (
                      <Waveform playing />
                    ) : (
                      <span className="font-body text-xs text-white/30">{lullaby.duration}</span>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
