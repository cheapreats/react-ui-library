import React from 'react';
import styled from 'styled-components';
import { Main, Responsive } from '@Utils/BaseStyles';

export interface TextLayoutProps {
    color?: string;
    size?: string;
    children?: React.ReactNode;
    type?: string;
}

export const TextLayout: React.FunctionComponent<TextLayoutProps> = ({
    children,
    color = 'text',
    size = 'default',
    type,
    ...props
}): React.ReactElement => (
    <Text as={type} size={size} color={color} {...props}>
        {children}
    </Text>
);

const Text = styled.p`
    // Base Styles
    ${Responsive}
    ${Main}

    ${({ theme, color, lineHeight, size, bold }): string => `
        color: ${theme.colors[color] || color};
        font-size: ${theme.font.size[size] || size};
        line-height: ${lineHeight || theme.font.lineHeight};
        font-weight: ${bold ? 'bold' : 'normal'};
    `}
`;
