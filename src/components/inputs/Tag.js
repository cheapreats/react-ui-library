import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Times } from 'styled-icons/fa-solid/Times';
import { flex, transition } from '../mixins';
import { PRIMARY_FONT, PRIMARY_COLOUR } from '../variables';

const Container = styled.span.attrs(({ data }) => ({ data }))`
    font-family: ${ PRIMARY_FONT };
    color: #b1b1b1;
    cursor: pointer;
    border-radius: 999px;
    font-weight: bold;

    &:hover svg {
        margin-right: 0;
        transform: scale(1) translate3d(0,0,0);
    }

    ${
        ({ size }) => `
            border: ${ 2 * size}px solid #b1b1b1;
            padding: ${ 6 * size }px ${ 12 * size }px;
            font-size: ${ 0.9 * size }rem;
        `
    }
    ${ flex('flex-start', 'center') }
    ${ transition(['background-color', 'border-color', 'color']) }
    ${
        ({ active }) => active ? `
            background-color: ${ PRIMARY_COLOUR };
            border-color: ${ PRIMARY_COLOUR };
            color: white;

            &:hover {
                background-color: #c5141a;
                border-color: #c5141a;
            }
        ` : `
            &:hover {
                background-color: ${ PRIMARY_COLOUR };
                border-color: ${ PRIMARY_COLOUR };
                color: white;
            }
        `
    }
`;

const StyledIcon = styled.svg`
    ${
        ({ size }) => `
            width: ${ size * 14 }px;
            height: ${ size * 14 }px;
            margin-left: ${ size * 6 }px;
            margin-right: -${ size * 20 }px;
        `
    }

    transform: scale(0) translate3d(0,0,0);
    ${ transition(['transform', 'margin-right']) }
`;

export class Tag extends Component {
    render() {
        const { className, children, onClick, active, icon = Times, data, size = 1 } = this.props;
        return (
            <Container className={ className } size={ size } data={ data } onClick={ onClick } active={ active }>
                { children }
                <StyledIcon as={ icon } size={ size }/>
            </Container>
        )
    }
}

Tag.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    onClick: PropTypes.func,
    active: PropTypes.bool,
    icon: PropTypes.node,
    data: PropTypes.any,
    size: PropTypes.number
}