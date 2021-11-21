import React from 'react';
import { MainInterface, ResponsiveInterface } from "../../Utils/BaseStyles";
export interface ButtonProps extends MainInterface, ResponsiveInterface, React.HTMLAttributes<HTMLButtonElement> {
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
export declare const Button: React.FC<ButtonProps>;
export default Button;
