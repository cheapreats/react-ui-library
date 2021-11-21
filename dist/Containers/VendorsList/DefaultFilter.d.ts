import React from 'react';
import { MainInterface, ResponsiveInterface } from "../../Utils/BaseStyles";
export interface IFilterProps extends MainInterface, ResponsiveInterface, React.HTMLAttributes<HTMLDivElement> {
    column: any;
}
export declare const DefaultFilter: React.FC<IFilterProps>;
