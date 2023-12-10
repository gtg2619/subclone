module.exports.parseURL = parseURL;
function parseURL(url){
    let splited = url.split("/");
    let owner = splited[3];
    let repo = splited[4];
    // currently only suitable for tree
    let ref = splited[6] || "main";
    let directory = splited.slice(7).join("/") || "/";
    return {repo, owner, directory, ref}
}