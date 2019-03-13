import React from 'react';
import styled from 'styled-components';
import { position, transition, scroll, flex } from '../mixins';
import { PRIMARY_FONT, SHADOW_RAISE_2 } from '../variables';

const Container = styled.div`
    ${ ({ pos, margin }) => position(pos, margin, 'auto', 0, 0, 0) }
    ${ transition(['transform', 'opacity']) }
    ${ ({ f }) => flex(...f) }
    ${ scroll }

    ${ ({ show }) => !show ? `transform: translate3d(0, 100%, 0); opacity: 0; pointer-events: none;` : '' }
    margin: ${ ({ margin }) => margin + (typeof(margin) === 'string' ? '' : 'px') };
    box-shadow: ${ SHADOW_RAISE_2 };
    font-family: ${ PRIMARY_FONT };

    background-color: white;
    box-sizing: border-box;
    max-height: 100%;
    max-width: 100%;
    overflow: auto;
    ${ ({ styles }) => styles }
`;

export const Footnote  = ({
    flex = ['row', 'flex-start', 'center'],
    position = 'absolute',
    padding = 20,
    margin = 0,
    className,
    children,
    styles,
    show
}) => (
    <Container
        className={ className }
        pos={ position }
        margin={ margin }
        padding={ padding }
        show={ show }
        styles={ styles }
        f={ flex }
    >
        { children }
    </Container>
);
