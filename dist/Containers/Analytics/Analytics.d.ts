import React from 'react';
export interface IAnalyticsProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string;
    value: number;
    change?: number;
}
export declare const Analytics: React.FC<IAnalyticsProps>;
