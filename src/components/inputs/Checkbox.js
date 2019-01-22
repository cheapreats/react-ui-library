import React, { Component } from 'react';
import { Check as Icon } from 'styled-icons/fa-solid/Check';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { PRIMARY_COLOUR } from '../variables';

const Container = styled.div`
    overflow: hidden;
    position: relative;
    ${({ size }) => `
        border-radius: ${ size * 0.3 }px;
        width: ${ size * 1.1 }px;
        height: ${ size * 1.1 }px;
    `}
`;

const StyledIcon = styled(Icon)`
    color: white;
    opacity: 0;
    transition:
        opacity 150ms ease-in-out,
        transform 150ms ease-in-out
    ;
    transform: translate3d(0,0,0) scale(0) rotate(-45deg);
    ${({ size }) => `
        width: ${ size * 0.55 }px;
        height: ${ size * 0.55 }px;
    `}
`;

const Cover = styled.div`
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    transition:
        background-color 150ms ease-in-out,
        border-color 150ms ease-in-out
    ;
    ${({ size }) => `
        border-radius: ${ size * 0.3 }px;
        border: ${ size * 0.1 }px solid #efefef;
        width: ${ size * 1.1 }px;
        height: ${ size * 1.1 }px;
    `}
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
        background-color: ${ PRIMARY_COLOUR };
        & > svg {
            opacity: 1;
            transform: translate3d(0,0,0) scale(1) rotate(0);
        }
    }

    &:disabled ~ div {
        opacity: 0.7;
    }
`;

export class Checkbox extends Component {

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
                    checked={value}
                    onChange={onChange}
                    onClick={this.toggleState}
                    disabled={disabled}
                />
                <Cover size={size}>
                    <StyledIcon size={size}/>
                </Cover>
            </Container>
        );
    }
};

Checkbox.propTypes = {
    className: PropTypes.string,
    size: PropTypes.number,
    onChange: PropTypes.func,
    name: PropTypes.string.isRequired,
    value: PropTypes.bool,
    disabled: PropTypes.bool
};