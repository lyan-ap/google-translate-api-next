const translate = require("./index");
const { evalJsString, appendLines } = require("./utils");

const targets = ["en", "ja", "ko"];
const targetNames = ["en-US", "ja-JP", "ko-KR"];

const dir = "./locales";

async function goTranslate(data, target) {
    return await translate(data, {
        from: "zh-CN",
        to: target,
        forceTo: true,
        refresh: !true,
    });
}

// cn -> en+jp+kr
exports.onMakeLocales = async function onMakeLocales(stdout) {
    if (err) throw err;
    const json = evalJsString(stdout);

    const res = await translate(json, {
        from: "zh-CN",
        to: targets,
        forceTo: true,
        refresh: !true,
    });
    const targetResults = await Promise.all(res);
    console.log("targetResults: ", targetResults);
};

// cn diff -> en+jp+kr
exports.onMakeLocale = async function onMakeLocale(stdout, push = true) {
    const json = evalJsString(stdout);
    console.log("missed: ", json);
    const { en, jp, kr } = json;
    const missedList = [en, jp, kr];
    if (missedList.every((x) => !Object.keys(x).length)) {
        console.info("passed: no missed!");
        return;
    }
    const res = missedList.map((item, i) => goTranslate(item, targets[i]));
    const targetResults = (await Promise.all(res)).map((x, i) => ({
        [targetNames[i]]: x,
    }));

    console.log("result: ", targetResults);
    // append result to files
    if (push !== "keep") {
        for (let result of targetResults) {
            const [[name, linesObj]] = Object.entries(result);
            appendLines(linesObj, `./src/locales/${name}.ts`);
        }
    }
};
