import React from 'react';
import styled from 'styled-components';
import { Mixins } from '../../Utils';
import { Main } from '../../Utils/BaseStyles';
import { useListContext } from './ListContext';

interface ListItemProps
    extends Omit<React.HTMLAttributes<HTMLLIElement>, 'onClick'> {
    onClick?: (event: React.MouseEvent<Element, MouseEvent>) => void;
    padding?: string;
}
export const ListItem: React.FC<ListItemProps> = ({
    children,
    onClick,
    padding = '16px 20px',
    ...props
}): React.ReactElement => {
    const setShow: React.Dispatch<React.SetStateAction<
        boolean
    >> = useListContext()[1];

    return (
        <Item
            onClick={(el): void => {
                setShow(false);
                if (onClick) onClick(el);
            }}
            padding={padding}
            {...props}
        >
            {children}
        </Item>
    );
};

interface ItemProps {
    padding?: string;
}

const Item = styled.li<ItemProps>`
    ${Mixins.flex()}
    ${({ theme }): string => `
        border-bottom: 2px solid ${theme.colors.text}20;
    `}
    ${({ padding, ...props }): string => Main({ padding, ...props })}
    &:last-child {
        border-bottom: none;
    }
`;
