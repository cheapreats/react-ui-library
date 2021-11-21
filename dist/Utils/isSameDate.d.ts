declare enum dateScope {
    YEAR = 0,
    MONTH = 1,
    DAY = 3,
    HOUR = 4,
    MINUTE = 5,
    SECOND = 6
}
export declare const isSameDate: {
    (date: Date, scope: dateScope): boolean;
    scopes: typeof dateScope;
};
export {};
