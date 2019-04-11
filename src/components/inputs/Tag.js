import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Times } from 'styled-icons/fa-solid/Times';
import { flex, transition } from '../mixins';
import { PRIMARY_FONT, PRIMARY_COLOUR } from '../variables';
import { TextLayoutProps } from '../_helpers/TextLayout';

const Container = styled.span.attrs(({ data }) => ({ data }))`
    color: #b1b1b1;
    cursor: pointer;
    border-radius: 999px;

    &:hover svg {
        margin-right: 0;
        transform: scale(1) translate3d(0,0,0);
    }

    ${
        ({ size }) => `
            border: ${ 2 * size}px solid #b1b1b1;
            padding: ${ 7 * size }px ${ 12 * size }px;
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
    ${ ({ disabled }) => disabled && 'pointer-events: none;' }
    font-family: ${ PRIMARY_FONT };
    line-height: ${ ({ lineHeight }) => lineHeight };
    font-weight: ${ ({ bold }) => bold ? 'bold' : 'normal' };
    margin: ${ ({ margin }) => margin + (typeof(margin) === 'string' ? '' : 'px') };
    display: inline-flex;
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
    pointer-events: none;
    transform: scale(0) translate3d(0,0,0);
    ${ transition(['transform', 'margin-right']) }
`;

export const Tag = ({
    className,
    margin = 0,
    bold = true,
    text,
    children,

    onClick,
    active,
    icon = Times,
    data,
    disabled,
    size = 1
}) => (
    <Container
        className={ className }
        margin={ margin }
        lineHeight='1'
        bold={ bold }
        size={ size }
        data={ data }
        onClick={ onClick }
        active={ active }
        disabled={ disabled }
    >
        { text || children }
        <StyledIcon as={ icon } size={ size }/>
    </Container>
);

Tag.propTypes = {
    ...TextLayoutProps,
    onClick: PropTypes.func,
    active: PropTypes.bool,
    icon: PropTypes.object,
    data: PropTypes.any,
    size: PropTypes.number
}