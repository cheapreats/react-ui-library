import React from 'react';
import { Column, Row } from 'react-table';
import { ListProps } from "../List";
import { IFilterItems } from './VendorsFilter';
import { INavigationItemProps } from './NavigationItem';
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';
export interface IVendorsListProps extends MainInterface, ResponsiveInterface, React.HTMLAttributes<HTMLDivElement> {
    filterItems: IFilterItems[];
    data: any[];
    columns: Column<any>[];
    navigationBarItems?: INavigationItemProps[];
    headerRightButtonText: string;
    headerLeftButtonText?: string;
    headerText: string;
    filterHeader: React.ReactElement;
    onSelectRow: (original: any) => void;
    listProps: ListProps;
    tableHeight?: string;
    globalFilterMethod?: (rows: Row<object>[], theColumns: string[], filterValue: any) => Row<object>[];
    selectedNavLabel: string;
    groups: string[];
    onExportButtonClick: (exportRows: object[]) => void;
    onAddButtonClick: () => void;
    tableMediaMixin?: string;
    tableMediaHeight?: string;
}
export declare const VendorsList: React.FC<IVendorsListProps>;
