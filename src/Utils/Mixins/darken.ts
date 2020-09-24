const COLOR_RANGE = 255;

/**
 * Darkens given color (Would support more in the future)
 * @param {string} color - HEX color
 * @param {number} [amount=0.1] - Percentage of darkening
 * @returns {string} Darkened color
 */
export const darken = (color: string, amount = 0.1): string => {
    let res = '#';
    const val = Math.floor(COLOR_RANGE * amount);

    for (let i = 1; i < 7; i += 2) {
        const c = parseInt(color.slice(i, i + 2), 16);
        const num = Math.max(c - val, 0);
        res += num.toString(16).padStart(2, '0');
    }
    return res;
};
