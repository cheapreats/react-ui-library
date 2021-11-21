import React from 'react';
import { IHoursByDay } from './interfaces';
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';
interface TimeDisplayProps extends MainInterface, ResponsiveInterface, React.HTMLAttributes<HTMLDivElement> {
    allCategoriesWithHours: IHoursByDay;
    handleRemoveHours: (day: string, hoursIndex: number) => void;
    is24: boolean;
}
export declare const TimeDisplay: React.FC<TimeDisplayProps>;
export {};
