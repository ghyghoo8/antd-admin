import { formatter } from "@lingui/format-json"

export default {
  fallbackLocales: {
    default: "en",
  },
  sourceLocale: "en",
  locales: ["en", "zh", "pt-br"],
  catalogs: [
    {
      path: "src/locales/{locale}/messages",
      include: [
        "src/pages",
        "src/layouts",
        "src/components",
        "src/layouts",
      ],
    },
  ],
  format: formatter({ style: "minimal" }),
}
