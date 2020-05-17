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
import {
    flex,
    scroll,
    position,
    transition,
    clickable,
    darken,
} from '@Utils/Mixins';

import { LabelLayout, InputFragment as I, LabelLayoutProps } from '@Layouts';
import { useTransition } from '@Utils/Hooks';

import { Search } from 'styled-icons/fa-solid/Search';
import styled from 'styled-components';

const MAX_VIEWING_LIMIT = 4;
const REVERSE = '-1';

export interface SearchBarProps extends LabelLayoutProps {
    value?: string | number;
    onChange?: Function;
    onInput?: Function;
    limit?: number;
    placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
    children,
    limit = MAX_VIEWING_LIMIT,
    onChange = (): void => {},
    onInput = (): void => {},
    name,
    placeholder,
    ...props
}): React.ReactElement => {
    const [expanded, setExpanded] = useState(false);
    const [inputValue, setinputValue] = useState('');
    const [, mount, animation] = useTransition(expanded);
    const refSelectList = useRef() as RefObject<HTMLDivElement>;
    const [numVisibleSelection, setNumVisibleSelection] = useState(limit);

    const createList = (
        children: React.ReactNode[],
        onSelect: React.MouseEventHandler,
        value?: string | number,
    ): React.ReactNode[] =>
        children.map((child): React.ReactElement | null => {
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
                    name,
                },
            });
            setinputValue(currentTarget.firstChild.nodeValue);
        },
        [name],
    );

    const options = useMemo((): any => {
        return Children.toArray(children);
    }, [expanded]);

    useLayoutEffect((): void | (() => void) => {
        if (refSelectList.current?.children.length) {
            setNumVisibleSelection(refSelectList.current.children.length);
        } else {
            setNumVisibleSelection(0);
        }

        const listener = (): void => {
            setExpanded(false);
        };

        window.addEventListener('keydown', listener, { once: true });
        window.addEventListener('click', listener, { once: true });

        return (): void => {
            window.removeEventListener('keydown', listener);
            window.removeEventListener('click', listener);
        };
    }, [expanded]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setinputValue(event.currentTarget.value);
        onInput(event.currentTarget.value);
        setExpanded(true);
    };
    return (
        <LabelLayout {...props}>
            <Container>
                <SelectDisplay>
                    <InputFragment
                        {...props}
                        value={inputValue}
                        placeholder={placeholder}
                        onChange={(e): void => handleChange(e)}
                    />
                    <Icon />
                </SelectDisplay>
                {mount && (
                    <SelectList
                        ref={refSelectList}
                        limit={Math.min(numVisibleSelection, limit)}
                        expanded={animation}
                    >
                        {createList(options, onSelect)}
                    </SelectList>
                )}
            </Container>
        </LabelLayout>
    );
};

interface SelectProps extends LabelLayoutProps {
    disabled?: boolean;
    placeholder?: string;
    value?: string | number;
    onChange?: Function;
    limit?: number;
}
const SelectDisplay = styled.p<SelectProps>`
    ${transition(['background-color', 'opacity', 'box-shadow'])}
    ${flex('flex-start', 'center')}
    font-size: 0.85rem;
    font-weight: bold;
    cursor: pointer;
    outline: none;
    border: none;
    margin: 0;
    background-color: #f5f5f5;
    border-radius: 8px;
`;

const Icon = styled(Search)`
    width: 20px;
    flex-shrink: 0;
    margin-left: auto;
`;

const InputFragment = styled(I)`
    flex-grow: 1;
    width: 100%;
    &:focus {
        box-shadow: none;
    }
`;

const Container = styled.div`
    ${flex('column')}
    flex-direction: columns;
    position: relative;
    width: 100%;
`;

const SelectList = styled.div<{
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

export default SearchBar;
