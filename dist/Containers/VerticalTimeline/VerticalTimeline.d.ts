import React from 'react';
import { MainInterface, ResponsiveInterface } from "../../Utils/BaseStyles";
interface ITimelineData {
    label: string;
    time: number;
    maxTime: number;
}
export interface VerticalTimelineProps extends MainInterface, ResponsiveInterface, React.HTMLAttributes<HTMLDivElement> {
    timelineData: Array<ITimelineData>;
    verticalSpacing: number;
    widthLeftPanels: number;
    widthRightPanels: number;
    heightPanels: number;
    redColor: string;
    greenColor: string;
    locale: string;
}
export declare const VerticalTimeline: React.FC<VerticalTimelineProps>;
export {};
