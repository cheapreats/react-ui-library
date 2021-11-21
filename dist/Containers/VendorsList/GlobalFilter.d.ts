import React from 'react';
import { InputProps } from '../../Inputs/Input/Input';
export interface IFilterProps extends InputProps {
    preGlobalFilteredRows: any;
    globalFilter: any;
    setGlobalFilter: any;
}
export declare const GlobalFilter: React.FC<IFilterProps>;
