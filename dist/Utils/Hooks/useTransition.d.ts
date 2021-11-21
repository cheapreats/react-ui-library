/**
 * useTransition hook options
 * @typedef {Object} UseTransitionType
 * @property {number} [start=10] - Delay in ms from false => true
 * @property {number} [end=10] - Delay in ms from true => false
 */
export interface UseTransitionType {
    start?: number;
    end?: number;
}
/**
 * Delayed state change
 * @param {boolean} init - Inital state
 * @param {UseTransitionType} [options={}] - Options for useTransition
 * @returns {boolean[]} [ state, or, and ];
 */
export declare const useTransition: (init?: boolean, options?: UseTransitionType) => [boolean, boolean, boolean];
