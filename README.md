# subclone

## overview

Repository subdirectory cloning tool based on github api

## install

```bash
npm i subclone -g
```

## usage

### use as module

```js
const subclone = require("subclone");

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
subclone -u https://github.com/sajjadium/ctf-archives/tree/main/ctfs/0CTF/2023/web/ -t xxx_xxxxxxxxxxxxxxxxxxxxxxxxxxxx -p 0CTFwebChalls
```