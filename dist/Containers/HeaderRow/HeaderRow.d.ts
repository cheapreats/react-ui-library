import React from 'react';
export interface HeaderRowProps {
    label: string;
    display?: string;
    type?: string;
    padding?: string;
    width?: number;
    size?: string;
}
export declare const HeaderRow: React.FC<HeaderRowProps>;
