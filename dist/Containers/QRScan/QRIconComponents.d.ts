import React from 'react';
import { MainInterface, ResponsiveInterface } from "../../Utils/BaseStyles";
interface PhoneBoxProps {
    inverted?: boolean;
}
export declare const PhoneBox: import("styled-components").StyledComponent<"div", import("styled-components").DefaultTheme, PhoneBoxProps, never>;
interface IconCompProps extends MainInterface, ResponsiveInterface, React.HTMLAttributes<HTMLDivElement> {
    height: string;
    color?: string;
}
export declare const PhoneIconComp: React.FC<IconCompProps>;
export declare const DinosaurIconComp: React.FC<IconCompProps>;
export {};
