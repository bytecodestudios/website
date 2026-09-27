import content from '@/config/content.json';

const { site } = content;

export default function sitemap() {
  return [
    { url: site.url, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
  ];
}
