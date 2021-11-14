import React from 'react';
import styled from 'styled-components';
import { ThreeDotsVertical } from '@styled-icons/bootstrap/ThreeDotsVertical';
import {
    TableOptions,
    useFilters,
    useTable
} from 'react-table';
import { CRMRowProps } from '../CRMRow/CRMRow';

export interface ICRMTableProps extends TableOptions<CRMRowProps> {
    /* A click on the table row */
    onRowClick: (rowData: CRMRowProps) => void;
    /* A click on the menu button */
    onMenuClick: () => void;
}

export const CRMTable: React.FC<ICRMTableProps> = ({
    columns,
    data,
    defaultColumn,
    onRowClick,
    onMenuClick,
    ...props
}): React.ReactElement => {
    const { 
        getTableProps, 
        getTableBodyProps, 
        headerGroups, 
        rows, 
        prepareRow 
    } = useTable({ columns, data, defaultColumn }, useFilters);

    function justMenuClick(event: React.MouseEvent<SVGElement, MouseEvent>){
        onMenuClick();
        event.stopPropagation();
    }

    const buildHeaderGroups = () => headerGroups.map((headerGroup) => (
        <CRMTableHeaderRow {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
                <CRMTableHeaderCell {...column.getHeaderProps()}>
                    {column.render('Header')}
                    <div>{column.canFilter && column.render('Filter')}</div>
                </CRMTableHeaderCell>
            ))}
        </CRMTableHeaderRow>
    ));

    const buildRows = () => rows.map((row) => {
        prepareRow(row);
        return (
            <CRMTableDataRow {...row.getRowProps()} onClick={() => onRowClick(row.original)}>
                {row.cells.map((cell) => (
                    <CRMTableData {...cell.getCellProps()}>
                        {cell.render('Cell')}
                    </CRMTableData>
                ))}
                <CRMTableMenuIcon onClick={(event) => justMenuClick(event)} />
            </CRMTableDataRow>
        );
    });

    return (
        <CRMMainTable {...props} {...getTableProps()}>
            <thead>
                {buildHeaderGroups()}
            </thead>
            <tbody {...getTableBodyProps()}>
                {buildRows()}
            </tbody>
        </CRMMainTable>
    );
}

const CRMMainTable = styled.table`
    border-collapse: collapse;
    min-height: 25px;
    width: 100%;
`;

const CRMTableHeaderRow = styled.tr`
    ${({theme}) => `
        border-bottom: 2px solid ${theme.colors.border};
        }
    `}
`;

const CRMTableDataRow = styled.tr`
    ${({theme}) => `
        border-bottom: .75px solid ${theme.colors.border};
        
        :hover{
            border: none;
            transform: scale(1.015, 1.05);
            box-shadow: ${theme.depth[1]};
    `}
`;

const CRMTableHeaderCell = styled.th`
    ${({theme}) => `
        padding: ${theme.dimensions.padding.default};
    `}
    text-align: left;
`;

const CRMTableData = styled.td`
    ${({theme}) => `
        padding: ${theme.dimensions.padding.default};
    `}
`
const CRMTableMenuIcon = styled(ThreeDotsVertical)`
    ${({theme}) => `
        padding: ${theme.dimensions.padding.default};
    `}  
    height: 25px;
`;