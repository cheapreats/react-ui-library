import React from 'react';
export interface TableHeaderCellProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string;
    sortDown: boolean;
}
export declare const TableHeaderCell: React.FC<TableHeaderCellProps>;
