import React                                          from 'react';
import styled, {css}                                  from 'styled-components';
import PropTypes                                      from 'prop-types';
import {PRIMARY_COLOUR, PRIMARY_FONT, SHADOW_RAISE_1} from "../variables";


const ButtonWrapper = styled.button`
    color: ${props => props.primary ? "white" : PRIMARY_COLOUR};
    background-color: ${props => props.primary ? PRIMARY_COLOUR : "transparent"};
    box-shadow: ${props => props.primary ? SHADOW_RAISE_1 : "none"};
    transition: ${props => props.primary ? "all ease 0.3s" : "none"};
    padding: 10px 20px 10px 20px;
    border: none;
    border-radius: 30px;
    outline: none;
    cursor: pointer;
    ${props => !props.disabled && css`
        &:hover {
            background-color: ${props => props.primary ? "#B22330" : "transparent"};
            transition: ${props => props.primary ? "all ease 0.3s" : "none"};
        }
        &:active {
            background-color: ${props => props.primary ? "#6C121A" : "transparent"};
            transition: ${props => props.primary ? "all ease 0.3s" : "none"};
        }
    `}
    ${props => props.disabled && css`
        opacity: 0.7;
    `}
`;

const ButtonText = styled.span`
    font-family: ${PRIMARY_FONT};
    font-weight: bold;
`;

export const Button = ({
    primary,
    text,
    onClick,
    disabled
}) => {
    return (
        <ButtonWrapper primary={primary} onClick={onClick} disabled={disabled}>
            <ButtonText>
                {text}
            </ButtonText>
        </ButtonWrapper>
    );
}

Button.propTypes = {
    primary: PropTypes.bool,
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    disabled: PropTypes.bool
};
