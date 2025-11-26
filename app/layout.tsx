import type { Metadata } from 'next';
import { Inter, Space_Mono } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const spaceMono = Space_Mono({ 
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-gt-america-mono',
});

export const metadata: Metadata = {
  title: 'Portion Club SubDAO | Base',
  description: 'All You\'ve Gotta Do Is Show Up',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${spaceMono.variable} font-mono bg-oil-black text-oil-white antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

