import React from 'react';
import { ButtonProps } from '../../Inputs/Button/Button';
import { SmallTextProps } from '../../Text/SmallText';
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';
export interface IPageSelectorProps extends MainInterface, ResponsiveInterface, React.HTMLAttributes<HTMLDivElement> {
    goToPreviousPage: () => void;
    goToNextPage: () => void;
    goToPage: (pageNumber: number) => void;
    pageCount: number;
    buttonProps?: ButtonProps;
    pageIndex: number;
    smallTextProps?: SmallTextProps;
}
export declare const PageSelector: React.FC<IPageSelectorProps>;
