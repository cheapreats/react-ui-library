import React from 'react';
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';
export interface TableComponentProps extends MainInterface, ResponsiveInterface, React.HTMLAttributes<HTMLDivElement> {
    droppableLabels: string[][];
    isPreview?: boolean;
}
export declare const TableComponent: React.FC<TableComponentProps>;
