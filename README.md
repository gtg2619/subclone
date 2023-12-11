# subclone

## overview

Repository subdirectory cloning tool based on github api

## install

TODO

## usage

### use as module

```js
const subclone = require("subclone")

(async()=>{
// Use complete subdirectory URL which you want download
await subclone("https://github.com/gtg2619/gtg2619.github.io/tree/main/gitbook/images", {
    // Even for non-private repositories, this is generally necessary due to Github rate limits
    // generate it at https://github.com/settings/tokens
    "token": "xxxx",
    // optional customPath where you want store these file
    "customPath": "notgittbook"
    // Return the folder name until all promises resolve
}).then(folder_name=>console.log(folder_name))
})()
```

### use in cli

```
node .\cli.js https://github.com/gtg2619/gtg2619.github.io/tree/main/gitbook -t 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 -p notgittbook
```