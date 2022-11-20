// const fs = require("fs");

exports.getMissedKeys = function getMissedKeys(options, name) {
    const { cn = {}, en, jp, kr } = options;

    const missed = {
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
    // write: stdin
    console.log(missed);
    return missed;
};

exports.evalJsString = function evalJsString(str) {
    let a = null;
    try {
        eval("a = " + str);
    } catch (err) {
        console.error(err);
    }
    if (typeof a === "object") return a;
    else return null;
};
