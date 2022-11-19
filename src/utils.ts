
const fs = require("fs");

export function getMissedKeys(options: Record<string, object>, name: string) {
  const { cn, en, jp, kr } = options;

  const missed: any = {
    en: {},
    jp: {},
    kr: {},
  };
  Object.entries(cn).forEach(([key, val]) => {
    if (!(key in en)) {
      missed.en[key] = val;
    }
    if (!(key in jp)) {
      missed.jp[key] = val;
    }
    if (!(key in kr)) {
      missed.kr[key] = val;
    }
  });
  fs.writeFile(`${name}.json`, JSON.stringify(missed, null, 4), (err: any) => {
    if (err) throw err;
    console.log(`${name}.json file generated`);
  });

  console.log('missed: ', missed);
  return missed;
}