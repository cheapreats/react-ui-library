import React from 'react';
import { MainInterface, ResponsiveInterface } from '../Utils/BaseStyles';
import { ImplicitPropsInterface } from '../Utils/Hooks';
export interface LabelLayoutProps extends ResponsiveInterface, MainInterface, ImplicitPropsInterface, React.HTMLAttributes<HTMLDivElement> {
    name?: string;
    label?: string;
    description?: string;
    error?: boolean;
    success?: boolean;
    children?: React.ReactNode;
    className?: string;
}
export declare const LabelLayout: React.FC<LabelLayoutProps>;
export default LabelLayout;
