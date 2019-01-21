import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
    position: relative;
    overflow: hidden;
    border-radius: 999px;
    display: flex;
    ${({ size }) => `
        width: ${ size * 2 }px;
        height: ${ size }px;
    `}
`;

const Checkbox = styled.input`
    width: 100%;
    height: 200%;
    margin: 0;
    opacity: 0;
    z-index: 1;
    position: absolute;

    &:checked ~ div {
        background-color: #ED242A;
        &:after {
            ${({ size }) => `
                transform: translate3d(100%, 0, 0) translate3d(${ size / 5 }px, 0, 0);
            `}
        }
    }
`;

const Cover = styled.div`
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    position: relative;
    background-color: #e6e6e6;
    transition: 
        background-color 300ms ease-in-out,
        disabled 300ms ease-in-out 
    ;

    ${({ disabled }) => disabled ? `
        opacity: 0.7;
    `: ''}

    &:after {
        content: '';
        ${({ size }) => `
            width: calc(50% - ${ size / 5 }px);
            height: calc(100% - ${ size / 5 }px);
            margin: ${ size / 10 }px;
        `}
        border-radius: 999px;
        background-color: white;
        position: absolute;
        transform: translate3d(0,0,0);
        transition: transform 300ms ease-in-out;
    }
`;

export const Switch = ({ className, size = 26, onChange, name, value, disabled }) => {
    return (
        <Container size={size} className={className}>
            <Checkbox
                size={size}
                name={name}
                checked={value}
                type='checkbox'
                onChange={onChange}
                disabled={disabled}
            />
            <Cover size={size} disabled={disabled}/>
        </Container>
    );
};

Switch.propTypes = {
    className: PropTypes.string,
    size: PropTypes.number,
    onChange: PropTypes.func,
    name: PropTypes.string.isRequired,
    value: PropTypes.bool,
    disabled: PropTypes.bool
};