import { browser } from "$app/environment";
import { get, writable } from "svelte/store";
import { addMessages, init, locale as i18nLocale } from "svelte-i18n";
import { en, zh } from "$lib/i18n/messages";

export type Locale = "zh" | "en";
export type Theme = "light" | "dark";

const LOCALE_KEY = "focusflow-locale";
const THEME_KEY = "focusflow-theme";

export const locale = i18nLocale;
export const theme = writable<Theme>("dark");
let initialized = false;

function applyLocale(value: Locale) {
  if (!browser) return;
  document.documentElement.lang = value === "zh" ? "zh-CN" : "en";
}

function applyTheme(value: Theme) {
  if (!browser) return;
  document.documentElement.setAttribute("data-theme", value);
}

export function setLocale(value: Locale) {
  locale.set(value);
  if (!browser) return;
  applyLocale(value);
  localStorage.setItem(LOCALE_KEY, value);
}

export function setTheme(value: Theme) {
  theme.set(value);
  if (!browser) return;
  applyTheme(value);
  localStorage.setItem(THEME_KEY, value);
}

export function toggleLocale() {
  const current = (get(locale) as Locale | null) ?? "en";
  const next: Locale = current === "zh" ? "en" : "zh";
  setLocale(next);
}

export function toggleTheme() {
  theme.update((current) => {
    const next = current === "dark" ? "light" : "dark";
    if (browser) {
      applyTheme(next);
      localStorage.setItem(THEME_KEY, next);
    }
    return next;
  });
}

export function initPreferences() {
  if (!browser || initialized) return;
  initialized = true;

  addMessages("en", en);
  addMessages("zh", zh);

  const savedLocale = localStorage.getItem(LOCALE_KEY) as Locale | null;
  const savedTheme = localStorage.getItem(THEME_KEY) as Theme | null;

  const initialLocale: Locale =
    savedLocale ||
    (navigator.language.toLowerCase().startsWith("zh") ? "zh" : "en");
  const initialTheme: Theme =
    savedTheme ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light");

  init({
    fallbackLocale: "en",
    initialLocale,
  });

  theme.set(initialTheme);
  applyLocale(initialLocale);
  applyTheme(initialTheme);
}
