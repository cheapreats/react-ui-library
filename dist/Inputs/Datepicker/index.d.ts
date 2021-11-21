import React from 'react';
import { LabelLayoutProps } from '../../Fragments';
export interface DatepickerProps extends LabelLayoutProps {
    disabled?: boolean;
    placeholder?: string;
    onChange?: Function;
    onClear?: Function;
    value?: Date;
    initialShow?: boolean;
}
export declare const Datepicker: React.FC<DatepickerProps>;
export default Datepicker;
