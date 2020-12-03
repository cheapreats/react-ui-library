import theme from '../../Themes/ThemeTemplate';

/**
 * Defined transition for specific property
 * @typedef {Object} TransitionOption
 * @property {string} property - The transition property that is being targetted
 * @property {string|number} duration - The duration (default in milliseconds)
 */
export interface TransitionOptionType {
    duration?: string | number;
    prop: string;
}

/**
 * Adds transitions in batch
 * @param {string[]|TransitionOption[]} items - The items to transition with optional configuration
 * @param {string|number} duration - The duration of transition
 * @returns {string} CSS style for transition for provided items
 */
export const transition = (
    items: (TransitionOptionType | string)[],
    duration: string | number = theme.speed.normal,
): string =>
    `transition: ${items
        .reduce<string>((acc, item: string | TransitionOptionType): string => {
            const d = typeof item === 'string' ? duration : item.duration;
            const i = `${typeof item === 'string' ? item : item.prop} ${
                d + (typeof d === 'number' ? 'ms' : '')
            }`;
            return `${acc}, ${i} cubic-bezier(0.4, 0.0, 0.2, 1)`;
        }, '')
        .slice(2)};`;
