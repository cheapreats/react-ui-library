import React from 'react';
import { CircleNotch } from 'styled-icons/fa-solid/CircleNotch';
import { Main, Responsive } from '@Utils/BaseStyles';
import { transition, clickable, position, flex } from '@Utils/Mixins';
import { useTransition } from '@Utils/Hooks';
import styled from 'styled-components';

export interface ButtonProps {
    children?: React.ReactNode;
    icon?: React.ForwardRefExoticComponent<React.RefAttributes<SVGSVGElement>>;
    loading?: boolean;
    onClick?: (el: React.SyntheticEvent) => void;
}

export const Button: React.FunctionComponent<ButtonProps> = ({
    children,
    icon,
    loading,
    ...props
}): React.ReactElement => {
    const [, isLoading, isAnimated] = useTransition(loading);
    return (
        <StyledButton {...props}>
            {icon && <Icon loading={isAnimated} as={icon} hasText={children} />}
            {children && <Content loading={isAnimated}>{children}</Content>}
            {isLoading && <Loader loading={isAnimated} />}
        </StyledButton>
    );
};

const StyledButton = styled.button`
    // Base Styles
    ${transition(['background-color', 'opacity'])}
    ${Responsive}
    ${Main}

    ${flex('center')}
    border: 1.5px solid rgba(0,0,0,0.1);
    background: transparent;
    border-radius: 999px;
    font-size: 0.95rem;
    position: relative;
    font-weight: bold;
    overflow: hidden;
    cursor: pointer;
    outline: none;

    &:disabled {
        cursor: not-allowed;
        opacity: 0.6;
    }

    // Theme Stuff
    ${({ theme }): string => `
        padding: ${theme.dimensions.padding.withBorder};
        font-family: ${theme.font.family};
        color: ${theme.colors.text};
        ${clickable('#ffffff', 0.05)}
    `}

    // Primary button
    ${({ primary, theme }): string =>
        primary
            ? `
        background-color: ${theme.colors.primary};
        color: white;
        ${clickable(theme.colors.primary)}
    `
            : ''}

    // Full width
    ${({ full }): string => (full ? 'width: 100%;' : '')}
`;

const Icon = styled.svg`
    ${transition(['transform', 'opacity'])}
    width: 14px;
    height: 14px;
    margin-right: ${({hasText}) => hasText ? 8 : 0}px;
    ${({ loading }): string =>
        loading
            ? `
        transform: translate3d(0,80%,0);
        opacity: 0;
    `
            : `
        transform: translate3d(0,0,0);
        opacity: 1;
    `}
`;

const Content = styled.span`
    ${transition(['transform', 'opacity'])}
    ${({ loading }): string =>
        loading
            ? `
        transform: translate3d(0,80%,0);
        opacity: 0;
    `
            : `
        transform: translate3d(0,0,0);
        opacity: 1;
    `}
`;

const Loader = styled(CircleNotch)`
    ${transition(['opacity'])}
    ${position()}

    animation: spin 1s linear 0s infinite;
    height: 14px;
    width: 14px;
    opacity: 0;

    @keyframes spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }

    ${({ loading }): string =>
        loading
            ? `
        opacity: 1;
    `
            : ''}
`;

export default Button;
