import React from 'react';
import { MainInterface, ResponsiveInterface } from "../../Utils/BaseStyles";
export interface ModalProps extends ResponsiveInterface, MainInterface, React.HTMLAttributes<HTMLDivElement> {
    onClose?: Function;
    height?: string;
    width?: string | number;
    state: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
    maxWidth?: string;
    maxHeight?: string;
}
export declare const Modal: React.FC<ModalProps>;
