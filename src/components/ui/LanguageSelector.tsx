import { useCallback, useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface Language {
  code: string;
  name: string;
}

interface LanguageSelection {
  name: string;
}

export function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<Language>({
    code: 'en',
    name: 'English',
  });
  const [languages, setLanguages] = useState<Language[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Helper function to check if element matches the translation text
    const elementMatchesText = (element: Element, expectedText: string): boolean => {
      if (element.firstElementChild) return false;
      if ((element as HTMLElement).dataset.tkey) return false;

      const elementText = element.textContent?.trim().toUpperCase();
      return elementText === expectedText.toUpperCase();
    };

    // Helper function to tag a single element
    const tagElement = (element: Element, key: string): boolean => {
      (element as HTMLElement).dataset.tkey = key;
      return key.charAt(0) !== 'r';
    };

    // Helper function to find and tag elements for a specific key
    const tagElementsForKey = (
      key: string,
      expectedText: string,
      allElements: HTMLCollectionOf<Element>
    ): void => {
      for (let i = 0; i < allElements.length; i++) {
        const element = allElements[i];
        if (elementMatchesText(element, expectedText)) {
          const shouldContinue = tagElement(element, key);
          if (!shouldContinue) break;
        }
      }
    };

    // Auto-tag elements with data-tkey based on English text (matching original language.js behavior)
    const autoTagElements = async () => {
      try {
        const response = await fetch('/lang/en.json');
        const enLangData = await response.json();
        const allElements = document.body.getElementsByTagName('*');

        for (const key of Object.keys(enLangData)) {
          tagElementsForKey(key, enLangData[key], allElements);
        }
      } catch (err) {
        console.error('Failed to auto-tag elements:', err);
      }
    };

    // Load available languages
    const loadLanguages = async () => {
      try {
        // Get initial language from cookie or browser language
        const cookieLang = document.cookie
          .split('; ')
          .find((row) => row.startsWith('CCX_Language='))
          ?.split('=')[1];

        let currentLang = cookieLang || navigator.language.substring(0, 2) || 'en';

        // Validate language is in accepted list
        const acceptLang = ['ru', 'en', 'ar', 'es', 'zh', 'de', 'sl', 'cs', 'nl', 'tr', 'fr', 'it'];
        if (!acceptLang.includes(currentLang)) {
          currentLang = 'en';
        }

        // Load language selection
        const selectionRes = await fetch('/lang/selection.json');
        const selectionData = (await selectionRes.json()) as Record<string, LanguageSelection>;

        const langList: Language[] = Object.entries(selectionData).map(([code, value]) => ({
          code,
          name: value.name,
        }));
        setLanguages(langList);

        // Set selected language
        const current = langList.find((l) => l.code === currentLang) || langList[0];
        setSelectedLanguage(current);

        // Load and apply translations for initial language
        const langRes = await fetch(`/lang/${currentLang}.json`);
        const langData = await langRes.json();

        const elements = document.querySelectorAll('[data-tkey]');
        elements.forEach((element) => {
          const key = (element as HTMLElement).dataset.tkey;
          if (key && langData[key]) {
            element.textContent = langData[key];
          }
        });
      } catch (err) {
        console.error('Failed to load languages:', err);
        // Fallback
        setLanguages([{ code: 'en', name: 'English' }]);
      }
    };

    autoTagElements();
    loadLanguages();
  }, []);

  useEffect(() => {
    // Close dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        buttonRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  const applyTranslations = useCallback(async (langCode: string) => {
    try {
      const response = await fetch(`/lang/${langCode}.json`);
      const langData = await response.json();

      // Update all elements with data-tkey attributes
      const elements = document.querySelectorAll('[data-tkey]');
      elements.forEach((element) => {
        const key = (element as HTMLElement).dataset.tkey;
        if (key && langData[key]) {
          // Preserve HTML structure if it exists
          if (element.children.length === 0) {
            element.textContent = langData[key];
          } else {
            // If element has children, only update if it's a simple text node replacement
            const firstChild = element.firstChild;
            if (firstChild && firstChild.nodeType === Node.TEXT_NODE) {
              firstChild.textContent = langData[key];
            } else {
              element.textContent = langData[key];
            }
          }
        }
      });
    } catch (err) {
      console.error('Failed to load language:', err);
    }
  }, []);

  // Re-apply translations when language changes, with a small delay to ensure DOM is ready
  useEffect(() => {
    if (selectedLanguage.code) {
      // Use setTimeout to ensure React has finished rendering
      const timer = setTimeout(() => {
        applyTranslations(selectedLanguage.code);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [selectedLanguage.code, applyTranslations]);

  const handleLanguageSelect = async (lang: Language) => {
    // Set cookie
    // biome-ignore lint/suspicious/noDocumentCookie: need to use document.cookie for legacy browsers
    document.cookie = `CCX_Language=${lang.code}; max-age=2629800; samesite=strict; secure`;

    setSelectedLanguage(lang);
    setIsOpen(false);

    // Apply translations immediately
    await applyTranslations(lang.code);
  };

  return (
    <div className="relative inline-block">
      <button
        type="button"
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="language-selector flex items-center justify-center gap-2 text-white hover:text-[orange] transition-all duration-300"
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
