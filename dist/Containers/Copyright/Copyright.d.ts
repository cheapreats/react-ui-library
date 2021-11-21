import React from 'react';
import { MainInterface, ResponsiveInterface } from "../../Utils/BaseStyles";
interface CopyrightProps extends MainInterface, ResponsiveInterface, React.HTMLAttributes<HTMLParagraphElement> {
    margin: string;
    version: string | number;
}
export declare const Copyright: React.FC<CopyrightProps>;
export {};
