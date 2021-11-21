import React from 'react';
import { InputFragmentProps, LabelLayoutProps } from "../../Fragments";
export interface InputProps extends LabelLayoutProps, InputFragmentProps {
    disabled?: boolean;
    placeholder?: string;
}
export declare const Input: React.FC<InputProps>;
export default Input;
