'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import { useState } from 'react';
import Cookies from 'js-cookie';

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();
  const [hover, setHover] = useState(false);

  const locales = [
    { code: 'en', label: 'EN' },
    { code: 'zh', label: '中文' },
    { code: 'ar', label: 'ع' }
  ];

  const switchLanguage = (locale: string) => {
    const newPath = `/${locale}${pathname.replace(/^\/(en|zh|ar)/, '')}`;
    Cookies.set('preferred_locale', locale);
    router.push(newPath);
  };

  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* Language options */}
      <div
        className={`flex flex-col items-end mb-2 transition-all duration-300 ease-in-out ${
          hover ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <div className="bg-white shadow-lg rounded-md overflow-hidden border border-gray-200">
          {locales.map(({ code, label }) => (
            <button
              key={code}
              onClick={() => switchLanguage(code)}
              className={`px-3 py-2 text-sm w-full text-right hover:bg-gray-100 ${
                currentLocale === code ? 'bg-blue-100 text-blue-600 font-semibold' : ''
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Main circular button */}
      <div
        className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white w-12 h-12 rounded-full shadow-lg cursor-pointer group relative transition-all duration-300 ease-in-out"
      >
        <span className="text-lg">🌐</span>

        {/* Expanding “Switch Language?” label */}
        <span
          className={`absolute right-14 bg-blue-600 text-white text-sm whitespace-nowrap px-3 py-1.5 rounded-md shadow transition-all duration-300 origin-right ${
            hover
              ? 'opacity-100 scale-x-100 translate-x-0'
              : 'opacity-0 scale-x-50 -translate-x-3 pointer-events-none'
          }`}
        >
          Switch Language?
        </span>
      </div>
    </div>
  );
}