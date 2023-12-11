const { clone } = require("./cloner");
const { parseURL } = require("./parser");


module.exports = subclone;
async function subclone(url, opt){

    // allowing setting of opt.customPath && opt.token

    console.log(`started to subclone ${url}`);
    // remove the final '/'
    if(url.endsWith('/')) url = url.slice(0,url.length-1);
    

    // target: {repo, owner, directory, ref, subCount}
    let target = parseURL(url);

    // change subCount to opt param
    opt.subCount = target.subCount;
    delete target.subCount;

    if(!opt.customPath) opt.customPath = target.owner + '-' + target.repo + '-' + target.ref + '-' + target.directory.replaceAll('/', '-');
    else if(opt.customPath && opt.customPath.endsWith('/')) opt.customPath = opt.customPath.slice(0,opt.customPath.length-1);

    // began to clone
    let saveDir = await clone(target, opt);

    // only return the folder name after it complete
    // return opt.path || target.directory.slice(target.directory.lastIndexOf('/')+1);
    return saveDir;
}


