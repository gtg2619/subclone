const { clone } = require("./cloner");
const { parseURL } = require("./parser");


module.exports = subclone;
function subclone(url, opt){

// allowing setting of opt.customPath && opt.token

    // target: {repo, owner, directory, ref}
    let target = parseURL(url);
    
    clone(target, opt);
    // only return the folder name before it complete
    return target.directory.slice(target.directory.lastIndexOf('/')+1)
}


