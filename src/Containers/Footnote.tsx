import React from 'react';
import styled from 'styled-components';
import { Main, Responsive } from '@Utils/BaseStyles';
import {
    flex, position, scroll, transition
} from '@Utils/Mixins';
import { useTransition } from '@Utils/Hooks';

export interface FootnoteProps {
    children?: React.ReactNode;
    show?: boolean;
}

export const Footnote: React.FunctionComponent<FootnoteProps> = ({
    children,
    show,
    ...props
}): React.ReactElement | null => {
    const [, mount, animation] = useTransition(show);
    return (
        mount && (
            <Container {...props} show={animation}>
                {children}
            </Container>
        ) || null
    );
};

const Container = styled.div`
    // Base Styles
    ${transition(['transform', 'opacity'])}
    ${position('absolute', 0, 'auto', 0, 0, 0)}
    ${Responsive}
    ${Main}

    ${flex('flex-start', 'center')}
    background-color: white;
    box-sizing: border-box;
    max-height: 100%;
    max-width: 100%;
    overflow: auto;

    ${scroll}

    ${ ({ show }): string => !show ? `
        transform: translate3d(0, 100%, 0);
        opacity: 0;
        pointer-events: none;
    ` : '' }

    // Theme Stuff
    ${({ theme }): string => `
        padding: ${theme.dimensions.padding.default};
        box-shadow: ${theme.depth[1]};
    `}
`;
