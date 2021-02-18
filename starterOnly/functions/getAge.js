export function getAge(date) {
    var diff = Date.now() - date.getTime()-1000*60*60*16;
    var age = new Date(diff);
    return Math.abs(age.getFullYear() - 1970);
}
