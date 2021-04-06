import React, { useCallback, useEffect, useRef } from 'react';
import styled from 'styled-components';
import {
    clickable,
    darken,
    flex,
    scroll,
    transition,
} from '../../Utils/Mixins';

interface TimeColumnProps {
    format?: (value: string | number) => string | number;
    onChange: (name?: string, value?: number) => void;
    items: (string | number)[];
    active: string | number;
    name?: string;
}

export const TimeColumn: React.FC<TimeColumnProps> = ({
    format,
    onChange,
    items,
    active,
    name,
}): React.ReactElement => {
    const ref = useRef<HTMLUListElement>(null);

    const onSelect = useCallback(
        (el): void => {
            el.stopPropagation();
            const value = parseInt(el.target.getAttribute('data-index'), 10);
            onChange(name, value);
        },
        [name, onChange],
    );

    useEffect((): void => {
        if (ref.current) {
            const index = items.findIndex((i): boolean => i === active);
            const child = ref.current.children[index] as HTMLElement;
            ref.current.scrollTo({
                top: child.offsetTop,
                behavior: 'smooth',
            });
        }
    }, [active]);

    return (
        <List ref={ref}>
            {items.map(
                (item, k): React.ReactElement => (
                    <Item
                        active={item === active}
                        onClick={onSelect}
                        data-index={k}
                        key={item}
                    >
                        {format ? format(item) : item}
                    </Item>
                ),
            )}
        </List>
    );
};

const List = styled.ul`
    ${({ theme }): string => `
        color: ${theme.colors.text}aa;
    `}
    ${scroll}
    overflow-y: scroll;
    list-style-type: none;
    font-weight: bold;
    max-width: 80px;
    flex-grow: 1;
    width: 100%;
    padding: 0;
    margin: 0;
`;

const Item = styled.li<{ active?: boolean }>`
    ${transition(['background-color', 'color'])}
    ${flex('flex-start', 'center')}
    ${({ active, theme }): string =>
        active
            ? `
        background-color: ${darken('#ffffff', 0.03)};
        color: ${theme.colors.primary}bb;
        cursor: pointer;
    `
            : clickable('#ffffff', 0.03)}
    box-sizing: border-box;
    padding: 0 15px;
    height: 40px;
    width: 100%;
`;
