import React, {
    useState,
    useEffect,
    useCallback,
    useMemo,
    Children,
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

import { Search } from 'styled-icons/fa-solid';
import styled from 'styled-components';

const NUM_VISIBLE_SELECTIONS = 3;

export interface SearchBarProps extends LabelLayoutProps {
    suggestiveOptions?: string[];
    value?: string | number;
    onChange?: Function;
    limit?: number;
    numVisible: number;
}

export const SearchBar: React.FC<SearchBarProps> = ({
    suggestiveOptions,
    value,
    limit = 4,
    onChange = (): void => {},
    name,
    numVisible = NUM_VISIBLE_SELECTIONS,
    ...props
}): React.ReactElement => {
    const [expanded, setExpanded] = useState(false);
    const [inputValue, setinputValue] = useState('');
    const [, mount, animation] = useTransition(expanded);

    const createList = (
        children: string[],
        onSelect: React.MouseEventHandler,
    ): React.ReactNode[] =>
        children.map((child): React.ReactElement | null => {
            if (!inputValue) {
                if (child) {
                    const val = child;
                    const selected = String(value) === val;
                    return (
                        <SelectItem
                            active={selected}
                            onClick={onSelect}
                            key={val as string}
                            order="1"
                        >
                            {child}
                        </SelectItem>
                    );
                }
            } else if (
                child &&
                inputValue &&
                child.toLowerCase().search(inputValue.toLowerCase()) > -1
            ) {
                const val = child;
                const selected = String(value) === val;
                const order = child
                    .toLowerCase()
                    .startsWith(inputValue.toLowerCase())
                    ? '-1'
                    : '1';
                return (
                    <SelectItem
                        {...child}
                        active={selected}
                        onClick={onSelect}
                        key={val as string}
                        order={order as string}
                    >
                        {child}
                    </SelectItem>
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

    const options = useMemo((): any[] => {
        return Children.toArray(suggestiveOptions);
    }, [expanded]);

    useEffect((): void | (() => void) => {
        let isMounted = true;
        if (expanded) {
            const listener = (): void => {
                if (isMounted) {
                    setExpanded(false);
                }
            };

            const timerforkeydown = window.setTimeout((): void => {
                window.addEventListener('keydown', listener, { once: true });
            }, 10);
            const timerforclick = window.setTimeout((): void => {
                window.addEventListener('click', listener, { once: true });
            }, 10);
            return (): void => {
                isMounted = false;
                window.clearTimeout(timerforkeydown);
                window.clearTimeout(timerforclick);
                window.removeEventListener('keydown', listener);
                window.removeEventListener('click', listener);
            };
        }
        // eslint-disable-next-line no-return-assign
        return (): false => (isMounted = false);
    }, [expanded]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setinputValue(event.currentTarget.value);
        setExpanded(true);
    };

    return (
        <LabelLayout>
            <Container>
                <Icon as={Search} />
                <InputFragment
                    value={inputValue}
                    {...props}
                    onChange={(e): void => handleChange(e)}
                />
                {mount && (
                    <SelectList
                        limit={Math.min(numVisible, limit)}
                        expanded={animation}
                    >
                        {createList(options, onSelect)}
                    </SelectList>
                )}
            </Container>
        </LabelLayout>
    );
};

const Icon = styled.svg`
    width: 20px;
    height: 30px;
    position: relative;
    left: -37px;
    top: 6px;
`;
const InputFragment = styled(I)`
    flex-grow: 2;
`;

const Container = styled.div`
    ${flex('column')}
    flex-direction: row-reverse;
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
