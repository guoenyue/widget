export function formatDate(v) {
    let t = {
        y : v.getFullYear(),
        m : v.getMonth() + 1 < 10 ? ('0' + (v.getMonth() + 1)) : v.getMonth() + 1,
        d : v.getDate() < 10 ? ('0' + v.getDate()) : v.getDate()
    };

    return t.y + '-' + t.m + '-' + t.d;
};
export function formatTime(v) {
    let t = {
        y : v.getFullYear(),
        m : v.getMonth() + 1 < 10 ? ('0' + (v.getMonth() + 1)) : v.getMonth() + 1,
        d : v.getDate() < 10 ? ('0' + v.getDate()) : v.getDate(),
        h : v.getHours() < 10 ? ('0' + v.getHours()) : v.getHours(),
        mi : v.getMinutes() < 10 ? ('0' + v.getMinutes()) : v.getMinutes(),
        s : v.getSeconds() < 10 ? ('0' + v.getSeconds()) : v.getSeconds()
    };

    return t.y + '-' + t.m + '-' + t.d + ' ' + t.h + ':' + t.mi + ':' + t.s;
};
export function getDateByDays(date, days) {
    const preDate = new Date(date);
    preDate.setDate(preDate.getDate() - days);
    return formatDate(preDate);
};
export function getDaysOfMon(year, month) {
    let day = new Date(year, month, 0);
    return day.getDate();
};
