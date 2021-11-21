import React from 'react';
import { MainInterface, ResponsiveInterface } from "../../Utils/BaseStyles";
export interface ChartProps extends ChartBoxProps {
}
export declare const Chart: React.FC<ChartProps>;
interface ChartData {
    label: string;
    value: number;
}
interface ChartBoxProps extends MainInterface, ResponsiveInterface, React.HTMLAttributes<HTMLDivElement> {
    color: string;
    revenue: string | number;
    data: Array<ChartData>;
}
export default Chart;
