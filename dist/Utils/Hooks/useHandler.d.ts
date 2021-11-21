/**
 * React hook which extends useState to include handler
 * @param {*} init - Initial state value
 * @param {Function} effect - Side effect of handler
 * @returns {Array} - [state, handler]
 */
declare type Init = string | boolean | object | number;
export declare const useHandler: (init: Init, effect: Function) => [Init, Function, React.Dispatch<React.SetStateAction<Init>>];
export {};
