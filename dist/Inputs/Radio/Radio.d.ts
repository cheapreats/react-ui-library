import React from 'react';
import { MainInterface, ResponsiveInterface } from "../../Utils/BaseStyles";
import { ImplicitPropsInterface } from "../../Utils/Hooks";
export interface RadioProps extends MainInterface, ResponsiveInterface, ImplicitPropsInterface, React.HTMLAttributes<HTMLDivElement> {
    label?: string;
    column?: boolean;
    className?: string;
    activeStyle?: Function;
    radioStyle?: Function;
    disabled?: boolean;
    value?: boolean;
    name?: string;
}
export declare const Radio: React.FC<RadioProps>;
export default Radio;
