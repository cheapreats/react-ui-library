import React from 'react';
import { MainInterface, ResponsiveInterface } from '../Utils/BaseStyles';
export interface InputFragmentProps extends ResponsiveInterface, MainInterface, React.InputHTMLAttributes<HTMLInputElement> {
    disabled?: boolean;
    placeholder?: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    value?: string | number | string[];
    error?: boolean | string;
    success?: boolean;
    backgroundColor?: string;
    borderRadius?: string;
    children?: React.ReactNode;
    onFocus?: React.FocusEventHandler<HTMLInputElement>;
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
    onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
    onClick?: React.MouseEventHandler<HTMLInputElement>;
    className?: string;
    type?: string;
    width?: number | string;
}
export declare const InputFragment: React.ForwardRefExoticComponent<InputFragmentProps & React.RefAttributes<HTMLInputElement>>;
export default InputFragment;
