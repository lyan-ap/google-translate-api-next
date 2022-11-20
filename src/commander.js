#!/usr/bin/env node
const path = require("path");
const fs = require("fs");
const { exec } = require("child_process");
const { onMakeLocale } = require("./gen-locales");

const dir = "./src/locales";
if (!fs.existsSync(dir)) {
    return console.log("locales directory is not exist!");
}

global.appRoot = path.resolve(__dirname);

let cmdStr = `ts-node -O '{\"module\": \"commonjs\"}' ${__dirname}/miss-helper.ts`;
const [crowd] = process.argv.slice(2);

if (crowd === "crowd") {
    cmdStr += " crowd";
}

exec(cmdStr, (err, stdout, stderr) => {
    if (err) {
        console.log("err: ", err);
        return;
    }
    onMakeLocale(stdout);
});
