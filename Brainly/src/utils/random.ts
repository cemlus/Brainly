export const random = (length: number) : string => {
    const str = "qwertyuiopasdfghjklzxcnm1234567890";
    let len = "";
    for (let i = 0; i < length ; i++) {
        len += str[Math.floor(Math.random() * str.length)];
    }
    return len
}