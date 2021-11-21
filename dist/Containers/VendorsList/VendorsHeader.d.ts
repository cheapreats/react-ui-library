import React from 'react';
import { ButtonProps } from '../../Inputs/Button/Button';
import { HeadingProps } from '../../Text/Heading';
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';
export interface IVendorsHeaderProps extends MainInterface, ResponsiveInterface, React.HTMLAttributes<HTMLDivElement> {
    headerText: string;
    rightButtonText: string;
    leftButtonText?: string;
    leftButtonProps?: ButtonProps;
    rightButtonProps?: ButtonProps;
    headingProps?: HeadingProps;
}
export declare const VendorsHeader: React.FC<IVendorsHeaderProps>;
