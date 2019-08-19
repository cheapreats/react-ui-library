import React from 'react';
import styled, { DefaultTheme, withTheme } from 'styled-components';
import {
    Main,
    MainInterface,
    Responsive,
    ResponsiveInterface,
} from '@Utils/BaseStyles';
import { flex, position as pos, scroll, transition } from '@Utils/Mixins';
import { useTransition } from '@Utils/Hooks';

export interface FootnoteProps extends MainInterface, ResponsiveInterface {
    show?: boolean;
    theme: DefaultTheme;
    position?: 'absolute' | 'fixed';
}

const _Footnote: React.FC<FootnoteProps> = ({
    children,
    position = 'fixed',
    theme,
    show,
    ...props
}): React.ReactElement | null => {
    const [, mount, animation] = useTransition(show, {
        end: theme.speed.normal,
    });
    return mount ? (
        <Container {...props} show={animation} position={position}>
            {children}
        </Container>
    ) : null;
};

export const Footnote = withTheme(_Footnote);

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
            ...props
        })}
    `}

    ${Responsive}
`;
