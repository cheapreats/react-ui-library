import React, { ForwardRefExoticComponent, RefAttributes } from 'react';
import styled from 'styled-components';
import { useTransition } from '@Utils/Hooks';
import { Button } from '../Button/Button';

export interface VoiceButtonProps {
    icon?: React.ForwardRefExoticComponent<React.RefAttributes<SVGSVGElement>>;
    iconSize?: string;
    onClick?: React.MouseEventHandler;
    disabled?: boolean;
    isPulsing?: boolean;
}

/**
 * A VoiceButton which uses Button functionality
 * @param children
 * @param icon
 * @param iconSize
 * @param disabled
 * @param isPulsing
 * @param props
 * @constructor
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
        <div>
            <p> {children} </p>
            <StyledButton isPulsing={isAnimated} {...props} disabled={disabled}>
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

const StyledButton = styled(Button).attrs({})<{ isPulsing: boolean }>`
    ${({ isPulsing }): string =>
        isPulsing
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
            : ``}// No animation
`;

export default VoiceButton;
