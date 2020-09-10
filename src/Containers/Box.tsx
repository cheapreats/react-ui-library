import React from 'react';
import styled from 'styled-components';

export interface BoxProps {
    text?: string;
    align?: string;
    selected?: boolean;
    children?: React.ReactNode;
    padding?: string;
    margin?: string;
    bold?: boolean;
    size: string;
}

export const Box: React.FC<BoxProps> = ({
    text,
    children,
    size = 'default',
    ...props
}): React.ReactElement => {
    return (
        <BoxDiv {...props} size={size}>
            {text}
            {children}
        </BoxDiv>
    );
};

const BoxDiv = styled.div<BoxProps>`
    ${({ theme, ...props }): string => `
        box-shadow: ${theme.depth[2]};
        border-radius: ${theme.dimensions.radius};
        background-color: ${props.selected && theme.colors.primary};
        color: ${props.selected && theme.colors.background};
        padding: ${props.padding || theme.dimensions.padding.default};
        text-align: ${props.align || 'center'};
        margin: ${props.margin};
        font-weight: ${props.bold && 'bold'};
        font-size: ${theme.font.size[props.size] || props.size};
`};
`;
