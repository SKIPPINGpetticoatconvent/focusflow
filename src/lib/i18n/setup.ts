import { addMessages, init } from "svelte-i18n";
import { en, zh } from "$lib/i18n/messages";

export type Locale = "en" | "zh";

let initialized = false;

export function setupI18n(initialLocale: Locale = "en") {
  if (initialized) return;

  addMessages("en", en);
  addMessages("zh", zh);

  init({
    fallbackLocale: "en",
    initialLocale,
  });

  initialized = true;
}

