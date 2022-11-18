const fs = require("fs");

function getMissedKeys(root: string, name: string) {
    const cn = require(`${root}/zh-CN`).default;
    const en = require(`${root}/en-US`).default;
    const jp = require(`${root}/ja-JP`).default;
    const kr = require(`${root}/ko-KR`).default;
    const missed: any = {
        en: {},
        jp: {},
        kr: {},
    };
    Object.keys(cn).forEach((key) => {
        if (!(key in en)) {
            missed.en[key] = cn[key];
        }
        if (!(key in jp)) {
            missed.jp[key] = cn[key];
        }
        if (!(key in kr)) {
            missed.kr[key] = cn[key];
        }
    });
    fs.writeFile(`${name}.json`, JSON.stringify(missed, null, 4), (err: any) => {
        if (err) throw err;
        console.log(`${name}.json file generated`);
    });

    return missed;
}

const args = process.argv.slice(2);
console.log(getMissedKeys(`${args[0] || '/Users/lyan/Documents/loonshots-web'}/src/locales`, 'source'));
