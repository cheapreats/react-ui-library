import { useState, useRef } from 'react';

/**
 * Delayed state change
 * @param {boolean} init - Inital state
 * @param {number} start - Delay in ms for false -> true
 * @param {number} end - Delay in ms for true -> false
 * @returns {any[]} [ state, setState, ready ];
 */
export const useTransition = (init = false, start = 0, end = 0) => {
    const [ _init, setInit ] = useState(init);
    const timer = useRef();
    useEffect(() => {
        window.clearTimeout(timer.current);
        timer.current = window.setTimeout(
            () => setInit(init), init ? start : end
        );
    }, [ init !== _init ]);
    return _init;
}