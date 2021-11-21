import React from 'react';
import { LabelLayoutProps } from "../../Fragments";
export interface SearchBarProps extends LabelLayoutProps {
    value?: string | number;
    onChange?: Function;
    onInput?: Function;
    limit?: number;
    placeholder?: string;
    backgroundColor?: string;
    borderRadius?: string;
    hasIcon?: boolean;
}
export declare const SearchBar: React.FC<SearchBarProps>;
export default SearchBar;
