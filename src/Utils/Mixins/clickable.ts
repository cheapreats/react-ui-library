import { darken } from './darken';

const createStyles = (color: string, attrs: string[]): string =>
    attrs.reduce((acc, curr): string => `${acc}${curr}: ${color};`, '');

/**
 * Styles for clickable content
 * @param {string} color - background-color of content
 * @returns {string} The interactive styles for clickable content
 */
export const clickable = (
    color: string,
    amount = 0.1,
    attributes = ['background-color'],
): string => `
    cursor: pointer;
    &:not(:disabled):hover {
        ${createStyles(darken(color, amount), attributes)}
    }

    &:not(:disabled):active {
        ${createStyles(darken(color, amount * 2), attributes)}
    }
`;
