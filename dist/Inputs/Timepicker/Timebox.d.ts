import React from 'react';
interface TimeboxProps {
    value: Date;
    show: boolean;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
    name: string;
    onChange: Function;
    mount: boolean;
    disabled?: boolean;
}
export declare const Timebox: React.FC<TimeboxProps>;
export {};
