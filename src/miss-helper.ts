const { getMissedKeys } = require("./utils");

function check(root: string, isCrowd = false) {
    const options = {
        cn: {},
        en: {},
        jp: {},
        kr: {},
    };
    // crowd management project
    if (isCrowd) {
        options.cn = require(`${root}/zh-CN.json`);
        options.en = require(`${root}/en-US.json`);
        options.jp = require(`${root}/ja-JP.json`);
        options.kr = require(`${root}/ko-KR.json`);
    } else {
        options.cn = require(`${root}/zh-CN`).default;
        options.en = require(`${root}/en-US`).default;
        options.jp = require(`${root}/ja-JP`).default;
        options.kr = require(`${root}/ko-KR`).default;
    }
    getMissedKeys(options, "source");
}
const [crowd] = process.argv.slice(2);
const root = `${process.cwd()}/src/locales`;

check(root, crowd === 'crowd');

