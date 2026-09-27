import './globals.css';
import { Inter, JetBrains_Mono, Rajdhani } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains', display: 'swap' });
const rajdhani = Rajdhani({ subsets: ['latin'], weight: ['600', '700'], variable: '--font-display', display: 'swap' });

export const metadata = {
  title: 'Bytecode Studios | Meaningful digital solutions',
  description:
    'Bytecode Studios is a team of developers and designers building meaningful digital solutions: web platforms, apps, AI & automation, bots and FiveM game resources.',
  keywords: [
    'Bytecode Studios', 'web development', 'software development', 'automation', 'AI tools',
    'Discord bots', 'FiveM development', 'open source', 'digital solutions',
  ],
  openGraph: {
    title: 'Bytecode Studios',
    description: 'Meaningful software, built by people who care.',
    type: 'website',
    images: ['/banner.png'],
  },
  metadataBase: new URL('https://bytecodestudios.com'),
};

export const viewport = {
  themeColor: '#060a1c',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable} ${rajdhani.variable}`}>
      <body className="min-h-screen bg-bg text-white/90 antialiased">{children}</body>
    </html>
  );
}
