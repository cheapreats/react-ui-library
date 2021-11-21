import React from 'react';
import { StyledIcon } from 'styled-icons/types';
import { IElementWithCategory, ILeftSideBarInterface } from './ReceiptElements';
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';
export interface LeftSideBarProps extends MainInterface, ResponsiveInterface, React.HTMLAttributes<HTMLDivElement> {
    ReceiptElements: ILeftSideBarInterface;
    ElementWithCategory: IElementWithCategory[];
    onDrag: () => void;
    iconsList: StyledIcon[];
    backgroundColor?: string;
    hasIcon?: boolean;
    dropDisabled?: boolean;
}
export declare const LeftSideBar: React.FC<LeftSideBarProps>;
