import React from 'react';
import { MainInterface, ResponsiveInterface } from "../../Utils/BaseStyles";
interface WorkflowProps {
    reportName: string;
    reportManual: string;
    reportAuto: string;
}
interface ItemProps {
    reportName: string;
    reportManual: string;
    reportAuto: string;
}
export interface TableProps extends MainInterface, ResponsiveInterface {
    data: WorkflowProps[] | ItemProps[];
    rowsVisible?: number;
    traditional: string;
    stripe: string;
}
export declare const Table: React.FC<TableProps>;
export {};
