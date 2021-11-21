import React from 'react';
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';
export interface DroppableElementProps extends MainInterface, ResponsiveInterface, React.HTMLAttributes<HTMLDivElement> {
    droppableLabels: string[][];
    isPreview?: boolean;
}
export declare const DroppableElement: React.FC<DroppableElementProps>;
