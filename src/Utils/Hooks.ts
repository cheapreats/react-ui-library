import { useState, useEffect, useRef } from 'react';
import { UseTransitionType } from './@types/Hooks';

const ifUndefined = (prop: any, def: any) => prop === undefined ? def : prop;

/**
 * Internal hook used to extract implicity defined props to prop
 * @param {Object} props - props to extract info from (user define with __accept)
 * @param {any[]} accept - Props to include by component
 */
export const __useImplicitProps = (
    props: { __accept?: string[] },
    accept: string[] = []
) => (
    [ ...(props.__accept || []), ...accept ].reduce(
        (acc, prop) => {
            acc[prop] = props[prop];
            return acc;
        }, {}
    )
);


/**
 * useTransition hook options
 * @typedef {Object} UseTransitionType
 * @property {number} [start=10] - Delay in ms from false => true
 * @property {number} [end=10] - Delay in ms from true => false
 */

/**
 * Delayed state change
 * @param {boolean} init - Inital state
 * @param {UseTransitionType} [options={}] - Options for useTransition
 * @returns {any[]} [ state, or, and ];
 */
export const useTransition = (init: boolean = false, options: UseTransitionType = {}): any[] => {
    const [ _init, setInit ] = useState(init);
    const timer = useRef<number>();
    useEffect(() => {
        window.clearTimeout(timer.current);
        timer.current = window.setTimeout(
            () => setInit(init),
            (
                init ?
                ifUndefined(options.start, 0) :
                ifUndefined(options.end, 0)
            )
        );
    }, [ init !== _init ]);

    return [ _init, _init || init, _init && init ];
};