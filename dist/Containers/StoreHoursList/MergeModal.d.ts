import React from 'react';
import { IHoursByDay, IToFromHours, IMergeDays } from './interfaces';
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';
interface MergeModalProps extends MainInterface, ResponsiveInterface, React.HTMLAttributes<HTMLDivElement> {
    isVisible: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
    storeHours: IToFromHours;
    mergedHours: IHoursByDay;
    overWrittenHours: IHoursByDay;
    confirmMerge: (merge: IMergeDays) => void;
}
export declare const MergeModal: React.FC<MergeModalProps>;
export {};
