enum dateScope {
    YEAR = 0,
    MONTH = 1,
    DAY = 3,
    HOUR = 4,
    MINUTE = 5,
    SECOND = 6,
}

export const isSameDate = (date: Date, scope: dateScope): boolean => {
    const now = new Date();

    let res = date.getFullYear() === now.getFullYear();
    if (!res || scope === dateScope.YEAR) return res;

    res = res && date.getMonth() === now.getMonth();
    if (!res || scope === dateScope.MONTH) return res;

    res = res && date.getDate() === now.getDate();
    if (!res || scope === dateScope.DAY) return res;

    res = res && date.getHours() === now.getHours();
    if (!res || scope === dateScope.HOUR) return res;

    res = res && date.getMinutes() === now.getMinutes();
    if (!res || scope === dateScope.MINUTE) return res;

    res = res && date.getSeconds() === now.getSeconds();
    if (!res || scope === dateScope.SECOND) return res;

    // I'm going to assume that it's impossible to get the same millisecond
    return false;
};

isSameDate.scopes = dateScope;
