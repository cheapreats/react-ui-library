import React from 'react';
import { StyledIcon } from '@styled-icons/styled-icon';
import { ILeftSideBarInterface } from './ReceiptElements';
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';
export interface CollapsibleHeaderProps extends MainInterface, ResponsiveInterface, React.HTMLAttributes<HTMLDivElement> {
    padding?: string;
    headerSpacingStyle?: string;
    icon?: StyledIcon;
    category: string;
    position: number;
    isCollapsedArr: boolean[];
    setIsCollapsedArr: React.Dispatch<React.SetStateAction<boolean[]>>;
    ReceiptElements: ILeftSideBarInterface;
}
export declare const CollapsibleHeader: React.FC<CollapsibleHeaderProps>;
