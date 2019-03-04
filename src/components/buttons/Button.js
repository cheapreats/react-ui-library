import React                                          from 'react';
import styled, {css}                                  from 'styled-components';
import PropTypes                                      from 'prop-types';


const ButtonWrapper = styled.button.attrs(
    props => ({ 'data-index': props['data-index'] })
)`
    color: ${({primary, black, theme}) => primary ? "white" : black ? 'black' : theme.colors.primary};
    background-color: ${({ primary, theme }) => primary ? theme.colors.primary : 'white'};
    ${({flat, theme}) => flat ? '': `box-shadow: ${theme.shadows[0]};`};
    ${({size}) => size? `
        font-size: ${size}px;
        padding: ${10 * size / 14}px ${20 * size / 14}px;
    `: `
        font-size: 0.9rem;
        padding: 10px 20px;   
    `}
    transition: background-color ease 0.3s;
    font-family: ${({ theme }) => theme.font};
    flex-shrink: 0;
    border-radius: 999px;
    font-weight: bold;
    border: none;
    outline: none;
    cursor: pointer;
    
    ${({ margin }) => `margin: ${ margin + (typeof(margin) === 'string' ? '' : 'px') };`}
    ${({ disabled }) => !disabled ? css`
        &:hover, &:focus {
            background-color: ${props => props.primary ? "#B22330" : "#f4f4f4"};
        }
        &:active {
            background-color: ${props => props.primary ? "#6C121A" : "#e8e8e8"};
        }
    `: `opacity: 0.7;`}
`;

const StyledIcon = styled.svg`
    ${({size}) => `
        width: ${ size ? 12 * size / 14 : 12 }px;
        margin-right: ${ size ? 6 * size / 14 : 6 }px;
    `}
    height: auto;
`;

export const Button = ({
    primary,
    flat,
    black,
    text,
    onClick,
    icon,
    margin = 0,
    size,
    disabled,
    className,
    children,
    onKeyDown,
    dataIndex = 0
}) => (
    <ButtonWrapper
        className={className}
        primary={primary}
        black={black}
        flat={flat}
        size={size}
        margin={margin}
        onClick={onClick}
        disabled={disabled}
        onKeyDown={ onKeyDown }
        tabIndex='0'
        data-index={ dataIndex }
    >
        { icon ? <StyledIcon as={icon} size={size}/> : null }{text ? text : children}
    </ButtonWrapper>
);

Button.propTypes = {
    primary: PropTypes.bool,
    flat: PropTypes.bool,
    /** Highly recommend using styled-icons for SC or any other <svg/> */
    icon: PropTypes.object,
    /** Children can also be used, (However this attribute takes priority) */
    text: PropTypes.node,
    /** In pixels, defaults to 0.9rem */
    size: PropTypes.number,
    margin: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    black: PropTypes.bool,
    onClick: PropTypes.func,
    onKeyPress: PropTypes.func,
    disabled: PropTypes.bool,
    className: PropTypes.string,
    children: PropTypes.node
};
