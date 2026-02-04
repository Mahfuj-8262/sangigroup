'use client';

import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';

declare global {
  interface Window {
    google: {
      translate: {
        TranslateElement: {
          new (config: {
            pageLanguage: string;
            includedLanguages: string;
            layout: number;
            autoDisplay: boolean;
          }, elementId: string): void;
          InlineLayout: {
            SIMPLE: number;
          };
        };
      };
    };
    googleTranslateElementInit: () => void;
  }
}

export default function LanguageSwitcher() {
  const [currentLang, setCurrentLang] = useState('English');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const addStyles = () => {
      const style = document.createElement('style');
      style.innerHTML = `
        .goog-te-banner-frame,
        .goog-te-menu-frame,
        .skiptranslate,
        #google_translate_element,
        .goog-te-balloon-frame,
        .goog-te-ftab,
        .goog-logo-link,
        .goog-te-gadget span,
        #goog-gt-tt,
        .goog-tooltip,
        .goog-text-highlight {
          display: none !important;
          visibility: hidden !important;
        }
        body { top: 0 !important; }
        font[style] { background: none !important; }
      `;
      document.head.appendChild(style);
    };

    const getCookie = (name: string) => {
      return document.cookie.split('; ').reduce((r, v) => {
        const parts = v.split('=');
        return parts[0] === name ? decodeURIComponent(parts[1]) : r;
      }, '');
    };

    const disableTooltips = () => {
      document.addEventListener('mouseover', (e) => {
        const target = e.target as HTMLElement;
        if (target.tagName === 'FONT' || target.classList.contains('translated-ltr')) {
          e.stopPropagation();
          e.preventDefault();
        }
      }, true);
    };

    addStyles();
    disableTooltips();

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'en',
          includedLanguages: 'en,zh-CN,ar',
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false
        },
        'google_translate_element'
      );
    };

    if (!document.querySelector('script[src*="translate.google.com"]')) {
      const script = document.createElement('script');
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.head.appendChild(script);
    }

    const savedLang = getCookie('selectedLanguage');
    if (savedLang) {
      setCurrentLang(savedLang);
    }
  }, []);

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'zh-CN', label: 'Chinese' },
    { code: 'ar', label: 'Arabic' }
  ];

  const translatePage = (langCode: string, langLabel: string) => {
    setIsOpen(false);
    setCurrentLang(langLabel);
    
    document.cookie = `selectedLanguage=${langLabel}; path=/`;
    
    const translateTo = langCode === 'en' ? '' : langCode;
    document.cookie = `googtrans=/en/${translateTo}; path=/`;
    document.cookie = `googtrans=/en/${translateTo}; path=/; domain=${window.location.hostname}`;
    
    window.location.reload();
  };

  return (
    <>
      <div id="google_translate_element" style={{ display: 'none' }}></div>
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="notranslate flex items-center gap-1 px-2 py-1.5 text-xs border border-gray-300 rounded-md hover:bg-gray-50 transition bg-white"
        >
          <span className="notranslate">{currentLang}</span>
          <ChevronDown size={14} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        
        {isOpen && (
          <div 
            className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-md shadow-lg overflow-hidden"
            style={{ zIndex: 99999 }}
          >
            {languages.map(({ code, label }) => (
              <button
                key={label}
                type="button"
                onClick={() => translatePage(code, label)}
                className={`notranslate block w-full text-left px-3 py-1.5 text-xs hover:bg-gray-100 transition ${
                  currentLang === label ? 'bg-blue-50 text-blue-700 font-semibold' : ''
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
}