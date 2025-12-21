import '../styles/global.css';
import { ReactNode } from 'react';
import { Metadata } from 'next';
import { SITE_TITLE, SITE_DESCRIPTION, TWITTER_HANDLE } from '../lib/constants';

export const metadata: Metadata = {
  metadataBase: new URL('https://tukki-blog.vercel.app'),
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_TITLE}`,
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    type: 'website',
    locale: 'ja_JP',
    siteName: SITE_TITLE,
  },
  twitter: {
    card: 'summary',
    site: `@${TWITTER_HANDLE}`,
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
