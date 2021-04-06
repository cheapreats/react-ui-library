import React, { ForwardRefExoticComponent, RefAttributes } from 'react';
import styled from 'styled-components';
import { CircleNotch } from '@styled-icons/fa-solid/CircleNotch';
import {
    Main,
    MainInterface,
    Responsive,
    ResponsiveInterface,
} from '@Utils/BaseStyles';
import { clickable, flex, position, transition } from '@Utils/Mixins';
import { useTransition } from '@Utils/Hooks';

export interface ButtonProps
    extends MainInterface,
        ResponsiveInterface,
        React.HTMLAttributes<HTMLButtonElement> {
    icon?: React.ForwardRefExoticComponent<React.RefAttributes<SVGSVGElement>>;
    iconSize?: string;
    contentColor?: string;
    color?: string;
    primary?: boolean;
    loading?: boolean;
    full?: boolean;
    onClick?: React.MouseEventHandler;
    disabled?: boolean;
}

/**
 * A CheaprEats Button with Loading Capability
 * @param children
 * @param icon
 * @param loading
 * @param disabled
 * @param props
 * @param color - use Hex Code or themeColor for hover functionality
 * @param contentColor
 * @constructor
 */
export const Button: React.FC<ButtonProps> = ({
    children,
    icon,
    iconSize = '14px',
    loading,
    disabled,
    ...props
}): React.ReactElement => {
    const [, isLoading, isAnimated] = useTransition(loading);
    return (
        <StyledButton {...props} disabled={disabled}>
            {icon && (
                <Icon
                    iconSize={iconSize}
                    loading={isAnimated}
                    as={icon}
                    hasText={children}
                />
            )}
            {children && <Content loading={isAnimated}>{children}</Content>}
            {isLoading && <Loader loading={isAnimated} />}
        </StyledButton>
    );
};

const StyledButton = styled.button<ButtonProps>`
    // Base Styles
    ${transition(['background-color', 'opacity'])}
    ${Responsive}

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
    ${({
        theme,
        color = 'background',
        contentColor = 'text',
        ...props
    }): string => `
        padding: ${theme.dimensions.padding.withBorder};
        font-family: ${theme.font.family};
        background-color: ${theme.colors[color] || color};
        color: ${theme.colors[contentColor] || contentColor};
        ${clickable(theme.colors[color] || color)}
        ${Main({
            padding: theme.dimensions.padding.withBorder,
            ...props,
        })}
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

interface IconProps {
    hasText?: React.ReactNode;
    loading: boolean;
    iconSize: string;
    as: ForwardRefExoticComponent<RefAttributes<SVGSVGElement>>;
}

const Icon = styled.svg<IconProps>`
    ${transition(['transform', 'opacity'])};
    ${({ iconSize }) => `
        height: ${iconSize};
        width: ${iconSize};
    `}
    margin-right: ${({ hasText }): number => (hasText ? 8 : 0)}px;
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

const Content = styled.span<{ loading: boolean }>`
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

const Loader = styled(CircleNotch)<{ loading: boolean }>`
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
