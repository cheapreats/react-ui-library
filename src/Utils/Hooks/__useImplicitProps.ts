export interface ImplicitPropsInterface {
    __accept?: string[];
}

/**
 * Internal hook used to extract implicity defined props to prop
 * @param {Object} props - props to extract info from (user define with __accept)
 * @param {any[]} accept - Props to include by component
 */
export const __useImplicitProps = (
    props: ImplicitPropsInterface,
    accept: string[] = [],
): object =>
    [...(props.__accept || []), ...accept].reduce((acc, prop): object => {
        acc[prop] = props[prop];
        return acc;
    }, {});
