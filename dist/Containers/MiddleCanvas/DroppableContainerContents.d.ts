import React from 'react';
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';
export interface DroppableContainerContentsProps extends MainInterface, ResponsiveInterface, React.HTMLAttributes<HTMLDivElement> {
    droppableLabel: string[];
}
export declare const DroppableContainerContents: React.FC<DroppableContainerContentsProps>;
