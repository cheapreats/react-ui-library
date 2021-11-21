import React from 'react';
import { MainInterface, ResponsiveInterface } from "../../Utils/BaseStyles";
import { ImplicitPropsInterface } from "../../Utils/Hooks";
export interface ExcelOptionsProps extends MainInterface, ResponsiveInterface, ImplicitPropsInterface, React.HTMLAttributes<HTMLDivElement> {
    headers: string[];
    defaultHeaders: string[];
    onResult?: Function;
}
export declare const ExcelOptions: React.FC<ExcelOptionsProps>;
