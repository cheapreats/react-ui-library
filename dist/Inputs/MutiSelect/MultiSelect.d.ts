import React from 'react';
import { LabelLayoutProps } from '../../Fragments/LabelLayout';
export interface MultiSelectProps extends LabelLayoutProps, React.HTMLAttributes<HTMLDivElement> {
    columns?: string | number;
}
export declare const MultiSelect: React.FC<MultiSelectProps>;
