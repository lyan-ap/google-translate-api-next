const fs = require("fs");

const translate = require("./index");

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

function onMakeLocales() {
    fs.readFile("./source.json", async (err, data) => {
        if (err) throw err;
        const json = JSON.parse(data);

        const res = await translate(json, {
            from: "zh-CN",
            to: targets,
            forceTo: true,
            refresh: !true,
        });
        const targetResults = await Promise.all(res);

        targetNames.forEach((name, i) => {
            const result = {};
            const keys = Object.keys(json);
            keys.forEach((key) => (result[key] = targetResults[i][key].text));
            fs.writeFile(
                `${dir}/${name}.json`,
                JSON.stringify(result, null, 4),
                (err) => {
                    if (err) throw err;
                    console.log(`${name}.json file generated`);
                }
            );
        });
    });
}

function onMakeLocale() {
    fs.readFile("./source.json", async (err, data) => {
        if (err) throw err;
        const { en, jp, kr } = JSON.parse(data);
        const missedList = [en, jp, kr];
        for (let i = 0; i < missedList.length; i++) {
            const item = missedList[i];
            const result = await goTranslate(item, targets[i]);
            const name = targetNames[i];
            fs.writeFile(
                `${dir}/${name}.json`,
                JSON.stringify(result, null, 4),
                (err) => {
                    if (err) throw err;
                    console.log(`${name}.json file generated`);
                }
            );
        }
    });
}
// one diff json 3 locales
// onMakeLocales();

// 3 json 3 locales
onMakeLocale();

fs.watchFile(
    "source.json",
    {
        // Specify the use of big integers
        // in the Stats object
        bigint: false,

        // Specify if the process should
        // continue as long as file is
        // watched
        persistent: true,

        // Specify the interval between
        // each poll the file
        interval: 2000,
    },
    (curr, prev) => {
        console.log("updating...");
        onMakeLocales();
    }
);
