import { useState, useEffect, useRef } from 'react';
const ifUndefined = (prop, def) => prop === undefined ? def : prop;

/**
 * Internal hook used to extract implicity defined props to prop
 * @param {Object} props - props to extract info from (user define with __accept)
 * @param {any[]} accept - Props to include by component
 */
export const __useImplicitProps = (props, accept = []) => (
    [ ...(props.__accept || []), ...accept ].reduce(
        (acc, prop) => {
            acc[prop] = props[prop];
            return acc;
        }, {}
    )
);


/**
 * useTransition hook options
 * @typedef {Object} useTransitionOptions
 * @property {number} [start=10] - Delay in ms from false => true
 * @property {number} [end=10] - Delay in ms from true => false
 */

/**
 * Delayed state change
 * @param {boolean} init - Inital state
 * @param {useTransitionOptions} [options={}] - Options for useTransition
 * @returns {any[]} [ state, or, and ];
 */
export const useTransition = (init = false, options = {}) => {
    const [ _init, setInit ] = useState(init);
    const timer = useRef();
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
}