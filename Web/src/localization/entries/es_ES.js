import appLocaleData from "react-intl/locale-data/es";

import { messages as commonMessages } from "odc-common";
import { messages as secMessages } from "odc-security";

import { messages as secMsgDocConfig } from "odc-docConfiguration";
import { messages as capMessagges} from "odc-capacitacion"
import { default as siteMessages } from "../locales/es_ES";

let union = Object.assign(
  commonMessages,

  secMessages,
  secMsgDocConfig,
  capMessagges,
  
  
  secMessages
 );
const saLang = {
  messages: {
    ...union
  },
  locale: "es",
  data: appLocaleData
};
export default saLang;
