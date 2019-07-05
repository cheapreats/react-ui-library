import { useState, useEffect, useRef } from 'react';

/**
 * Internal hook used to extract implicity defined props to prop
 * @param {Object} props - props to extract info from (user define with __accept)
 * @param {any[]} accept - Props to include by component
 */
export const __useImplicitProps = (
    props: { __accept?: string[] },
    accept: string[] = [],
): object => (
    [...(props.__accept || []), ...accept].reduce(
        (acc, prop): object => {
            acc[prop] = props[prop];
            return acc;
        }, {},
    )
);


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
    init: boolean = false,
    options: UseTransitionType = {},
): [ boolean, boolean, boolean ] => {
    const [initState, setInit] = useState(init);
    const timer = useRef<number>();

    useEffect((): void => {
        window.clearTimeout(timer.current);
        timer.current = window.setTimeout((): void => {
            setInit(init);
        }, (init ? options.start : options.end) || 0);
    }, [init !== initState]);

    return [initState, initState || init, initState && init];
};
