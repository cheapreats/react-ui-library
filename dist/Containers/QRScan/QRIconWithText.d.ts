import React from 'react';
import { StyledIcon } from '@styled-icons/styled-icon';
import { SmallTextProps } from "../../Text/SmallText";
interface IQRIconWithTextProps extends IContainerProps {
    icon?: StyledIcon;
    iconSize?: string;
    textWidth?: string;
    height?: string;
    headingText?: string;
    headingTextSize?: string;
    subText?: string;
    subTextSize?: string;
    textProps?: SmallTextProps;
}
export declare const QRIconWithText: React.FC<IQRIconWithTextProps>;
interface IContainerProps {
    margin?: string;
    height?: string;
}
export {};
