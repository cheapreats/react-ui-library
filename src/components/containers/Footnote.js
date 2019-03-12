import React from 'react';
import styled from 'styled-components';
import { position, transition } from '../mixins';
import { PRIMARY_FONT, SHADOW_RAISE_2 } from '../variables';

const Container = styled.div`
    ${ ({ pos }) => position(pos, 'auto 0 0', 'auto', 0, 0, 0) }
    ${ transition(['transform', 'opacity']) }
    font-family: ${ PRIMARY_FONT };
    box-shadow: ${ SHADOW_RAISE_2 };
    padding: ${ ({ padding }) => padding + (typeof(padding) === 'string' ? '' : 'px') };
    margin: ${ ({ margin }) => margin + (typeof(margin) === 'string' ? '' : 'px') };
    ${ ({ show }) => !show ? `transform: translate3d(0, 100%, 0); opacity: 0; pointer-events: none;` : '' }
    background-color: white;
`;

export const Footnote  = ({ className, children, position = 'absolute', margin = 0, padding = 20, show }) => (
    <Container
        className={ className }
        pos={ position }
        margin={ margin }
        padding={ padding }
        show={ show }
    >
        { children }
    </Container>
);
