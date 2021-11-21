import React from 'react';
import { MainInterface, ResponsiveInterface } from "../../Utils/BaseStyles";
import { IFilterSelectProps } from "./FilterSelect";
export interface IDateFilterSelectProps extends MainInterface, ResponsiveInterface, React.HTMLAttributes<HTMLDivElement> {
    placeholder: string;
    selectOptions: string[];
    selectProps?: Partial<IFilterSelectProps>;
    onOptionsSelected?: (filterValue: {
        date: Date;
        selectedOption: string;
    }) => void;
    filterValue: {
        date: Date;
        selectedOption: string;
    };
}
export declare const DateFilterSelect: React.FC<IDateFilterSelectProps>;
