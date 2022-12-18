export function getSearchParam(str) {

    const searchParam = (str && str !== "") ? str : window.location.search;

    if (!(/\?([a-zA-Z0-9_]+)/i.exec(searchParam))) return {};
    let match,
        pl     = /\+/g,  // Regex for replacing addition symbol with a space
        search = /([^?&=]+)=?([^&]*)/g,
        decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
        index = /\?([a-zA-Z0-9_]+)/i.exec(searchParam)["index"]+1,
        query  = searchParam.substring(index);

    let urlParams = {};
    while (match = search.exec(query)) {
        urlParams[decode(match[1])] = decode(match[2]);
    }
    return urlParams;
    
}