const { onMakeLocale } = require("./src/gen-locales");

const missed = `{
    en: {
        "api.overview.unusual": "异常明细",
        "api.overview.count": "调用次数",
    },
    jp: {
      "api.overview.unusual": "异常明细",
      "api.overview.count": "调用次数",
    },
    kr: {
    },
}`;
onMakeLocale(missed);
// onMakeLocale(missed, false);
