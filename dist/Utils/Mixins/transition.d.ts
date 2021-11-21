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
export declare const transition: (items: (TransitionOptionType | string)[], duration?: string | number) => string;
