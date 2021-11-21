import React from 'react';
export interface FilterBoxProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string;
    query: string;
}
export declare const FilterBox: React.FC<FilterBoxProps>;
