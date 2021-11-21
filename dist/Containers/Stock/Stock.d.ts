import React from 'react';
import { MainInterface, ResponsiveInterface } from "../../Utils/BaseStyles";
interface ChartDataItem {
    value: string | number;
}
export interface StockProps extends StockBoxProps {
    chartData: Array<ChartDataItem>;
    chartColor: string;
    title: string;
    figure: number;
    rate: number;
    bgColor: string;
}
export declare const Stock: React.FC<StockProps>;
interface StockBoxProps extends MainInterface, ResponsiveInterface, React.HTMLAttributes<HTMLDivElement> {
    bgColor: string;
}
export default Stock;
