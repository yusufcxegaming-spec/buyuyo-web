'use client';

import { createContext, useContext, useState } from 'react';

const ModalContext = createContext<{ open: () => void }>({ open: () => {} });

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [show, setShow] = useState(false);

  return (
    <ModalContext.Provider value={{ open: () => setShow(true) }}>
      {children}
      {show && <EarlyAccessModal onClose={() => setShow(false)} />}
    </ModalContext.Provider>
  );
}

export const useModal = () => useContext(ModalContext);

function EarlyAccessModal({ onClose }: { onClose: () => void }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle');

  const submit = async () => {
    if (!email || status === 'loading') return;
    setStatus('loading');
    try {
      const res = await fetch('https://formspree.io/f/xdavnaol', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ email, type: 'early-access' }),
      });
      setStatus(res.ok ? 'ok' : 'error');
    } catch {
      setStatus('error');
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: 'rgba(15,13,50,0.75)', backdropFilter: 'blur(8px)' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-modal-in">
        {/* Top gradient band */}
        <div className="h-2 bg-gradient-to-r from-[#4F46E5] via-[#818CF8] to-[#EC4899]" />

        <div className="p-8">
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors text-gray-500 text-sm font-bold"
          >
            ✕
          </button>

          {status === 'ok' ? (
            <div className="text-center py-6">
              <div className="text-5xl mb-4">🎉</div>
              <h2 className="font-heading font-900 text-2xl text-dark mb-2">Kaydınız alındı!</h2>
              <p className="font-body text-gray-500 leading-relaxed">
                Büyüyo Google Play'de yayınlandığında sizi ilk haberdar edeceğiz.
              </p>
              <button
                onClick={onClose}
                className="mt-6 font-heading font-700 text-sm text-white bg-primary px-6 py-3 rounded-full"
              >
                Tamam
              </button>
            </div>
          ) : (
            <>
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-4">
                  <svg width="28" height="28" viewBox="0 0 30 30" fill="none">
                    <circle cx="15" cy="11" r="7" fill="#4F46E5"/>
                    <circle cx="9" cy="20" r="4" fill="#4F46E5" opacity=".85"/>
                    <circle cx="21" cy="20" r="4" fill="#4F46E5" opacity=".85"/>
                    <circle cx="15" cy="25" r="3" fill="#4F46E5" opacity=".55"/>
                  </svg>
                </div>
                <h2 className="font-heading font-900 text-2xl text-dark mb-2">
                  Erken Erişim Listesine Katıl
                </h2>
                <p className="font-body text-sm text-gray-500 leading-relaxed">
                  Büyüyo yakında Google Play'de! E-postanı bırak,<br />
                  çıkışında ilk sen öğren ve <span className="text-primary font-700">3 ay ücretsiz Premium</span> kazan.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && submit()}
                  placeholder="ornek@gmail.com"
                  className="w-full border-2 border-gray-200 focus:border-primary rounded-2xl px-4 py-3.5 font-body text-sm text-dark outline-none transition-colors"
                />

                <button
                  onClick={submit}
                  disabled={status === 'loading' || !email}
                  className="w-full font-heading font-800 text-base text-white bg-primary hover:bg-primary/90 disabled:opacity-50 px-6 py-3.5 rounded-2xl shadow-lg transition-all"
                  style={{ boxShadow: '0 8px 24px rgba(79,70,229,0.35)' }}
                >
                  {status === 'loading' ? 'Kaydediliyor...' : 'Erken Erişime Katıl 🚀'}
                </button>

                {status === 'error' && (
                  <p className="text-center text-xs text-red-500">Bir hata oluştu, tekrar deneyin.</p>
                )}

                <p className="text-center font-body text-xs text-gray-400 mt-1">
                  Spam göndermiyoruz. İstediğiniz zaman çıkabilirsiniz.
                </p>
              </div>

              <div className="mt-6 pt-5 border-t border-gray-100 grid grid-cols-3 gap-3 text-center">
                {[
                  { icon: '🔒', text: 'Güvenli' },
                  { icon: '📱', text: 'Yakında Play\'de' },
                  { icon: '🎁', text: '3 Ay Ücretsiz' },
                ].map(b => (
                  <div key={b.text} className="flex flex-col items-center gap-1">
                    <span className="text-xl">{b.icon}</span>
                    <span className="font-body text-xs text-gray-400">{b.text}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
