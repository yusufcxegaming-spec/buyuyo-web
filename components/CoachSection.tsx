'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GROQ_API_KEY = process.env.NEXT_PUBLIC_GROQ_API_KEY ?? '';

const quickQuestions = [
  'Bebeğim neden ağlıyor?',
  'Uyku düzeni nasıl olmalı?',
  'İlk dişler ne zaman çıkar?',
  'Emekleme gelişimi normal mi?',
  'Ek gıdaya ne zaman geçilir?',
];

interface Message { id: string; role: 'user' | 'assistant'; text: string; followUps?: string[] }

const SYSTEM_PROMPT = `Sen Büyüyo uygulamasının uzman AI Koç'usun. Türk ebeveynlere bebek gelişimi, beslenme, uyku ve psikoloji konularında kişisel, araştırmaya dayalı rehberlik yapıyorsun.

KURALLAR:
- Her zaman Türkçe cevap ver
- Sıcak, samimi, güven verici bir anne/uzman tonu kullan
- Cevaplarını detaylı ve pratik yap — genel laflar değil, somut adımlar ver
- Bilimsel araştırmalara ve WHO/AAP gibi otoritelere dayandır
- Madde madde listele, başlıklar kullan, anlaşılır yaz
- Cevabın EN SONUNA şunu ekle (başka bir şey ekleme):

---FOLLOWUP---
[Soru 1]
[Soru 2]
[Soru 3]

Bu 3 soru, ebeveynin bir sonraki adımda sorabileceği en alakalı, kısa sorular olsun. Köşeli parantez olmadan yaz.`;

async function askGroq(messages: { role: string; content: string }[]): Promise<string> {
  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'llama-3.1-8b-instant',
      messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages],
      temperature: 0.7,
      max_tokens: 800,
    }),
  });
  const data = await res.json();
  return data.choices?.[0]?.message?.content ?? 'Üzgünüm, şu an cevap veremiyorum.';
}

function parseResponse(raw: string): { text: string; followUps: string[] } {
  const parts = raw.split('---FOLLOWUP---');
  const text = parts[0].trim();
  const followUps = parts[1]
    ? parts[1].trim().split('\n').map(s => s.trim()).filter(Boolean).slice(0, 3)
    : [];
  return { text, followUps };
}

export default function CoachSection() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0', role: 'assistant',
      text: 'Merhaba! Ben Büyüyo AI Koç\'unuz 🤖\n\nBebeğiniz hakkında her soruyu sormaktan çekinmeyin. Beslenme, uyku, gelişim, psikoloji — her konuda detaylı, kişisel tavsiyeler veriyorum.',
      followUps: ['Bebeğim neden ağlıyor?', 'Uyku düzeni nasıl kurulur?', 'Ek gıdaya ne zaman geçilir?'],
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const historyRef = useRef<{ role: string; content: string }[]>([]);

  const send = async (text?: string) => {
    const q = (text ?? input).trim();
    if (!q || loading) return;
    setInput('');

    const userMsg: Message = { id: Date.now().toString(), role: 'user', text: q };
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);
    historyRef.current.push({ role: 'user', content: q });

    try {
      const raw = await askGroq(historyRef.current);
      const { text: replyText, followUps } = parseResponse(raw);
      historyRef.current.push({ role: 'assistant', content: replyText });

      const reply: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        text: replyText,
        followUps,
      };
      setMessages(prev => [...prev, reply]);
    } catch {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(), role: 'assistant',
        text: 'Bağlantı hatası oluştu. Lütfen tekrar deneyin.',
      }]);
    } finally {
      setLoading(false);
      setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    }
  };

  return (
    <section id="coach" className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Sol — Açıklama */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="inline-block font-body text-sm font-700 text-primary bg-primary-50 px-4 py-1.5 rounded-full mb-5 tracking-wide uppercase">
              🤖 AI Koç
            </span>
            <h2 className="font-heading font-900 text-4xl sm:text-5xl text-dark mb-5 leading-tight">
              Her sorunuza{' '}
              <span className="gradient-text">uzman</span>{' '}yanıt
            </h2>
            <p className="font-body text-lg text-gray-500 mb-8 leading-relaxed">
              Büyüyo AI Koç, pediatri, beslenme ve gelişim psikolojisi alanlarında
              eğitilmiş kişisel asistanınızdır. Cevaplar genel değil —
              sizin için araştırılmış ve özelleştirilmiştir.
            </p>

            <div className="space-y-4 mb-8">
              {[
                { icon: '🔬', title: 'Araştırmaya Dayalı', desc: 'WHO, AAP ve güncel pediatri literatürüne göre' },
                { icon: '💬', title: 'Takip Soruları', desc: 'Her cevap sonrası sizi yönlendirir' },
                { icon: '🔒', title: '7/24 Erişim', desc: 'Gece 3\'te bile yanınızda' },
              ].map((item) => (
                <motion.div
                  key={item.title}
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-surface border border-primary-100 group"
                >
                  <div className="w-11 h-11 bg-primary-50 rounded-xl flex items-center justify-center text-xl shrink-0 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-heading font-700 text-base text-dark">{item.title}</p>
                    <p className="font-body text-sm text-gray-400">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Sağ — Chat */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-pink-100/20 rounded-3xl blur-3xl" />

            <div className="relative bg-white rounded-3xl border border-gray-100 shadow-soft overflow-hidden">
              {/* Header */}
              <div className="bg-dark px-5 py-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-xl shadow-glow">🤖</div>
                <div>
                  <p className="font-heading font-700 text-sm text-white">Büyüyo AI Koç</p>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-buyuyo-green_accent animate-pulse" />
                    <p className="font-body text-xs text-white/50">Çevrimiçi · Groq AI</p>
                  </div>
                </div>
              </div>

              {/* Mesajlar */}
              <div className="px-4 py-4 space-y-4 min-h-[300px] max-h-[380px] overflow-y-auto bg-surface">
                <AnimatePresence>
                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 16, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="space-y-2"
                    >
                      <div className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm font-body leading-relaxed shadow-card whitespace-pre-line ${
                          msg.role === 'user'
                            ? 'bg-primary text-white rounded-br-md'
                            : 'bg-white text-dark rounded-bl-md'
                        }`}>
                          {msg.text}
                        </div>
                      </div>

                      {/* Follow-up sorular */}
                      {msg.role === 'assistant' && msg.followUps && msg.followUps.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                          className="flex flex-wrap gap-1.5 pl-1"
                        >
                          {msg.followUps.map((q) => (
                            <button
                              key={q}
                              onClick={() => send(q)}
                              disabled={loading}
                              className="font-body text-xs text-primary bg-primary-50 border border-primary-100 px-3 py-1.5 rounded-full hover:bg-primary hover:text-white transition-all duration-200 text-left"
                            >
                              {q} →
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>

                {loading && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-start">
                    <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-md shadow-card flex gap-1.5 items-center">
                      {[0, 0.2, 0.4].map((d, i) => (
                        <motion.div key={i} animate={{ y: [0, -6, 0] }} transition={{ duration: 0.6, delay: d, repeat: Infinity }} className="w-2 h-2 rounded-full bg-primary" />
                      ))}
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Hızlı sorular */}
              <div className="px-4 py-2 bg-surface border-t border-gray-100 overflow-x-auto">
                <div className="flex gap-2 pb-1" style={{ scrollbarWidth: 'none' }}>
                  {quickQuestions.map((q) => (
                    <button key={q} onClick={() => send(q)} className="font-body text-xs font-600 text-primary bg-primary-50 border border-primary-100 px-3 py-1.5 rounded-full whitespace-nowrap hover:bg-primary hover:text-white transition-colors duration-200 shrink-0">
                      {q}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input */}
              <div className="px-4 py-3 bg-white border-t border-gray-100 flex gap-3 items-end">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && send()}
                  placeholder="Sorunuzu yazın..."
                  className="flex-1 bg-surface border border-gray-200 rounded-xl px-4 py-2.5 font-body text-sm text-dark placeholder-gray-400 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                />
                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.93 }}
                  onClick={() => send()}
                  disabled={!input.trim() || loading}
                  className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-glow disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
                >
                  ➤
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
