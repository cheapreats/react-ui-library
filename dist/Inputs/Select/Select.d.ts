import React from 'react';
import { LabelLayoutProps } from "../../Fragments";
export interface SelectProps extends LabelLayoutProps {
    disabled?: boolean;
    placeholder?: string | HTMLOptionElement;
    value?: string | number | HTMLOptionElement;
    onChange?: Function;
    limit?: number;
    iconProps?: {
        style: any;
    };
}
export declare const Select: React.FC<SelectProps>;
export default Select;
