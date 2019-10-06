/**
 * Performs a deep copy of variable
 * @param {*} obj - Literally anything
 * @returns {*} Deep copy version of param
 */
export const deepCopy = (
    obj: object | boolean | string | number,
): object | boolean | string | number => {
    if (Array.isArray(obj)) {
        return obj.map((item: object | boolean | string | number):
            | object
            | boolean
            | string
            | number => deepCopy(item));
    }

    if (typeof obj === 'object' && obj !== null) {
        return Object.entries(obj).reduce((acc, [key, value]): object => {
            acc[key] = deepCopy(value);
            return acc;
        }, {});
    }

    return obj;
};
