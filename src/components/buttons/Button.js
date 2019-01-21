import React                                          from 'react';
import styled, {css}                                  from 'styled-components';
import PropTypes                                      from 'prop-types';
import {PRIMARY_COLOUR, PRIMARY_FONT, SHADOW_RAISE_1} from "../variables";


const ButtonWrapper = styled.button`
    color: ${props => props.primary ? "white" : PRIMARY_COLOUR};
    background-color: ${props => props.primary ? PRIMARY_COLOUR : "transparent"};
    ${({flat}) => flat ? '': `box-shadow: 0 1px 3px rgba(0,0,0,0.2);`};
    ${({primary}) => primary ? "transition: all ease 0.3s" : ''};
    font-family: ${PRIMARY_FONT};
    border-radius: 30px;
    font-weight: bold;
    padding: 10px 20px;
    border: none;
    outline: none;
    cursor: pointer;
    
    ${({ disabled }) => !disabled ? css`
        &:hover {
            background-color: ${props => props.primary ? "#B22330" : "transparent"};
            transition: ${props => props.primary ? "all ease 0.3s" : "none"};
        }
        &:active {
            background-color: ${props => props.primary ? "#6C121A" : "transparent"};
            transition: ${props => props.primary ? "all ease 0.3s" : "none"};
        }
    `: `opacity: 0.7;`}
`;

const styledIcon = icon => styled(icon)`
    width: 12px;
    height: auto;
    margin-right: 6px;
`;

export const Button = ({
    primary,
    flat,
    text,
    onClick,
    icon,
    disabled,
    className,
    children
}) => {
    const Icon = icon? styledIcon(icon): null;
    return (
        <ButtonWrapper
            className={className}
            primary={primary}
            flat={flat}
            onClick={onClick}
            disabled={disabled}
        >
            { Icon? <Icon/>: null }{text? text: children}
        </ButtonWrapper>
    );
}

Button.propTypes = {
    primary: PropTypes.bool,
    flat: PropTypes.bool,
    /** Highly recommend using styled-icons for SC or any other <svg/> */
    icon: PropTypes.object,
    /** Children can also be used, (However this attribute takes priority) */
    text: PropTypes.node,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    className: PropTypes.string,
    children: PropTypes.node
};
