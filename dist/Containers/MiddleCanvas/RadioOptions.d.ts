import React from 'react';
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';
export interface RadioOptionProps extends MainInterface, ResponsiveInterface, React.HTMLAttributes<HTMLDivElement> {
    title?: string;
    labels: string[];
    index: number;
    selectOption: string[];
    setSelectOption: React.Dispatch<React.SetStateAction<string[]>>;
}
export declare const RadioOptions: React.FC<RadioOptionProps>;
