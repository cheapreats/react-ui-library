import React from 'react';
import styled, { useTheme } from 'styled-components';
import {
    Main,
    MainInterface,
    Responsive,
    ResponsiveInterface,
} from '@Utils/BaseStyles';
import { flex, position as pos, scroll, transition } from '@Utils/Mixins';
import { useTransition } from '@Utils/Hooks';

export interface FootnoteProps
    extends MainInterface,
        ResponsiveInterface,
        React.HTMLAttributes<HTMLDivElement> {
    show?: boolean;
    position?: 'absolute' | 'fixed' | 'relative';
}

export const Footnote: React.FC<FootnoteProps> = ({
    children,
    position = 'fixed',
    show,
    ...props
}): React.ReactElement | null => {
    const theme = useTheme();
    const [, mount, animation] = useTransition(show, {
        end: theme.speed.normal,
    });
    return mount ? (
        <Container {...props} show={animation} position={position}>
            {children}
        </Container>
    ) : null;
};

const Container = styled.div<FootnoteProps>`
    ${(props): string => pos(props.position, 'auto 0 0', 'auto', 0, 0, 0)}
    ${transition(['transform', 'opacity'])}
    ${flex('flex-start', 'center')}

    background-color: white;
    box-sizing: border-box;
    max-height: 100%;
    max-width: 100%;
    overflow: auto;

    ${scroll}

    ${({ show }): string =>
        !show
            ? `
        transform: translate3d(0, 100%, 0);
        opacity: 0;
        pointer-events: none;
    `
            : ''}

    // Theme Stuff
${({ theme, ...props }): string => `
    box-shadow: ${theme.depth[1]};
    ${Main({
        padding: theme.dimensions.padding.container,
        ...props,
    })}
    `}

    ${Responsive}
`;
