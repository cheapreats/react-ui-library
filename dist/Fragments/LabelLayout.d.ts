import React from 'react';
import { MainInterface, ResponsiveInterface } from '../Utils/BaseStyles';
import { ImplicitPropsInterface } from '../Utils/Hooks';
export interface LabelLayoutProps extends ResponsiveInterface, MainInterface, ImplicitPropsInterface {
    name?: string;
    label?: string;
    description?: React.ReactNode;
    error?: boolean | string;
    success?: boolean;
    className?: string;
    children?: React.ReactNode;
}
export declare const LabelLayout: React.ForwardRefExoticComponent<LabelLayoutProps>;
export default LabelLayout;
