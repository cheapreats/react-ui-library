import { useState, useEffect, useRef } from 'react';
const ifUndefined = (prop, def) => prop === undefined ? def : prop;


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
                ifUndefined(options.start, 10) :
                ifUndefined(options.end, 10)
            )
        );
    }, [ init !== _init ]);
    return [ _init, _init || init, _init && init ];
}