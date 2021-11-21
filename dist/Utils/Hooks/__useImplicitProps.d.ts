export interface ImplicitPropsInterface {
    __accept?: string[];
}
/**
 * Internal hook used to extract implicity defined props to prop
 * @param {Object} props - props to extract info from (user define with __accept)
 * @param {any[]} accept - Props to include by component
 */
export declare const __useImplicitProps: (props: ImplicitPropsInterface, accept?: string[]) => object;
