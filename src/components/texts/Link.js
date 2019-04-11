import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { PRIMARY_COLOUR, PRIMARY_FONT } from '../variables';

const StyledLink = styled.a`
    color: ${ PRIMARY_COLOUR };
    font-family: ${ PRIMARY_FONT };
    text-decoration: none;
    padding: 0 1px 2px;
    margin: 0 -1px -2px;
    position: relative;

    ${({bold}) =>  bold ? 'font-weight: bold;': ''}

    &::after, &::before {
        content: '';
        width: 100%;
        position: absolute;
        margin: auto 0 0;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
    }

    &::after {
        border-bottom: 1px dotted ${ PRIMARY_COLOUR };
    }

    &::before {
        transform-origin: left;
        border-bottom: 1px solid ${ PRIMARY_COLOUR };
        transition: transform 250ms ease-in-out;
        transform: translate3d(0,0,0) scaleX(0);
    }

    &:hover::before {
        transform: translate3d(0,0,0) scaleX(1);
    }

    &:active::before {
        transform: translate3d(0,2px,0) scaleX(1);
    }
`;

export const Link = props => <StyledLink { ...props }/>

Link.propTypes = {
    children: PropTypes.node,
    href: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    className: PropTypes.string,
    bold: PropTypes.bool
}