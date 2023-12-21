const fetch = require('node-fetch');
const fs = require("fs");

module.exports.clone = clone;
module.exports.customize = customize;
async function getJSON(url, opt){
    fetchOpt = {}
    if(opt.token) fetchOpt = {"headers":{
        "Accept": "application/vnd.github+json",
        "Authorization": `Bearer ${opt.token}`,
        "X-GitHub-Api-Version": "2022-11-28"
    }, ...fetchOpt};
    return fetch(url, fetchOpt).then(response=>response.json());
}

async function getBlob(url, token){
    fetchOpt = {}
    if(token) fetchOpt = {"headers":{
        "Accept": "application/vnd.github+json",
        "Authorization": `Bearer ${token}`,
        "X-GitHub-Api-Version": "2022-11-28"
    }, ...fetchOpt};
    return fetch(url, fetchOpt).then(response=>response.blob());
}

async function saveBlob(url, token, path){
    return await getBlob(url, token).then(async (blob)=>{
        return blob.arrayBuffer();
    }).then(async (arrayBuffer)=>{
        fs.writeFileSync(path, Buffer.from(arrayBuffer));
        return 'File: '+ path + ' succeed';
    }).then(t=>console.info(t));
}

async function customize(path, customPath, subCount){
    if(customPath){
        let splited = path.split('/');
        for(let i = 0; i < subCount; i++){
            splited.shift();
        }
        return customPath + '/' + splited.join('/');
    } else {
        return path;
    }
}

async function clone(target, opt){
    const saveDir = opt.path;
    if (!fs.existsSync(saveDir)){ fs.mkdirSync(saveDir); } else {throw new Error(`Directory conflicts while creating ${saveDir}`)}
    let url = "";
    if (typeof target != 'string'){
        url = `https://api.github.com/repos/${target.owner}/${target.repo}/contents/${target.directory}`;
        params = target.ref ? `?ref=${target.ref}` : "";
        url += params;
    } else {
        url = target;
    }
    await getJSON(url, opt).then(async (items)=>{
        await Promise.all(items.map(async (item) => {
            let childOpt = { ...opt};
            childOpt.path = await customize(item.path, opt.customPath, opt.subCount);
            if(item.download_url != null){
                await saveBlob(item.download_url, childOpt.token, childOpt.path);
            } else {
                childUrl = item._links.self;
                await clone(childUrl, childOpt);
            }
        }));
    })
    return await customize(opt.path || target.directory.slice(target.directory.lastIndexOf('/') + 1), opt.customPath, opt.subCount);
}