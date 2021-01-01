import React, {
    isValidElement,
    Children,
    useState,
    useLayoutEffect,
    useRef,
    MutableRefObject,
    useEffect,
    ReactElement,
    ReactNode,
} from 'react';
import styled from 'styled-components';
import { transition,scroll } from '../../Utils/Mixins';
import DropdownItem from './DropdownItem';

type DropdownComponent<P = {}> = React.NamedExoticComponent<P> & {
  Item: typeof DropdownItem
}

interface IDropdownProps {
    dropdownButton: Element;
    dropdownWidth: string;
    children: ReactNode
};

interface IDropdownContentProps {
    dropdownWidth: string;
    contentLength: number | undefined;
    ref: React.RefObject<HTMLUListElement>;
}

const EXTRA_HEIGHT = 20;
const MAX_DROPDOWN_HEIGHT = 250;

const useClickAway = (
    ref: MutableRefObject<HTMLElement | null>,
    handler: (event: Event) => void,
) => {
    useEffect(() => {
        const callback = (event: Event) => {
            const el = ref.current;
            if (!event || !el) return;
            handler(event);
        };

        document.addEventListener('click', callback);
        return () => document.removeEventListener('click', callback);
    }, [ref, handler]);
};

/**
 *
 * @param {dropdownButton} -component used to open the dropdown menu
 */

const Dropdown = ({
    dropdownButton,
    dropdownWidth,
    children,
    ...props
}: IDropdownProps): ReactElement => {
    const [isActive, setIsActive] = useState(false);
    const [height, setHeight] = useState(0);
    const buttonRef = useRef<HTMLDivElement>(null);
    const bodyRef = useRef<HTMLUListElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    
    useClickAway(containerRef, () => setIsActive(false));
    const toggleIsVisible = (): void => {
        setIsActive(!isActive);
    };

    const validChild = (elements: ReactNode, targetChild: React.ElementType) => {
        const targetChildren: ReactNode[] = [];
        Children.map(elements, (item) => {
            if (!isValidElement(item)) return item;
            if (item.type === targetChild) {
                targetChildren.push(item);
                return null;
            }
            return item;
        });
        return targetChildren.length >= 0 ? targetChildren : undefined;
    };
    const itemChildren = validChild(children, DropdownItem);
    useLayoutEffect(() => {
        const buttonRefCurrent = buttonRef.current;
        const bodyRefCurrent = bodyRef.current;
        if (buttonRefCurrent && bodyRefCurrent) {
            if (isActive) {
                setHeight(bodyRefCurrent.clientHeight + buttonRefCurrent.clientHeight + EXTRA_HEIGHT)
            } else {
                setHeight(buttonRefCurrent.clientHeight);
            }
        }
    }, [isActive]);

    const stopPropagation = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation()
        event.nativeEvent.stopImmediatePropagation()
    }

    return (
        <DropdownContainer ref={containerRef} height={height} onClick={stopPropagation} {...props}>
            <ToggleContainer ref={buttonRef} onClick={toggleIsVisible}>
                {dropdownButton}
            </ToggleContainer>
            <DropdownContent
                dropdownWidth={dropdownWidth}
                contentLength={itemChildren?.length}
                ref={bodyRef}
            >
                {itemChildren}
            </DropdownContent>
        </DropdownContainer>
    );
};

const DropdownContainer = styled.div<{ height: number }>`
    overflow: hidden;
    position: relative;
    cursor: pointer;
    height: ${({ height }): number => height}px;
    ${transition(['height'], '0.5s')}
`;

const ToggleContainer = styled.div`
    margin-bottom: 10px;
    padding: 5px 0;
    align-items: center;
`;

const DropdownContent = styled.ul<IDropdownContentProps>`
    padding: 10px 5px;
    max-height: ${MAX_DROPDOWN_HEIGHT}px;
    margin: 0;
    display: grid;
    ${scroll};
    ${({ theme, contentLength, dropdownWidth }) => `
    grid-template-rows: repeat(${contentLength}, 1fr);
    overflow-y: auto;
    row-gap: 15px;
    font-family: ${theme.font.family};
    background: ${theme.colors.background};
    max-width: ${dropdownWidth};
    width: 100%;
    box-shadow: ${theme.depth[1]};
    border-radius: ${theme.dimensions.radius};
`}
    position: absolute;
    right: 0;
    z-index: 9999;
    left: 0;
`;

export default Dropdown as DropdownComponent;
