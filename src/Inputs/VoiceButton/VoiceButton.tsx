import React, { ForwardRefExoticComponent, RefAttributes } from 'react';
import styled from 'styled-components';
import { useTransition } from '@Utils/Hooks';
import { Button } from '../Button/Button';

/**
 * VoiceButton props
 */
export interface VoiceButtonProps {
    // microphone icon
    icon?: React.ForwardRefExoticComponent<React.RefAttributes<SVGSVGElement>>;
    iconSize?: string;
    onClick?: React.MouseEventHandler;
    disabled?: boolean;
    // decides if Button should pulse
    isPulsing?: boolean;
}

/**
 * VoiceButton uses Button functionality
 */
export const VoiceButton: React.FC<VoiceButtonProps> = ({
    children,
    icon,
    iconSize = '14px',
    disabled,
    isPulsing,
    ...props
}): React.ReactElement => {
    const [, isAnimated] = useTransition(isPulsing);
    return (
        <div {...props}>
            <p> {children} </p>
            <StyledButton isPulsing={isAnimated} disabled={disabled}>
                {icon && <Icon iconSize={iconSize} as={icon} />}
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

const PULSE_ANIMATION = `
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
    }`;

const StyledButton = styled(Button).attrs({})<{ isPulsing: boolean }>`
    ${({ isPulsing }): string =>
        isPulsing ? PULSE_ANIMATION : ``}// No animation
`;

export default VoiceButton;
