import React from 'react';
import { ICategoryWithHoursTypes, IHoursByDay } from './interfaces';
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';
interface CreateHoursProps extends MainInterface, ResponsiveInterface, React.HTMLAttributes<HTMLDivElement> {
    isVisible: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
    MODAL_HEADER: string;
    SELECT_A_DAY_TITLE: string;
    SELECT_A_CATEGORY: string;
    ADD_HOURS_BUTTON: string;
    FROM_TIME_TO_BIG: string;
    TO_TIME_TO_SMALL: string;
    allCategories: ICategoryWithHoursTypes[];
    activeCategory: number;
    handleStoreHoursUpdate: (updateHoursByDay: IHoursByDay, index: number) => void;
}
export declare const CreateHoursModal: React.FC<CreateHoursProps>;
export {};
