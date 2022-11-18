const fs = require("fs");

function getMissedKeys(root: string, name: string) {
    const cn = require(`${root}/zh-CN`).default;
    const en = require(`${root}/en-US`).default;
    const jp = require(`${root}/ja-JP`).default;
    const kr = require(`${root}/ko-KR`).default;
    // crowd management project
    // const cn = require(`${root}/zh-CN.json`);
    // const en = require(`${root}/en-US.json`);
    // const jp = require(`${root}/ja-JP.json`);
    // const kr = require(`${root}/ko-KR.json`);
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

const args = process.argv.slice(2);
getMissedKeys(`${args[0] || '/Users/lyan/Documents/loonshots-web'}/src/locales`, 'source');
