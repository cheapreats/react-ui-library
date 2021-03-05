const FLEX_DIRECTIONS = ['row', 'column', 'row-reverse', 'column-reverse'];
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
export const flex = (
    param1?: string,
    param2?: string,
    param3?: string,
): string => {
    // No params
    if (!param1) return 'display: flex;';

    // One param
    if (!param2) {
        return `
            display: flex;
            ${
                FLEX_DIRECTIONS.includes(param1)
                    ? `
                flex-direction: ${param1};
            `
                    : `
                justify-content: ${param1};
                align-items: ${param1};
            `
            }
        `;
    }

    // Two params
    if (!param3) {
        return `
            display: flex;
            ${
                FLEX_DIRECTIONS.includes(param1)
                    ? `
                flex-direction: ${param1};
                justify-content: ${param2};
                align-items: ${param2};
            `
                    : `
                justify-content: ${param1};
                align-items: ${param2};
            `
            }
        `;
    }

    // Three params
    return `
        display: flex;
        flex-direction: ${param1};
        justify-content: ${param2};
        align-items: ${param3};
    `;
};
