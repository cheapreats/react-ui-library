import React from 'react';
import { StyledIcon } from 'styled-icons/types';
export interface ISegment {
    active?: boolean;
    name: string;
    icon?: StyledIcon;
}
export interface ISegmentedButtonProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
    width?: string;
    height?: string;
    borderRadius?: string;
    onClick: (event: React.MouseEvent<Element, MouseEvent>, index: number) => void;
    segments: ISegment[];
}
/**
 *@type  {ISegment[]}
 *@param {segments} - objects with a name, active boolean, and icon properties;
 * */
export declare const SegmentedButton: React.FC<ISegmentedButtonProps>;
