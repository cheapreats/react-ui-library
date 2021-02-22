/**
 * Performs a deep copy of variable
 * @param {*} original - Literally anything
 * @returns {*} Deep copy version of param
 */
export const deepCopy = <T>(original: T): T => {
    if (original instanceof Date) {
        return new Date(original) as any;
    }
    if (Array.isArray(original)) {
        const copyArray: any[] = original as any[];
        return copyArray.map((item: any) => deepCopy<any>(item)) as any;
    }
    if (typeof original === 'object') {
        return Object.entries(original).reduce(
            (acc, [key, value]: [string, any]) => {
                acc[key] = deepCopy(value);
                return acc;
            },
            {},
        ) as T;
    }
    return original;
};
