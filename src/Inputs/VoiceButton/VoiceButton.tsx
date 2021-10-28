import React, { ForwardRefExoticComponent, RefAttributes } from 'react';
import styled from 'styled-components';
import { Button, ButtonProps } from '../Button/Button';
import { useTransition } from '@Utils/Hooks';

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
                    <div style={{
                        background: 'green',
                        position: 'absolute',
                        bottom: '0px',
                        width: '100%',
                        height: volume,
                    }}></div>
                    {icon && <Icon iconSize={iconSize} as={icon} /> }
                </div>
            </StyledButton>
        </div>
    );
};


interface VoiceIconProps {
    iconSize: string;
    as: ForwardRefExoticComponent<RefAttributes<SVGSVGElement>>; //we treat as object
}

const Icon = styled.svg<VoiceIconProps>`
    ${({ iconSize }) =>`
        height: ${iconSize};
        width: ${iconSize};
    `}
`;

/*const TwoIcon = styled.svg<({ icon: ForwardRefExoticComponent<RefAttributes<SVGSVGElement>> })>`

`*/

/*interface StackedIconProps extends VoiceIconProps {
    iconVolumeColor?: string;
}

const StackedIcon: React.FC<StackedIconProps> = ({
    iconSize,
    as,
    iconVolumeColor = "green"
}): React.ReactElement => {
    return(
        // {icon && <Icon iconSize={iconSize} as={icon} />}
        <span>
        <Icon iconSize={iconSize} as={as} iconColor={iconVolumeColor} >
        <Icon iconSize={iconSize} as={as} />
        </Icon>
        </span>
    )
}
*/

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
