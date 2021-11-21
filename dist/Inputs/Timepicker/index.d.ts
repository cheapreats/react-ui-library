import React from 'react';
import { LabelLayoutProps } from '../../Fragments';
export interface TimepickerProps extends LabelLayoutProps, Omit<React.HTMLAttributes<HTMLElement>, 'onChange'> {
    value?: Date;
    period?: boolean;
    onChange?: Function;
    disabled?: boolean;
    name: string;
}
export declare const Timepicker: React.FC<TimepickerProps>;
export default Timepicker;
