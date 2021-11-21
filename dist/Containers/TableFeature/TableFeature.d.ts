import React from 'react';
import { MainInterface, ResponsiveInterface } from "../../Utils/BaseStyles";
export interface TableFeatureProps extends MainInterface, ResponsiveInterface {
    heading: string;
    subHeading: string;
    title: string;
    description: string;
    rowsVisible?: number;
    traditional: string;
    stripe: string;
    data: {
        reportName: string;
        reportManual: string;
        reportAuto: string;
    }[];
}
export declare const TableFeature: React.FC<TableFeatureProps>;
