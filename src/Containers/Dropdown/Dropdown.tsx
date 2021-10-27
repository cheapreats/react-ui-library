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
    useMemo,
} from 'react';
import styled from 'styled-components';
import { transition, scroll } from '../../Utils/Mixins';
import DropdownItem from './DropdownItem';

type DropdownComponent<P = {}> = React.NamedExoticComponent<P> & {
    Item: typeof DropdownItem;
};

export interface IDropdownProps extends React.HTMLAttributes<HTMLDivElement> {
    dropdownButton: React.ReactElement;
    dropdownWidth?: number;
    right?: boolean;
    startState?: boolean;
    toggleFunc?: Function;
}

interface IDropdownContentProps {
    dropdownWidth?: number;
    contentLength: number | undefined;
    placement: boolean | undefined;
    targetPositionConfig: ClientRect | {};
    sourceWidth: ClientRect | {};
    ref: React.RefObject<HTMLUListElement>;
}

interface IDropdownContainerProps {
    width?: number;
    height: number;
}

const EXTRA_HEIGHT = 20;
const PADDING = 20;
const MAX_DROPDOWN_HEIGHT = 300;

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

const Dropdown: React.FC<IDropdownProps> = ({
    dropdownButton,
    dropdownWidth,
    children,
    right,
    toggleFunc,
    startState,
    ...props
}): ReactElement => {
    const [isActive, setIsActive] = useState(false);
    const [height, setHeight] = useState(0);
    const buttonRef = useRef<HTMLDivElement>(null);
    const [buttonPositionConfig, setButtonPositionConfig] = useState({});
    const [dropDownPositionConfig, setDropDownPositionConfig] = useState({});
    const bodyRef = useRef<HTMLUListElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    if (startState != null && startState != isActive){
        setIsActive(startState);
    }

    useClickAway(containerRef, () => setIsActive(false));
    const toggleIsActive = (): void => {
        setIsActive(!isActive);
        if (toggleFunc){
            toggleFunc(!isActive);
        }
    };

    const validChild = (
        elements: ReactNode,
        targetChild: React.ElementType,
    ) => {
        const targetChildren: ReactNode[] = [];
        Children.map(elements, (element) => {
            if (!isValidElement(element)) return element;
            if (element.type === targetChild) {
                targetChildren.push(element);
                return null;
            }
            return element;
        });
        return targetChildren.length >= 0 ? targetChildren : undefined;
    };
    const itemChildren = useMemo(() => validChild(children, DropdownItem), [
        children,
    ]);
    useLayoutEffect(() => {
        const buttonRefCurrent = buttonRef.current;
        const bodyRefCurrent = bodyRef.current;
        if (buttonRefCurrent && bodyRefCurrent) {
            if (isActive) {
                setHeight(
                    bodyRefCurrent.clientHeight +
                        buttonRefCurrent.clientHeight +
                        EXTRA_HEIGHT,
                );
            } else {
                setHeight(buttonRefCurrent.clientHeight);
            }
        }
    }, [isActive]);

    const setMenuButtonPosition = () => {
        setButtonPositionConfig(
            buttonRef?.current?.getBoundingClientRect() ?? {},
        );
        setDropDownPositionConfig(
            bodyRef?.current?.getBoundingClientRect() ?? {},
        );
    };
    useEffect(() => {
        setMenuButtonPosition();
    }, []);
    const stopPropagation = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        event.nativeEvent.stopImmediatePropagation();
    };
    return (
        <DropdownContainer
            ref={containerRef}
            height={height}
            onClick={stopPropagation}
            {...props}
        >
            <ToggleContainer ref={buttonRef} onClick={toggleIsActive}>
                {dropdownButton}
            </ToggleContainer>
            <DropdownContent
                dropdownWidth={dropdownWidth}
                contentLength={itemChildren?.length}
                placement={right}
                targetPositionConfig={buttonPositionConfig}
                sourceWidth={dropDownPositionConfig}
                ref={bodyRef}
            >
                {itemChildren}
            </DropdownContent>
        </DropdownContainer>
    );
};

const placeStyles = (
    placement: any,
    targetPosition: any,
    sourcePosition: any,
) => {
    switch (placement) {
    case true:
        return `
            left: ${
    targetPosition.right - sourcePosition.width + window.pageXOffset
}px;
            `;
    default:
        return `
            left: ${targetPosition.left + window.pageXOffset}px;
            `;
    }
};

const DropdownContainer = styled.div<IDropdownContainerProps>`
    overflow: hidden;
    display: inline-block;
    position: relative;
    cursor: pointer;
    width: ${({ width }) => (width ? `${width + PADDING}px` : '100%')};
    height: ${({ height }): number => height}px;
    ${transition(['height'], '0.5s')}
`;

const ToggleContainer = styled.div`
    margin-bottom: 10px;
    display: inline-flex;
    padding: 5px 0;
    align-items: center;
`;

const DropdownContent = styled.ul<IDropdownContentProps>`
    ${({ placement, targetPositionConfig, sourceWidth }) =>
        placeStyles(placement, targetPositionConfig, sourceWidth)};
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
    max-width: ${dropdownWidth}px;
    min-width: 0;
    width: ${`${dropdownWidth}px` || 'auto'};
    box-shadow: ${theme.depth[1]};
    border-radius: ${theme.dimensions.radius};
`}
    position: absolute;
    z-index: 2147483647;
`;

export default Dropdown as DropdownComponent;
