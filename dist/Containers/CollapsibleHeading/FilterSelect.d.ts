import React from 'react';
import { MainInterface, ResponsiveInterface } from "../../Utils/BaseStyles";
import { SelectProps } from '../../Inputs/Select/Select';
export interface IFilterSelectProps extends MainInterface, ResponsiveInterface, React.HTMLAttributes<HTMLDivElement> {
    placeholder: string;
    selectOptions: string[];
    selectProps?: SelectProps;
    onSelectFilter?: (selectedFilter: string) => void;
    value?: string;
}
export declare const FilterSelect: React.FC<IFilterSelectProps>;
