import React                                          from 'react';
import styled, {css}                                  from 'styled-components';
import PropTypes                                      from 'prop-types';
import {PRIMARY_COLOUR, PRIMARY_FONT, SHADOW_RAISE_1} from "../variables";


const ButtonWrapper = styled.button`
    color: ${props => props.primary ? "white" : PRIMARY_COLOUR};
    background-color: ${props => props.primary ? PRIMARY_COLOUR : "transparent"};
    box-shadow: ${props => props.primary ? SHADOW_RAISE_1 : "none"};
    transition: ${props => props.primary ? "all ease 0.3s" : "none"};
    font-family: ${PRIMARY_FONT};
    font-weight: bold;
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
    ${props => props.link && css`
        background-color: transparent;
        color: ${props => props.primary ? "rgba(0, 0, 0, 0.43)" : "#EE2434"};
        border-bottom: ${props => props.primary ? "none" : "rgba(210, 29, 41, 0.58) 1px dashed"};
        display: inline-block;
        font-family: 'Quicksand', sans-serif;
        font-weight: bold;
        cursor: pointer;
        border-radius: 0px;
        padding: 0px;
    `}
`;

export const Button = ({
    primary,
    link,
    text,
    onClick,
    disabled,
    className,
    children
}) => {
    return (
        <ButtonWrapper className={className} primary={primary} link={link} onClick={onClick} disabled={disabled}>
            {text? text: children}
        </ButtonWrapper>
    );
}

Button.propTypes = {
    primary: PropTypes.bool,
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    className: PropTypes.string,
    children: PropTypes.string,
    link: PropTypes.bool
};
