import React from 'react';
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';
interface ErrorModalProps extends MainInterface, ResponsiveInterface, React.HTMLAttributes<HTMLDivElement> {
    modalState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
    errorMessage?: string;
    icon?: React.ForwardRefExoticComponent<React.RefAttributes<SVGSVGElement>>;
}
export declare const ErrorModal: React.FC<ErrorModalProps>;
export {};
