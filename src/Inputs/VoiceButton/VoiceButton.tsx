import React, { ForwardRefExoticComponent, RefAttributes } from 'react';
import styled from 'styled-components';
import { Button } from '../Button/Button';
import { CircleFill } from '@styled-icons/bootstrap/CircleFill';
import { useTransition } from '@Utils/Hooks';
import { position } from '@Utils/Mixins';
/*import {
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
    full?: boolean;
    onClick?: React.MouseEventHandler;
    disabled?: boolean;
}*/

export interface VoiceButtonProps {
    icon?: React.ForwardRefExoticComponent<React.RefAttributes<SVGSVGElement>>;
    iconSize?: string;
    onClick?: React.MouseEventHandler;
    disabled?: boolean;
    pulsing?: boolean;
}

export const VoiceButton: React.FC<VoiceButtonProps> = ({
    children,
    icon,
    iconSize = '14px',
    disabled,
    pulsing,
    ...props
}): React.ReactElement => {
    const [, isAnimated] = useTransition(pulsing);
    return (
        <div>
            <p> { children } </p>
            <StyledButton pulsing = {isAnimated} {...props} disabled={disabled}>
                {icon && (
                    <Icon
                        iconSize={iconSize}
                        as={icon}
                    />
                )}
            </StyledButton>
        </div>
    );
};

interface VoiceIconProps {
    iconSize: string;
    as: ForwardRefExoticComponent<RefAttributes<SVGSVGElement>>;
}

const Icon = styled.svg<VoiceIconProps>`
    ${({ iconSize }) => `
        height: ${iconSize};
        width: ${iconSize};
    `}
`;

const StyledButton = styled(Button).attrs({})<{pulsing: boolean}>`

    ${({ pulsing }): string =>
        pulsing
            ? `
            box-shadow: 0 0 0 0 rgba(0, 0, 0, 1);
            transform: scale(1);
            animation: pulse 2s infinite;
        
            @keyframes pulse {
                0% {
                    transform: scale(0.95);
                    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.7);
                }
                70% {
                    transform: scale(1);
                    box-shadow: 0 0 0 10px rgba(0, 0, 0, 0);
                }
                100% {
                    transform: scale(0.95);
                    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
                }
            }
    `
            : ``} // No animation
`;

export default VoiceButton;
