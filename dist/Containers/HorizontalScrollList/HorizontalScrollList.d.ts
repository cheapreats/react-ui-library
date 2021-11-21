import React from 'react';
export interface ScrollListProps extends React.HTMLAttributes<HTMLDivElement> {
    labelArray: string[];
    menuName: string;
    menuWidth: number;
    labelPadding: string;
    hoveredStyle?: Function;
    selectedStyle?: Function;
    displaySelected?: boolean;
    displayDropDown?: boolean;
}
export interface ScrollListDivProps {
    menuWidth?: number;
}
export interface ListItemProps {
    label: string;
    hoveredStyle: Function;
    selectedStyle: Function;
    isSelected: boolean;
}
export declare const HorizontalScrollList: React.FC<ScrollListProps>;
