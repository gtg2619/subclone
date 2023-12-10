# subclone

## overview

Repository subdirectory cloning tool based on github api

## install

TODO

## usage

### use as module

```js
const subclone = require("subclone")

// Use complete subdirectory URL which you want download
subclone("https://github.com/gtg2619/gtg2619.github.io/tree/main/gitbook", {
    // Even for non-private repositories, this is generally necessary due to Github rate limits
    // generate it at https://github.com/settings/tokens
    "token": "xxxxx", 
    // customPath where you want store these fild
    "customPath": "notgittbook"
})
```

### use in cli

TODO