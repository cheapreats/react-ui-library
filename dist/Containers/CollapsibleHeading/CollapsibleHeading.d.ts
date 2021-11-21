import React from 'react';
import { MainInterface, ResponsiveInterface } from "../../Utils/BaseStyles";
export interface ICollapsibleHeadingProps extends MainInterface, ResponsiveInterface, React.HTMLAttributes<HTMLDivElement> {
    title?: string;
    ChildElement?: React.ReactElement;
    isCollapsed?: boolean;
    setCollapsed?: () => void;
}
export declare const CollapsibleHeading: React.FC<ICollapsibleHeadingProps>;
