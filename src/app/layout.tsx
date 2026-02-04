import "./globals.css";

import Header from "../components/Header";
import Footer from "../components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { Noto_Naskh_Arabic, Noto_Sans_SC } from 'next/font/google';

const notoNaskhArabic = Noto_Naskh_Arabic({ 
  subsets: ['arabic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-arabic'
});

const notoSansSC = Noto_Sans_SC({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-chinese'
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" className={`${notoNaskhArabic.variable} ${notoSansSC.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `
          (function() {
            var lang = document.cookie.match(/googtrans=\/en\/([^;]+)/);
            if (lang && lang[1]) {
              var langCode = lang[1];
              if (langCode === 'ar') {
                document.documentElement.setAttribute('dir', 'rtl');
              } else {
                document.documentElement.setAttribute('dir', 'ltr');
              }
            }
          })();
        `}} />
      </head>
      <body className="flex flex-col min-h-screen">
        <Header />
        <main>{children}</main>
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}