import React from 'react';
export interface SwitchProps extends InputProps {
    leftTag?: string;
    rightTag?: string;
    activeColor?: string;
    switchColor?: string;
    label?: string;
    description?: string;
}
interface InputProps {
    isChecked?: boolean;
    onChange?: Function;
    disabled?: boolean;
}
export declare const Switch: React.FC<SwitchProps>;
export default Switch;
