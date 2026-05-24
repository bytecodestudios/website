import './globals.css';
import { Inter, JetBrains_Mono } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains', display: 'swap' });

export const metadata = {
  title: 'Bytecode Studios — Independent developers. One collective.',
  description:
    'Bytecode Studios is a collective of independent developers building free tools for the community and premium custom solutions for clients. FiveM, Discord bots, web dashboards, automation and more.',
  keywords: [
    'Bytecode Studios', 'FiveM development', 'Discord bots', 'web development',
    'custom development', 'open source', 'developer collective',
  ],
  openGraph: {
    title: 'Bytecode Studios',
    description: 'Independent developers. One collective. Building free tools and premium custom solutions.',
    type: 'website',
  },
  metadataBase: new URL('https://bytecodestudios.dev'),
};

export const viewport = {
  themeColor: '#070710',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable}`}>
      <body className="min-h-screen bg-bg text-white/90 antialiased">
        <div className="pointer-events-none fixed inset-0 z-0 bg-radial-fade" />
        <Navbar />
        <main className="relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
