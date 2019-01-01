import React, {Component}                             from 'react';
import styled, {css}                                  from 'styled-components';
import PropTypes                                      from 'prop-types';
import {PRIMARY_COLOUR, PRIMARY_FONT, SHADOW_RAISE_1} from "../variables";

const ButtonWrapper = styled.button`
    background-color: ${PRIMARY_COLOUR};
    padding: 10px 20px 10px 20px;
    border: none;
    border-radius: 30px;
    box-shadow: ${SHADOW_RAISE_1};
    transition: all ease 0.3s;
    outline: none;
    ${props => !props.disabled && css`
        &:hover {
            background-color: #B22330;
            transition: all ease 0.3s;
        }
        &:active {
            background-color: #6C121A;
            transition: all ease 0.3s;
        }
    `}
    ${props => props.disabled && css`
        opacity: 0.7;
    `}
`;

const ButtonText = styled.span`
    color: white;
    font-family: ${PRIMARY_FONT};
    font-weight: bold;
`;

export const Button = ({
    text, 
    onClick, 
    disabled
}) => {
    return (
        <ButtonWrapper onClick={onClick} disabled={disabled}>
            <ButtonText>
                {text}
            </ButtonText>
        </ButtonWrapper>
    );
}

Button.propTypes = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    disabled: PropTypes.bool
};
