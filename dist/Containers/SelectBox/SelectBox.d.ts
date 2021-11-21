import React from 'react';
export interface SelectBoxProps extends React.HTMLAttributes<HTMLDivElement> {
    text?: string;
    align?: string;
    isSelected?: boolean;
    children?: React.ReactNode;
    padding?: string;
    margin?: string;
    bold?: boolean;
    size: string;
    onSelect?: (event: React.SyntheticEvent<HTMLDivElement, Event>) => void;
}
export declare const SelectBox: React.FC<SelectBoxProps>;
