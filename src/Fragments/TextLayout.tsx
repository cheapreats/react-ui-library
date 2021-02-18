import React from 'react';
import styled from 'styled-components';
import {
    Main,
    MainInterface,
    Responsive,
    ResponsiveInterface,
} from '../Utils/BaseStyles';

export interface TextLayoutProps
    extends MainInterface,
        ResponsiveInterface,
        React.HTMLAttributes<HTMLParagraphElement> {
    color?: string;
    lineHeight?: number | string;
    bold?: boolean;
    size?: string;
    type?: string;
    textAlign?: string;
}

export const TextLayout: React.FC<TextLayoutProps> = ({
    children,
    color = 'text',
    size = 'default',
    type,
    ...props
}): React.ReactElement => (
    <Text as={type as 'span'} size={size} color={color} {...props}>
        {children}
    </Text>
);

const Text = styled.p<TextLayoutProps>`
    // Base Styles
    ${Responsive}
    ${Main}

    ${({
        theme,
        bold,
        lineHeight,
        color = 'text',
        size = 'default',
        textAlign = 'left',
    }): string => `
        color: ${theme.colors[color] || color};
        font-size: ${theme.font.size[size] || size};
        line-height: ${lineHeight || theme.font.lineHeight};
        font-weight: ${bold ? 'bold' : 'normal'};
        text-align:${textAlign};
    `}
`;
