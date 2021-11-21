import React from 'react';
import { ButtonProps } from '../Button/Button';
/**
 * VoiceButton props
 */
export interface VoiceButtonProps {
    icon?: React.ForwardRefExoticComponent<React.RefAttributes<SVGSVGElement>>;
    iconSize?: string;
    onClick?: React.MouseEventHandler;
    disabled?: boolean;
    isPulsing?: boolean;
    volume?: string;
    buttonProps?: ButtonProps[];
}
/**
 * VoiceButton uses Button functionality
 */
export declare const VoiceButton: React.FC<VoiceButtonProps>;
export default VoiceButton;
