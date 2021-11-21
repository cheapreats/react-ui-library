import React from 'react';
import { FormikErrors } from 'formik';
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';
import { IToFromHours, IErrors } from './interfaces';
interface FromToDualTimeSelectorProps extends MainInterface, ResponsiveInterface, React.HTMLAttributes<HTMLDivElement> {
    storeHours: IToFromHours;
    setStoreHours: (hours: IToFromHours) => void;
    errors?: IErrors | FormikErrors<IToFromHours>;
}
export declare const FromToDualTimeSelector: React.FC<FromToDualTimeSelectorProps>;
export {};
