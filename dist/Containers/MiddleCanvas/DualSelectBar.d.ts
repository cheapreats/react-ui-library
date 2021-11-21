import React from 'react';
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';
export interface DualSelectBarProps extends MainInterface, ResponsiveInterface, React.HTMLAttributes<HTMLDivElement> {
    leftSelectOption: string;
    rightSelectOption: string;
    selectedOption: string;
    setSelectedOption: React.Dispatch<React.SetStateAction<string>>;
}
export declare const DualSelectBar: React.FC<DualSelectBarProps>;
