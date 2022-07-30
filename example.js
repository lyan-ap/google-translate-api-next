const fs = require("fs");

// const translate = require("google-translate-api-next");
const translate = require("./index");

const targets = ["ja", "en", "ko"];
const targetNames = ["ja-JP", "en-US", "ko-KR"];

const dir = "./locales";

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

onMakeLocales(); // run once

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
