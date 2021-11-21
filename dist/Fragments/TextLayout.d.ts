import React from 'react';
import { MainInterface, ResponsiveInterface } from '../Utils/BaseStyles';
export interface TextLayoutProps extends MainInterface, ResponsiveInterface, React.HTMLAttributes<HTMLParagraphElement> {
    color?: string;
    lineHeight?: number | string;
    bold?: boolean;
    size?: string;
    type?: string;
    textAlign?: string;
}
export declare const TextLayout: React.FC<TextLayoutProps>;
