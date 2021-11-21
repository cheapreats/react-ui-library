import React from 'react';
import { SelectProps } from '../../Inputs/Select/Select';
import { SmallTextProps } from '../../Text/SmallText';
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';
export interface IRowSelectorProps extends MainInterface, ResponsiveInterface, React.HTMLAttributes<HTMLDivElement> {
    setPageSize: (pageSize: number) => void;
    pageSize: string | number;
    pageSelectOptions: number[];
    pageOptionsLength: number;
    smallTextProps?: SmallTextProps;
    selectProps?: SelectProps;
}
export declare const RowSelector: React.FC<IRowSelectorProps>;
