import { useState, useCallback, useRef } from 'react';

/**
 * Delayed state change
 * @param {boolean} init - Inital state
 * @param {number} start - Delay in ms for false -> true
 * @param {number} end - Delay in ms for true -> false
 * @returns {any[]} [ state, setState, ready ];
 */
export const useTransition = (init = false, start, end) => {
    const [ ready, setReady ] = useState(true);
    const _state = useRef(init);

    const setState = useCallback(state => {
        if (ready) {
            setReady(false);
            window.setTimeout(() => {
                _state.current = state;
                setReady(true);
            }, state ? start : end);
        }
    }, [ _state.current, start, end ]);

    return [ _state.current, setState, ready ];
}