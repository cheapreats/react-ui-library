import React from 'react';
import { HeaderGroup, Row } from 'react-table';
import { ListHeaderProps, ListProps } from '../List';
import { ICollapsibleHeadingProps } from '../CollapsibleHeading/CollapsibleHeading';
import { ButtonProps } from '../../Inputs/Button/Button';
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';
export interface IFilterItems {
    title: string;
    element?: (column: HeaderGroup<any>, additionalFunction?: (value: any) => void) => JSX.Element;
}
export interface IVendorsFilterProps extends MainInterface, ResponsiveInterface, React.HTMLAttributes<HTMLDivElement> {
    header?: React.ReactElement;
    filterItems: IFilterItems[];
    headingProps?: ListHeaderProps;
    buttonProps?: ButtonProps;
    listProps: ListProps;
    collapsibleHeadingProps?: ICollapsibleHeadingProps;
    globalFilter?: any;
    preGlobalFilteredRows?: Row<any>[];
    setGlobalFilter?: (filterValue: any) => void;
    headerGroups: HeaderGroup<any>[];
}
export declare const VendorsFilter: React.FC<IVendorsFilterProps>;
