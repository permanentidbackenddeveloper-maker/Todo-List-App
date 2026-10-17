import i18n from "i18n";
import path from "path";

i18n.configure({
  locales: ["en", "ta", "hi"],
 directory: path.join(process.cwd(), "src/locales"),
  defaultLocale: "en",
  objectNotation: true
});

export default i18n;
