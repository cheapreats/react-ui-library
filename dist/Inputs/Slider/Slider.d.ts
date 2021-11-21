import React from 'react';
import { DefaultTheme } from 'styled-components';
import { LabelLayoutProps } from "../../Fragments";
export interface MarkProps {
    key: number;
    mark: string;
}
export interface Values {
    leftValue: number;
    rightValue: number;
}
export interface SliderProps extends LabelLayoutProps {
    values?: Values;
    onChange?: Function;
    disabled?: boolean;
    hasTwoKnobs?: boolean;
    hasRail?: boolean;
    hasPopup?: boolean;
    step?: number;
    max?: number;
    min?: number;
    marks?: MarkProps[];
    theme?: DefaultTheme;
}
export declare const Slider: React.FunctionComponent<SliderProps>;
export interface SelectedBarProps {
    left: number;
    right: number;
    disabled: boolean;
    hasRail: boolean;
}
export interface KnobProps {
    left: number;
    hasTwoKnobs: boolean;
    disabled: boolean;
}
export default Slider;
