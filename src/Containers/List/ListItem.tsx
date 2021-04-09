import React from 'react';
import styled from 'styled-components';
import { Main } from '../../Utils/BaseStyles';
import { Mixins } from '../../Utils';

interface ListItemProps
    extends Omit<React.HTMLAttributes<HTMLLIElement>, 'onClick'> {
    onClick?: (event: React.MouseEvent<Element, MouseEvent>) => void;
    padding?: string;
    setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
    isSelected?: boolean;
}

export const ListItem: React.FC<ListItemProps> = ({
    children,
    onClick,
    padding = '16px 20px',
    setIsOpen,
    isSelected,
    ...props
}): React.ReactElement => (
    <Item
        onClick={(el): void => {
            if (setIsOpen) setIsOpen(false);
            if (onClick) onClick(el);
        }}
        padding={padding}
        isSelected={isSelected}
        {...props}
    >
        {children}
    </Item>
);

interface ItemProps {
    padding?: string;
    isSelected?: boolean;
}

const Item = styled.li<ItemProps>`
    ${Mixins.transition(['background-color'])}

    ${({ padding, ...props }): string => Main({ padding, ...props })}
    ${({ theme, isSelected }): string => `
        border-bottom: 2px solid ${theme.colors.text}20;
        ${
            isSelected
                ? `background-color: ${Mixins.darken('#ffffff', 0.05)}`
                : Mixins.clickable('#ffffff', 0.05)
        };
    `}
    &:last-child {
        border-bottom: none;
    }
`;
