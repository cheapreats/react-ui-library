import React from 'react';
import { ButtonProps } from '../Button/Button';
export interface MultiSelectItemProps extends ButtonProps {
    containerColumns?: string | number;
}
export declare const MultiSelectItem: React.FC<MultiSelectItemProps>;
