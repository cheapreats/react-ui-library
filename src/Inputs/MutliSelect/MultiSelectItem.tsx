import React, { useContext } from 'react';
import styled from 'styled-components';
import { transition, flex, clickable } from '../../Utils/Mixins';
import { MultiSelectContext } from './MultiSelectContext';
import { Button, ButtonProps } from '../Button';

export interface MultiSelectItemProps extends ButtonProps {
    columns: string | number;
}

export const MultiSelectItem: React.FC<MultiSelectItemProps> = ({
    children,
    ...props
}): React.ReactElement => {
    const columns = useContext(MultiSelectContext);
    return (
        // @ts-ignore
        <Container columns={columns} {...props}>
            {children}
        </Container>
    );
};

const Container = styled(Button)<{
    columns: string | number;
}>`
    ${transition(['background-color', 'color', 'box-shadow'])}
    ${flex('flex-start', 'center')}
    ${({ theme }): string => `
        box-shadow: ${theme.depth[1]};
        border-radius: ${theme.dimensions.radius};
        background-color: ${theme.colors.input.default};
        margin: ${theme.dimensions.multiSelect.spacing}px;
        ${clickable(theme.colors.input.default, 0.03)}
    `}

    ${({ theme, columns }): string => `
        max-width: calc(${100 / parseInt(columns.toString(), 10)}% - ${theme
        .dimensions.multiSelect.spacing * 2}px);
    `}
    border: none;
    width: 100%;
`;
