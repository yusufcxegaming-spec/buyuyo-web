import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Büyüyo — Bebeğinizin Gelişim Yolcuğu',
  description: 'Bebeğinizin beslenme, psikoloji, gelişim ve uyku düzenini takip edin. AI Koç ile sorularınızı yanıtlayın. Ebeveynlik yolculuğunuzda yanınızdayız.',
  keywords: ['bebek gelişimi', 'bebek bakım', 'ebeveynlik', 'ninni', 'bebek beslenme', 'büyüyo'],
  openGraph: {
    title: 'Büyüyo — Bebeğinizin Gelişim Yolcuğu',
    description: 'Bebeğinizin gelişimini takip edin, uzman rehberliğinden yararlanın.',
    type: 'website',
    locale: 'tr_TR',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800;900&family=Nunito+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
