import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'AI Child Tutor - مساعد الأطفال الذكي',
  description: 'أداة تعليمية مُساعدة للأطفال مع شخصيات مخصصة',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${inter.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
