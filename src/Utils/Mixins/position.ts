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
export const position = (
    value = 'absolute',
    margin: number | string = 'auto',
    top: number | string = 0,
    right: number | string = top,
    bottom: number | string = top,
    left: number | string = right,
): string => `
    position: ${value};
    margin: ${margin};
    top: ${top};
    right: ${right};
    bottom: ${bottom};
    left: ${left};
`;
