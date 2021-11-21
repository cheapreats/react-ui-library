import React from 'react';
import { IRowSelectorProps } from './RowSelector';
import { IPageSelectorProps } from './PageSelector';
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';
export interface IPaginationProps extends IRowSelectorProps, IPageSelectorProps, MainInterface, ResponsiveInterface, React.HTMLAttributes<HTMLDivElement> {
    rowSelectorProps?: Omit<IRowSelectorProps, 'setPageSize' | 'pageSize' | 'pageSelectOptions' | 'pageOptionsLength'>;
    pageSelectorProps?: Omit<IPageSelectorProps, 'goToPreviousPage' | 'goToNextPage' | 'goToPage' | 'pageCount' | 'pageIndex'>;
}
export declare const Pagination: React.FC<IPaginationProps>;
