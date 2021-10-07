import React, { ForwardRefExoticComponent, RefAttributes } from 'react';
import styled from 'styled-components';
import {
    Main,
    MainInterface,
    Responsive,
    ResponsiveInterface,
} from '@Utils/BaseStyles';
import { clickable, flex, position, transition } from '@Utils/Mixins';
//import { useTransition } from '@Utils/Hooks';

export interface ButtonProps
    extends MainInterface,
        ResponsiveInterface,
        React.HTMLAttributes<HTMLButtonElement> {
    icon?: React.ForwardRefExoticComponent<React.RefAttributes<SVGSVGElement>>;
    iconSize?: string;
    contentColor?: string;
    full?: boolean;
    onClick?: React.MouseEventHandler;
    disabled?: boolean;
}

/**
 * A CheaprEats Button with Loading Capability
 * @param icon
 * @param disabled
 * @param props
 * @param contentColor
 * @constructor
 */
export const VoiceButton: React.FC<ButtonProps> = ({
                                                  icon,
                                                  iconSize = '14px',
                                                  disabled,
                                                  ...props
                                              }): React.ReactElement => {
    return (
        <StyledButton {...props} disabled={disabled}>
            {icon && (
                <Icon
                    iconSize={iconSize}
                    as={icon}
                    // hasText={children}
                />
            )}
        </StyledButton>
    );
};

const StyledButton = styled.button<ButtonProps>`
    // Base Styles
    ${transition(['background-color', 'opacity'])}
    ${Responsive}

    ${flex('center')}
    marginTop: 20
    border: 1.5px solid rgba(0,1,0,0.1);
    background: transparent;
    background-color: #ffffff
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
        ${Main({
    padding: theme.dimensions.padding.withBorder,
    ...props,
})}
    `}

    // Full width
    ${({ full }): string => (full ? 'width: 100%;' : '')}
`;

interface IconProps {
    hasText?: React.ReactNode;
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

export default VoiceButton;
