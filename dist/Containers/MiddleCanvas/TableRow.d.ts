import React from 'react';
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';
export interface TableRowProps extends MainInterface, ResponsiveInterface, React.HTMLAttributes<HTMLDivElement> {
    labels: string[];
}
export declare const TableRow: React.FC<TableRowProps>;
