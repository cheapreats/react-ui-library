import React from 'react';
import { Row, Column, HeaderGroup, TableProps, TableHeaderProps, TableRowProps } from 'react-table';
import { IPaginationProps } from './Pagination';
import { IProfileProps } from '../VendorsList/Profile';
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';
export interface IVendorsData extends IProfileProps {
    tags?: string[];
    createdAt?: string;
}
export interface IReactTableProps extends MainInterface, ResponsiveInterface, React.HTMLAttributes<HTMLDivElement> {
    columns: Column<any>[];
    tableProps?: TableProps;
    tableHeaderProps?: Omit<TableHeaderProps, 'key'>;
    tableRowProps?: Omit<TableRowProps, 'key'>;
    paginationProps?: Partial<IPaginationProps>;
    pageSelectOptions: number[];
    isPaginated?: boolean;
    getTableProps: Function;
    getTableBodyProps: Function;
    headerGroups: HeaderGroup<any>[];
    prepareRow: (row: Row<any>) => void;
    page: any;
    pageCount: number;
    gotoPage: (updater: number | ((pageIndex: number) => number)) => void;
    nextPage: () => void;
    previousPage: () => void;
    setPageSize: (pageSize: number) => void;
    pageIndex: number;
    pageSize: number;
    onSelectRow: (original: any) => void;
    tableHeight?: string;
    mediaMixin?: string;
    mediaHeight?: string;
    filteredRows: any[];
}
export declare const ReactTable: React.FC<IReactTableProps>;
