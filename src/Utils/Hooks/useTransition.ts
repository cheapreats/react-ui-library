import { useEffect, useRef, useState } from 'react';

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
export const useTransition = (
    init = false,
    options: UseTransitionType = {},
): [boolean, boolean, boolean] => {
    const [initState, setInit] = useState(init);
    const timer = useRef<number>();

    useEffect((): (() => void) => {
        let mounted = true;
        window.clearTimeout(timer.current);
        timer.current = window.setTimeout((): void => {
            if (mounted) setInit(init);
        }, (init ? options.start : options.end) || 0);
        return (): void => {
            mounted = false;
        };
    }, [init !== initState]);

    return [initState, initState || init, initState && init];
};
