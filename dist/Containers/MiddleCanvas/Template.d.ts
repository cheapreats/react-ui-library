import React from 'react';
import { ITemplatePrefill } from './MiddleCanvasTypes';
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';
export interface TemplateProps extends MainInterface, ResponsiveInterface {
    isPreview?: boolean;
    templatePrefills: ITemplatePrefill;
}
export declare const Template: React.FC<TemplateProps>;
