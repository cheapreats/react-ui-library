import React                                          from 'react';
import styled, {css}                                  from 'styled-components';
import PropTypes                                      from 'prop-types';
import {PRIMARY_COLOUR, PRIMARY_FONT, SHADOW_RAISE_1} from "../variables";


const ButtonWrapper = styled.button`
    color: ${props => props.primary ? "white" : PRIMARY_COLOUR};
    background-color: ${props => props.primary ? PRIMARY_COLOUR : "transparent"};
    ${({flat}) => flat ? '': `box-shadow: ${SHADOW_RAISE_1};`};
    ${({primary}) => primary ? "transition: background-color ease 0.3s" : ''};
    ${({size}) => size? `
        font-size: ${size}px;
        padding: ${10 * size / 14}px ${20 * size / 14}px;
    `: `
        font-size: 0.9rem;
        padding: 10px 20px;   
    `}
    font-family: ${PRIMARY_FONT};
    border-radius: 999px;
    font-weight: bold;
    border: none;
    outline: none;
    cursor: pointer;
    
    ${({ disabled }) => !disabled ? css`
        &:hover {
            background-color: ${props => props.primary ? "#B22330" : "transparent"};
        }
        &:active {
            background-color: ${props => props.primary ? "#6C121A" : "transparent"};
        }
    `: `opacity: 0.7;`}
`;

const styledIcon = icon => styled(icon)`
    ${({size}) => size? `
        width: ${ 12 * size / 14 }px;
    `: `
        width: 12px;
    `
    }
    height: auto;
    margin-right: 6px;
`;

export const Button = ({
    primary,
    flat,
    text,
    onClick,
    icon,
    size,
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
            size={size}
            onClick={onClick}
            disabled={disabled}
        >
            { Icon? <Icon size={size}/>: null }{text? text: children}
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
    /** In pixels, defaults to 0.9rem */
    size: PropTypes.number,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    className: PropTypes.string,
    children: PropTypes.node
};
