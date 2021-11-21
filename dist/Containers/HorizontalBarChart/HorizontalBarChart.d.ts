import React from 'react';
interface IDataItem {
    label: string;
    value: number;
    isComparedAgainst?: boolean;
}
interface IChartProperties {
    margin?: object;
    data: IDataItem[];
}
export interface IHorizontalBarChartProps {
    header: string;
    summaryHeader: string;
    summaryDescription: string;
    width?: number;
    chartProperties: IChartProperties;
    unit: string;
}
export declare const HorizontalBarChart: React.FC<IHorizontalBarChartProps>;
export {};
