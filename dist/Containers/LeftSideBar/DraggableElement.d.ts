import React from 'react';
import { DraggableProvided } from 'react-beautiful-dnd';
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';
export interface DraggableElementProps extends MainInterface, ResponsiveInterface, React.HTMLAttributes<HTMLDivElement> {
    providedDraggable: DraggableProvided;
    isDragging?: boolean;
    isRecommended: boolean;
    isRequired: boolean;
}
export declare const DraggableElement: React.FC<DraggableElementProps>;
