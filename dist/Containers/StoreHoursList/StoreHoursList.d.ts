import React from 'react';
import { ITextHeaders, ICategoryWithHoursTypes } from './interfaces';
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';
export interface StoreHoursListProps extends MainInterface, ResponsiveInterface, React.HTMLAttributes<HTMLDivElement> {
    allCategories: ICategoryWithHoursTypes[];
    textHeaders: ITextHeaders;
    width?: string;
    onSave: (updatedCategories: ICategoryWithHoursTypes[]) => void;
    isLoading?: boolean;
}
export declare const StoreHoursList: React.FC<StoreHoursListProps>;
