import React from 'react';
import { MainInterface, ResponsiveInterface } from "../../Utils/BaseStyles";
export interface DisplayItemProps extends MainInterface, ResponsiveInterface {
    label?: string;
    value?: string;
}
export declare const DisplayItem: React.FC<DisplayItemProps>;
