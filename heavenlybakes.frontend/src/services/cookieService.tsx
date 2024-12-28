export function getCookie(name: string) : [] {
    const cookie: string | undefined = document.cookie.split('; ').find(row => row.startsWith(`${name}=`));
    
    if (!cookie) 
        return [];
    
    return JSON.parse(decodeURIComponent(cookie.split('=')[1]));
}

export function createCookie(name: string, value : object): void {
    document.cookie = `${name}=${encodeURIComponent(JSON.stringify(value))}`;
}
