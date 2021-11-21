import React from 'react';
import { StyledIcon } from 'styled-icons/types';
import { MainInterface, ResponsiveInterface } from "../../Utils/BaseStyles";
interface TimelineDataItem {
    color: string;
    Icon: StyledIcon;
    text: string;
}
export interface TimelineProps extends MainInterface, ResponsiveInterface, React.HTMLAttributes<HTMLDivElement> {
    title: string;
    titleColor: string;
    subContentLeftTitle: string;
    subContentLeftAmount: string | number;
    subContentRightTitle: string;
    subContentRightAmount: string | number;
    figuresColor: string;
    textColor: string;
    separatorColor: string;
    separatorLength: string | number;
    timelineData: Array<TimelineDataItem>;
}
export declare const Timeline: React.FC<TimelineProps>;
export default Timeline;
