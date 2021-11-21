import React from 'react';
import { IPrinterOptions } from './MiddleCanvasTypes';
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';
export interface DualSelectRadioProps extends MainInterface, ResponsiveInterface, React.HTMLAttributes<HTMLDivElement> {
    caption?: string;
    leftPlaceholder?: string;
    rightPlaceholder?: string;
    headerSpacingStyle?: string;
    dualSelectOptions: IPrinterOptions;
}
export declare const DualSelectRadio: React.FC<DualSelectRadioProps>;
