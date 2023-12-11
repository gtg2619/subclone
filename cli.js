#!/usr/bin/env node

var argv = require('optimist').argv;
var subclone = require('./index');

(async()=>{
await subclone(argv.url || argv.u || argv["_"][0] || process.exit(1), {
    "token": argv.token || argv.t || process.env.github_access_token || "",
    "customPath": argv.p || argv.customPath || argv.path || process.env.customPath || undefined
}).then(folder_name=>folder_name);
})();
