import React, { ForwardRefExoticComponent, RefAttributes } from 'react';
import styled from 'styled-components';
import { useTransition } from '@Utils/Hooks';
import { Button, ButtonProps } from '../Button/Button';

/**
 * VoiceButton props
 */
export interface VoiceButtonProps {
    // microphone icon
    icon?: React.ForwardRefExoticComponent<React.RefAttributes<SVGSVGElement>>;
    // changes width and height
    iconSize?: string;
    // listens to button click
    onClick?: React.MouseEventHandler;
    // when disabled, you can't interact with it
    disabled?: boolean;
    // decides if Button should pulse
    isPulsing?: boolean;
    // volume level displayed on voice icon
    volume?: string;
    // additional props for styled button
    buttonProps?: ButtonProps[];
}
/**
 * VoiceButton uses Button functionality
 */
export const VoiceButton: React.FC<VoiceButtonProps> = ({
    children,
    icon,
    iconSize = '25px',
    disabled,
    isPulsing,
    volume = '0%',
    buttonProps,
    ...props
}): React.ReactElement => {
    const [, isAnimated] = useTransition(isPulsing);
    return (
        <div {...props}>
            <p> {children} </p>
            <StyledButton
                isPulsing={isAnimated}
                disabled={disabled}
                {...buttonProps}
            >
                <div>
                    <div
                        style={{
                            position: 'absolute',
                            width: '100%',
                            height: `${100 - parseFloat(volume)}%`,
                            overflow: 'hidden',
                        }}
                    >
                        {' '}
                        {icon && (
                            <Icon
                                iconSize={iconSize}
                                as={icon}
                                iconColor="black"
                            />
                        )}{' '}
                    </div>
                    {icon && (
                        <Icon
                            iconSize={iconSize}
                            as={icon}
                            iconColor="green"
                        />
                    )}
                </div>
            </StyledButton>
        </div>
    );
};

interface VoiceIconProps {
    iconSize: string;
    iconColor?: string;
    as: ForwardRefExoticComponent<RefAttributes<SVGSVGElement>>; // we treat as object
}

const Icon = styled.svg<VoiceIconProps>`
    ${({ iconSize, iconColor }) => `
        height: ${iconSize};
        width: ${iconSize};
        color: ${iconColor};
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
