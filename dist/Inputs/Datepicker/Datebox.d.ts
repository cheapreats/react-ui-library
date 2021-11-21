import React from 'react';
export interface DateboxProps extends React.HTMLAttributes<HTMLDivElement> {
    changePage: (change?: number) => React.MouseEventHandler;
    selectedDate?: Date;
    selectDate: React.MouseEventHandler;
    animate: boolean;
    value: Date | undefined;
    clearDate?: Function;
}
export declare const Datebox: React.FC<DateboxProps>;
