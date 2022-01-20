
const isExternal = function (url: string): boolean {
    return !!url && url.startsWith('http')
}

const isMail = function (url: string): boolean {
    return !!url && url.startsWith('mailto')
}

const isIdAnchor = function (url: string): boolean {
    return !!url && url.startsWith('#')
}

export {
    isExternal, isMail, isIdAnchor
}
