import React from 'react';
interface TimeDisplayProps {
    name: string;
    value: Date;
    show: boolean;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
    onChange: Function;
    disabled?: boolean;
}
export declare const TimeDisplay: React.FC<TimeDisplayProps>;
export {};
