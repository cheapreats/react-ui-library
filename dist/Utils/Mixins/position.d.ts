/**
 * Positioning with defaulting built in
 * @param {string} [value='absolute'] - The CSS positioning used
 * @param {number|string} [margin=0] - The margin used
 * @param {number|string} [top='auto'] - CSS top attribute
 * @param {number|string} right - CSS right attribute (Defaults to top)
 * @param {number|string} bottom - CSS bottom attribute (Defaults to top)
 * @param {number|string} left - CSS left attribute (Defaults to right)
 * @returns {string} Styling for consistent and stable positioning
 */
export declare const position: (value?: string, margin?: number | string, top?: number | string, right?: number | string, bottom?: number | string, left?: number | string) => string;
