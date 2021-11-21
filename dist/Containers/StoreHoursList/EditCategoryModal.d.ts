import React from 'react';
import { ICategoryWithHoursTypes } from './interfaces';
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';
interface EditCategoryProps extends MainInterface, ResponsiveInterface, React.HTMLAttributes<HTMLDivElement> {
    isVisible: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
    thirdModalHeader: string;
    CANNOT_ADD_EMPTY: string;
    CATEGORY_EXISTS: string;
    ALL_CATEGORIES: string;
    ADD_CATEGORIES_SUBTITLE: string;
    CANNOT_DELETE_ACTIVE: string;
    ADD_CATEGORY_BUTTON: string;
    yesButtonLabel: string;
    noButtonLabel: string;
    allCategories: ICategoryWithHoursTypes[];
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void;
    setActiveCategory: React.Dispatch<React.SetStateAction<number>>;
    activeCategory: number;
}
export declare const EditCategoryModal: React.FC<EditCategoryProps>;
export {};
