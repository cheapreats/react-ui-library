import React from 'react';
import styled from 'styled-components';
import { position, transition } from '../mixins';
import { PRIMARY_FONT, SHADOW_RAISE_2 } from '../variables';

const Container = styled.div`
    ${ position('fixed', 'auto 0 0', 'auto', 0, 0, 0) }
    ${ transition(['transform', 'opacity']) }
    font-family: ${ PRIMARY_FONT };
    box-shadow: ${ SHADOW_RAISE_2 };
    padding: ${ ({ padding }) => padding + (typeof(padding) === 'string' ? '' : 'px') };
    background-color: white;
    ${ ({ show }) => !show ? `transform: translate3d(0, 100%, 0); opacity: 0; pointer-events: none;` : '' }
`;

export const Footnote  = ({ className, children, padding = 20, show }) => (
    <Container
        className={ className }
        padding={ padding }
        show={ show }
    >
        { children }
    </Container>
);
