import styled from 'styled-components';
import { PRIMARY_COLOUR, PRIMARY_FONT } from '../variables';

export const Link = styled.a`
    color: ${ PRIMARY_COLOUR };
    font-family: ${ PRIMARY_FONT };
    text-decoration: none;
    padding: 0 1px 2px;
    margin: 0 -1px -2px;
    position: relative;

    &::after {
        content: '';
        width: 100%;
        position: absolute;
        margin: auto 0 0;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        transform-origin: left;
        border-bottom: 1px solid ${ PRIMARY_COLOUR };
        transform: translate3d(0,0,0) scaleX(0);
        transition: transform 250ms ease-in-out;
    }

    &:hover::after {
        transform: translate3d(0,0,0) scaleX(1);
    }

    &:active::after {
        transform: translate3d(0,2px,0) scaleX(1);
    }
`;