import React from 'react';
import { TableOptions } from 'react-table';
import { CRMRowProps } from '../CRMRow/CRMRow';
export interface ICRMTableProps extends TableOptions<CRMRowProps> {
    onRowClick: (rowData: CRMRowProps) => void;
    onCheckboxClick: () => void;
    onHeaderCheckboxClick: () => void;
}
export declare const CRMTable: React.FC<ICRMTableProps>;
