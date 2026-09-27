import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ContentProvider } from '@/components/ContentProvider';
import { getContent } from '@/lib/content';

export default async function SiteLayout({ children }) {
  const content = await getContent();
  return (
    <ContentProvider value={content}>
      <div className="pointer-events-none fixed inset-0 z-0 bg-radial-fade" />
      <Navbar />
      <main className="relative z-10">{children}</main>
      <Footer />
    </ContentProvider>
  );
}
