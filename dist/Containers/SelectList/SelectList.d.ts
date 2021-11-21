import React from 'react';
import { LabelLayoutProps } from "../../Fragments";
export interface SelectSearchBarProps extends LabelLayoutProps {
    value?: string | number;
    onChange?: Function;
    limit: number;
    expanded: boolean;
    inputValue?: string;
}
export declare const SelectList: React.FC<SelectSearchBarProps>;
export default SelectList;
