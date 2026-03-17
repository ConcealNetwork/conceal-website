import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface Language {
  code: string;
  name: string;
}

interface LanguageSelection {
  name: string;
}

async function fetchJSON<T>(url: string): Promise<T> {
  return (await fetch(url)).json();
}

function applyLangData(langData: Record<string, string>) {
  for (const element of document.querySelectorAll('[data-tkey]')) {
    const key = (element as HTMLElement).dataset.tkey;
    if (!(key && langData[key])) continue;
    if (element.children.length === 0) {
      element.textContent = langData[key];
    } else {
      const first = element.firstChild;
      if (first?.nodeType === Node.TEXT_NODE) first.textContent = langData[key];
      else element.textContent = langData[key];
    }
  }
}

async function autoTagElements() {
  try {
    const enData = await fetchJSON<Record<string, string>>('/lang/en.json');
    const all = document.body.getElementsByTagName('*');
    for (const key of Object.keys(enData)) {
      const expected = enData[key].toUpperCase();
      for (let i = 0; i < all.length; i++) {
        const el = all[i] as HTMLElement;
        if (el.firstElementChild || el.dataset.tkey) continue;
        if (el.textContent?.trim().toUpperCase() !== expected) continue;
        el.dataset.tkey = key;
        if (key.charAt(0) !== 'r') break;
      }
    }
  } catch (err) {
    console.error('Failed to auto-tag elements:', err);
  }
}

const ACCEPT_LANGS = ['en', 'fr', 'es', 'ar', 'zh', 'de', 'sl', 'cs', 'nl', 'tr', 'it', 'ru'];

function useLanguageInit() {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>({
    code: 'en',
    name: 'English',
  });
  const [languages, setLanguages] = useState<Language[]>([]);

  useEffect(() => {
    autoTagElements();
    (async () => {
      try {
        const cookieLang = document.cookie
          .split('; ')
          .find((r) => r.startsWith('CCX_Language='))
          ?.split('=')[1];
        let code = cookieLang || navigator.language.substring(0, 2) || 'en';
        if (!ACCEPT_LANGS.includes(code)) code = 'en';

        const selectionData =
          await fetchJSON<Record<string, LanguageSelection>>('/lang/selection.json');
        const langList: Language[] = Object.entries(selectionData).map(([c, v]) => ({
          code: c,
          name: v.name,
        }));
        setLanguages(langList);

        const current = langList.find((l) => l.code === code) ?? langList[0];
        setSelectedLanguage(current);

        applyLangData(await fetchJSON<Record<string, string>>(`/lang/${current.code}.json`));
      } catch {
        setLanguages([{ code: 'en', name: 'English' }]);
      }
    })();
  }, []);

  useEffect(() => {
    if (!selectedLanguage.code) return;
    const timer = setTimeout(() => {
      fetchJSON<Record<string, string>>(`/lang/${selectedLanguage.code}.json`)
        .then(applyLangData)
        .catch(console.error);
    }, 100);
    return () => clearTimeout(timer);
  }, [selectedLanguage.code]);

  return { selectedLanguage, languages, setSelectedLanguage };
}

export function LanguageSelector() {
  const { selectedLanguage, languages, setSelectedLanguage } = useLanguageInit();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handle = (e: MouseEvent) => {
      if (dropdownRef.current?.contains(e.target as Node)) return;
      if (buttonRef.current?.contains(e.target as Node)) return;
      setIsOpen(false);
    };
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, [isOpen]);

  const handleLanguageSelect = async (lang: Language) => {
    // biome-ignore lint/suspicious/noDocumentCookie: needed for legacy browsers
    document.cookie = `CCX_Language=${lang.code}; max-age=2629800; samesite=strict; secure`;
    setSelectedLanguage(lang);
    setIsOpen(false);
    applyLangData(await fetchJSON<Record<string, string>>(`/lang/${lang.code}.json`));
  };

  return (
    <div className="relative inline-block">
      <button
        type="button"
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="language-selector flex items-center justify-center gap-2 text-white hover:text-[var(--color1)] transition-all duration-300"
        aria-label="Select language"
        aria-expanded={isOpen}
      >
        <i className="fas fa-language text-6xl align-middle" />
        <span id="selectedLanguage" className="text-3xl">
          {selectedLanguage.name}
        </span>
      </button>
      <div
        ref={dropdownRef}
        className={cn(
          'absolute right-0 mt-2 min-w-[110px] bg-[#0C0C0C] border border-[#333333] rounded-lg shadow-[0px_8px_16px_0px_rgba(0,0,0,0.2)] z-50 overflow-auto',
          isOpen ? 'block' : 'hidden'
        )}
      >
        {languages.map((lang) => (
          <button
            type="button"
            key={lang.code}
            onClick={() => handleLanguageSelect(lang)}
            className={cn(
              'w-full text-left text-white px-4 py-3 block hover:bg-[#ddd] hover:text-[#111] transition-colors duration-200',
              selectedLanguage.code === lang.code && 'bg-[rgba(255,165,0,0.2)]'
            )}
          >
            {lang.name}
          </button>
        ))}
      </div>
    </div>
  );
}
