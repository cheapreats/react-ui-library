import React from 'react';
import { MainInterface, ResponsiveInterface } from "../../Utils/BaseStyles";
import { IFilterSelectProps } from "./FilterSelect";
import { TagProps } from '../Tag/Tag';
export interface ITagFilterSelectProps extends MainInterface, ResponsiveInterface, React.HTMLAttributes<HTMLDivElement> {
    placeholder: string;
    selectOptions: string[];
    selectProps?: Partial<IFilterSelectProps>;
    tagProps?: Omit<TagProps, 'children'>;
    filterValue?: string[];
    onOptionsSelected?: (selectedOptions: string[]) => void;
}
export declare const TagFilterSelect: React.FC<ITagFilterSelectProps>;
