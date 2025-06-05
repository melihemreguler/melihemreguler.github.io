import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en.json";
import tr from "./locales/tr.json";

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: en },
            tr: { translation: tr },
        },
        lng: "en",
        fallbackLng: "en",
        interpolation: { escapeValue: false },
        // Make sure i18n is initialized synchronously
        initImmediate: false,
        // Ensure resources are loaded
        load: 'all',
        preload: ['en', 'tr'],
        // Disable async loading since we're importing resources directly
        partialBundledLanguages: true,
    });

export default i18n;
