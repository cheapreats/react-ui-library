import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { PRIMARY_COLOUR } from '../variables';

const Container = styled.div`
    overflow: hidden;
    position: relative;
    border-radius: 999px;
    ${({ size }) => `
        width: ${ size * 1.1 }px;
        height: ${ size * 1.1 }px;
    `}
`;

const Cover = styled.div`
    border-radius: 999px;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    transition:
        border-color 300ms ease-in-out,
        opacity 300ms ease-in-out
    ;
    ${({ size }) => `
        border: ${ size / 12 }px solid #e6e6e6;
    `}

    &::after {
        content: '';
        border-radius: 999px;
        ${({ size }) => `
            height: calc(100% - ${ size / 5 }px);
            width: calc(100% - ${ size / 5 }px);
        `}

        background-color: #e6e6e6;
        transform: translate3d(0,0,0) scale(0);
        opacity: 0;

        transition:
            background-color 300ms ease-in-out,
            transform 300ms ease-in-out,
            opacity 300ms ease-in-out
        ;
    }
`;

const Check = styled.input`
    width: 100%;
    height: 100%;
    opacity: 0;
    margin: 0;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 1;
    position: absolute;

    &:checked ~ div {
        border-color: ${ PRIMARY_COLOUR };
        &::after {
            background-color: ${ PRIMARY_COLOUR };
            transform: translate3d(0,0,0) scale(1);
            opacity: 1;
        }
    }

    &:disabled ~ div {
        opacity: 0.7;
    }
`;

export class Radio extends Component {

    state = { value: this.props.value }
    toggleState = () => this.setState(({ value }) => ({ value: !value }))

    render() {
        const { value } = this.state;
        const { className, size = 25, onChange, name, disabled } = this.props;
        return (
            <Container size={size} disabled={disabled} className={className}>
                <Check
                    name={name}
                    type='checkbox'
                    value={value}
                    onChange={onChange}
                    onClick={onChange? this.toggleState: null}
                    disabled={disabled}
                />
                <Cover size={size}/>
            </Container>
        );
    }
};

Radio.propTypes = {
    className: PropTypes.string,
    size: PropTypes.number,
    onChange: PropTypes.func,
    name: PropTypes.string.isRequired,
    value: PropTypes.bool,
    disabled: PropTypes.bool
};