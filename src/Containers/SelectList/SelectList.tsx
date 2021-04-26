import React, {
    useState,
    useCallback,
    useMemo,
    Children,
    useLayoutEffect,
    useRef,
    isValidElement,
    RefObject,
} from 'react';
import styled from 'styled-components';
import { scroll, position, transition, clickable, darken } from '@Utils/Mixins';

import { LabelLayoutProps } from '@Layouts';
import { useTransition } from '@Utils/Hooks';

const REVERSE = '-1';

export interface SelectSearchBarProps extends LabelLayoutProps {
    value?: string | number;
    onChange?: Function;
    limit: number;
    expanded: boolean;
    inputValue?: string;
}

export const SelectList: React.FC<SelectSearchBarProps> = ({
    children,
    limit,
    expanded,
    inputValue,
    onChange = (): void => undefined,
    name,
}): React.ReactElement => {
    const refSelectList = useRef() as RefObject<HTMLDivElement>;
    const [numVisibleSelection, setNumVisibleSelection] = useState(0);
    const [animation] = useTransition(expanded);

    useLayoutEffect((): void | (() => void) => {
        if (refSelectList.current?.children.length) {
            setNumVisibleSelection(refSelectList.current.children.length);
        } else {
            setNumVisibleSelection(0);
        }
    }, [expanded]);

    const createList = (
        thechildren: React.ReactNode[],
        onSelect: React.MouseEventHandler,
        value?: string | number,
    ): React.ReactNode[] =>
        thechildren.map((child): React.ReactElement | null => {
            if (!inputValue) {
                if (child && isValidElement(child)) {
                    const val = child.props.value;
                    const selected = String(value) === val;
                    return (
                        <SelectItem
                            {...child.props}
                            active={selected}
                            onClick={onSelect}
                            key={val as string}
                            order="1"
                        />
                    );
                }
            } else if (
                child &&
                isValidElement(child) &&
                inputValue &&
                child.props.children
                    .toLowerCase()
                    .search(inputValue.toLowerCase()) > -1
            ) {
                const val = child.props.value;
                const selected = String(value) === val;
                const order = child.props.children
                    .toLowerCase()
                    .startsWith(inputValue.toLowerCase())
                    ? REVERSE
                    : '1';
                return (
                    <SelectItem
                        {...child.props}
                        active={selected}
                        onClick={onSelect}
                        key={val as string}
                        order={order as string}
                    />
                );
            }

            return null;
        });

    const onSelect = useCallback(
        ({ currentTarget }): void => {
            onChange({
                target: {
                    value: currentTarget.getAttribute('value'),
                    name: currentTarget.firstChild.nodeValue,
                },
            });
            inputValue = currentTarget.firstChild.nodeValue;
        },
        [name],
    );

    const options = useMemo(
        (): React.ReactNode[] => Children.toArray(children),
        [expanded],
    );

    return (
        <List
            ref={refSelectList}
            limit={Math.min(numVisibleSelection, limit)}
            expanded={animation}
        >
            {createList(options, onSelect)}
        </List>
    );
};

const List = styled.div<{
    expanded: boolean;
    limit: number;
}>`
    ${position('absolute', '0 0 20px')}
    ${scroll}
    background-color: white;
    list-style-type: none;
    appearance: none;
    overflow: auto;
    z-index: 900;
    padding: 0;
    display: flex;
    flex-direction: column;
    // Theme Stuff
    ${({ theme }): string => `
        border-radius: ${theme.dimensions.radius};
        box-shadow: ${theme.depth[1]};
    `}

    ${({ expanded, limit, theme }): string =>
        expanded
            ? `
        height: ${limit * theme.dimensions.select.itemHeight}px;
        opacity: 1;
        top:42px;
    `
            : `
        pointer-events: none;
        height: 0px;
        opacity: 0;
    `}
`;

interface SelectItemProps {
    active?: boolean;
    order: string;
}

const SelectItem = styled.p<SelectItemProps>`
    ${transition(['background-color'])}
    font-size: 0.85rem;
    font-weight: bold;
    cursor: pointer;
    margin: 0;

    order: ${({ order }): string => order};
    // Theme Stuff
    ${({ theme, active }): string => `
        padding: ${theme.dimensions.padding.default};
        ${
            active
                ? ` background-color: ${darken('#ffffff', 0.05)} `
                : clickable('#ffffff', 0.03)
        }
    `}
`;

export default SelectList;
