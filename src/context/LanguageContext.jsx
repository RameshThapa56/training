import { createContext, use, useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { dzHomeTranslations } from '../content/dzongkha.js';

/**
 * Site-wide language state. Per CLAUDE.md's phase discipline, translation
 * content itself is scoped to the Home page only (`dzHomeTranslations`) —
 * every other page keeps rendering English regardless of the selected
 * locale, so the switch is future-proofed for a wider rollout without
 * pretending pages that haven't been translated yet have been.
 */
export const LOCALES = { EN: 'en', DZ: 'dz' };
const STORAGE_KEY = 'portfolio:locale';

const LanguageContext = createContext(null);

function readStoredLocale() {
  if (typeof window === 'undefined') return LOCALES.EN;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored === LOCALES.DZ ? LOCALES.DZ : LOCALES.EN;
  } catch {
    // Storage can throw in private-browsing/locked-down contexts — fall
    // back to the default rather than letting the app crash over it.
    return LOCALES.EN;
  }
}

/**
 * @param {{ children: React.ReactNode }} props
 */
export function LanguageProvider({ children }) {
  const [locale, setLocale] = useState(readStoredLocale);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, locale);
    } catch {
      // Best-effort persistence only.
    }
    document.documentElement.lang = locale === LOCALES.DZ ? 'dz' : 'en';
  }, [locale]);

  const toggleLocale = useCallback(() => {
    setLocale((current) => (current === LOCALES.EN ? LOCALES.DZ : LOCALES.EN));
  }, []);

  /**
   * Home-scoped translation lookup. `key` indexes `dzHomeTranslations`;
   * `fallbackEnglish` is the copy already written inline at the call site,
   * so English content lives once, in the component, rather than being
   * duplicated into the dictionary.
   *
   * @param {string} key
   * @param {string} fallbackEnglish
   * @returns {string}
   */
  const t = useCallback(
    (key, fallbackEnglish) => (locale === LOCALES.DZ ? dzHomeTranslations[key] ?? fallbackEnglish : fallbackEnglish),
    [locale],
  );

  const value = useMemo(
    () => ({ locale, setLocale, toggleLocale, isDzongkha: locale === LOCALES.DZ, t }),
    [locale, toggleLocale, t],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

LanguageProvider.propTypes = { children: PropTypes.node.isRequired };

/**
 * Reads the current locale + Home-scoped translator. Uses React 19's
 * `use()` (per CLAUDE.md's "use() for async/context reads") rather than
 * `useContext`.
 */
export function useLanguage() {
  const ctx = use(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider');
  return ctx;
}
