import * as React from "react";
import styled from 'styled-components';
import { Main, Responsive } from '@Utils/BaseStyles';

export interface TextLayoutProps {
    color?: string,
    size?: string,
    children?: React.ReactNode,
    className?: string
}

const TextLayout = ({
    children,
    color = 'text',
    size = 'default',
    ...props
}: TextLayoutProps) => {
    return (
        <Text
            size={ size }
            color={ color }
            { ...props }
        >
            { children }
        </Text>
    );
};

export default TextLayout;

const Text = styled.p`
    // Base Styles
    ${ Responsive }
    ${ Main }

    ${({ theme, color, lineHeight, size, bold }) => `
        color: ${ theme.colors[color] || color };
        font-size: ${ theme.font.size[size] || size };
        line-height: ${ lineHeight || theme.font.lineHeight };
        font-weight: ${ bold ? 'bold' : 'normal' };
    `}
`;
