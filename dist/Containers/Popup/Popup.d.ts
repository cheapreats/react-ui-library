import React from 'react';
import { LabelLayoutProps } from "../../Fragments";
export interface PopupProps extends LabelLayoutProps {
    left?: number;
    top?: number;
    width?: number;
    height?: number;
}
export declare const Popup: React.FC<PopupProps>;
