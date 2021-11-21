import React from 'react';
import { MainInterface, ResponsiveInterface } from "../../Utils/BaseStyles";
import { ImplicitPropsInterface } from "../../Utils/Hooks";
export interface CheckboxProps extends MainInterface, ResponsiveInterface, ImplicitPropsInterface, Omit<React.HTMLAttributes<HTMLInputElement>, 'onChange'> {
    label?: string;
    column?: boolean;
    className?: string;
    activeStyle?: Function;
    checkboxStyle?: Function;
    disabled?: boolean;
    name?: string;
    value?: boolean;
    onChange?: Function;
}
export declare const Checkbox: React.FC<CheckboxProps>;
export default Checkbox;
