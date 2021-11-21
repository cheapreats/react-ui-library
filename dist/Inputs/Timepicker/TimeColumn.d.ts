import React from 'react';
interface TimeColumnProps {
    format?: (value: string | number) => string | number;
    onChange: (name?: string, value?: number) => void;
    items: (string | number)[];
    active: string | number;
    name?: string;
}
export declare const TimeColumn: React.FC<TimeColumnProps>;
export {};
