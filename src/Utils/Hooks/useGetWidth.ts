import { useState, useRef, useEffect } from 'react';

/** 
 * gets the width of a component which extends HTMLDivElement props
 */
export const useGetWidth = (): readonly [
    number | undefined,
    React.RefObject<HTMLDivElement>,
] => {
    const [width, setWidth] = useState<number | undefined>();
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (ref.current) {
            setWidth(ref.current.getBoundingClientRect().width);
        }
    }, []);

    return [width, ref] as const;
};
