import React from 'react';
import { ICategoryWithHoursTypes } from './interfaces';
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';
interface EditTimeProps extends MainInterface, ResponsiveInterface, React.HTMLAttributes<HTMLDivElement> {
    isVisible: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
    addModal: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
    editCategoryModal: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
    FIRST_MODAL_HEADER: string;
    ADD_HOURS_BUTTON: string;
    EDIT_CATEGORY_BUTTON: string;
    CHANGE_ACTIVE: string;
    CHANGE_ACTIVE_SUBTITLE: string;
    SET_ACTIVE_BUTTON: string;
    allCategories: ICategoryWithHoursTypes[];
    activeCategory: number;
    setActiveCategory: React.Dispatch<React.SetStateAction<number>>;
    saveStoreHours: () => void;
    resetForm: () => void;
    isDirty: boolean;
}
export declare const EditModal: React.FC<EditTimeProps>;
export {};
