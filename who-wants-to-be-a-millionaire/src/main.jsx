import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import global_en from "./translations/en/global.json";
import global_lt from "./translations/lt/global.json";

import i18next from "i18next";
import { interpolate } from "framer-motion";
import { I18nextProvider } from "react-i18next";

i18next.init({
  interpolation: { escapeValue: false },
  lng: "en",
  resources: {
    en: {
      global: global_en,
    },
    lt: {
      global: global_lt,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <I18nextProvider i18n={i18next}>
    <App />
  </I18nextProvider>
);
