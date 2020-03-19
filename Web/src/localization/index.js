import esLang from "./entries/es_ES";

import { addLocaleData } from "react-intl";

const AppLocale = {
  es: esLang
};

addLocaleData(AppLocale.es.data);

export default AppLocale;
