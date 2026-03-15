
export function getLink(link) {
    const countSlash = link.split("/").length - 1;
    if (countSlash >= 2){
        const toCut = link.substring(link.lastIndexOf("/") + 1, link.length);
        const x = (link.length - toCut.length);
        return link.substring(0,x);
    }else{
        return link
    }
}
