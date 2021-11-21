/**
 * Flex display with common properties. Can have the following configurations
 * - Nothing => row, flex-start, flex-start
 * - One param => direction / justify + align
 * - Two param => (direction, justify + align) OR (justify, align)
 * - Three param => (direction, justify, align)
 * @param {string} param1 - First parameter
 * @param {string} param2 - Second parameter
 * @param {string} param3 - Third parameter
 * @returns {string} flex styles
 */
export declare const flex: (param1?: string | undefined, param2?: string | undefined, param3?: string | undefined) => string;
