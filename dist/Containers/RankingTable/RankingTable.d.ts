import React from 'react';
import { MainInterface, ResponsiveInterface } from "../../Utils/BaseStyles";
interface CustomerProps {
    name: string;
    image: string;
    totalSpent: number;
    totalSpent1D: number;
    totalSpent1W: number;
    totalSpent1M: number;
    totalSpent1Y?: number;
}
interface ItemProps {
    name: string;
    image: string;
    totalSpent: number;
    totalSpent1D: number;
    totalSpent1W: number;
    totalSpent1M: number;
    totalSpent1Y?: number;
}
export interface RankingTableProps extends MainInterface, ResponsiveInterface {
    data: CustomerProps[] | ItemProps[];
    rowsVisible?: number;
    IsTimeIntervalFilterVisible?: boolean;
    title: string;
}
export declare const RankingTable: React.FC<RankingTableProps>;
export {};
