import React from 'react';
import { ITemplatePrefill, IPrinterOptions } from './MiddleCanvasTypes';
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';
export interface MiddleCanvasProps extends MainInterface, ResponsiveInterface, React.HTMLAttributes<HTMLDivElement> {
    leftSelectOption: string;
    rightSelectOption: string;
    templatePrefills: ITemplatePrefill;
    printerOptions: IPrinterOptions;
    firstCaption?: string;
    secondCaption?: string;
}
export declare const MiddleCanvas: React.FC<MiddleCanvasProps>;
