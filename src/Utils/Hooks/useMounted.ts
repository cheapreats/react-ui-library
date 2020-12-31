import { useRef, useEffect } from 'react';

export const useMounted = (): React.MutableRefObject<boolean | undefined> => {
    const isMounted = useRef<boolean>();
    useEffect(() => {
        isMounted.current = true;
        return () => {
            isMounted.current = false;
        };
    }, []);
    return isMounted;
};