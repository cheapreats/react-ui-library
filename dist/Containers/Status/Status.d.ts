import React from 'react';
import { SmallTextProps } from "../../Text";
import { MainInterface } from "../../Utils/BaseStyles";
export declare enum StatusColors {
    green = "green",
    orange = "orange",
    red = "red"
}
export interface StatusProps extends TextProps, DotProps {
    large?: boolean;
}
interface TextProps extends SmallTextProps, MainInterface {
    large?: boolean;
    statusColor: StatusColors;
}
interface DotProps extends MainInterface {
    large?: boolean;
    statusColor: StatusColors;
}
export declare const Status: React.FC<StatusProps>;
export {};
