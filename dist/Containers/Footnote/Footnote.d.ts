import React from 'react';
import { MainInterface, ResponsiveInterface } from "../../Utils/BaseStyles";
export interface FootnoteProps extends MainInterface, ResponsiveInterface, React.HTMLAttributes<HTMLDivElement> {
    show?: boolean;
    position?: 'absolute' | 'fixed' | 'relative';
}
export declare const Footnote: React.FC<FootnoteProps>;
