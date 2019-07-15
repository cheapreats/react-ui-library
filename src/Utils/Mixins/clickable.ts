import { darken } from './darken';

/**
 * Styles for clickable content
 * @param {string} color - background-color of content
 * @returns {string} The interactive styles for clickable content
 */
export const clickable = (color: string, amount = 0.1): string => `
    &:not(:disabled):hover {
        background-color: ${darken(color, amount)};
    }

    &:not(:disabled):active {
        background-color: ${darken(color, amount * 2)};
    }
`;
