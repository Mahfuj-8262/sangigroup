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
    <html lang="en" className={`${notoNaskhArabic.variable} ${notoSansSC.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `
          (function() {
            var lang = document.cookie.match(/googtrans=\/en\/([^;]+)/);
            if (lang && lang[1] && lang[1] !== 'en') {
              document.documentElement.style.visibility = 'hidden';
              window.addEventListener('load', function() {
                setTimeout(function() {
                  document.documentElement.style.visibility = 'visible';
                }, 1000);
              });
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