/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable indent */
import React, { useState } from 'react';
import styled from 'styled-components';
import { MainInterface, ResponsiveInterface } from '@Utils/BaseStyles';
import { media } from '../../Utils/Mixins';

const Table = styled.table`
    border-collapse: collapse;
    overflow: hidden;
    padding: 0;
    width: 100%;
`; 
const TableHeaderRow = styled.tr``;
const TableHeaderTh = styled.th`
    padding: 0 1rem 0.5rem;
    text-align: left;
`; 
const TableBodyRow = styled.tr`
    text-align: left;
    color: #fff;
    :nth-child(odd) {
        background: #18395a;
    }
    :nth-child(even) {
        background: #274869;
    }
    :first-child td:first-child {
        border-top-left-radius: 10px;
    }
    :first-child td:last-child {
        border-top-right-radius: 10px;
    }
    :last-child td:first-child {
        border-bottom-left-radius: 10px;
    }
    :last-child td:last-child {
        border-bottom-right-radius: 10px;
    }
`;
const TableBodyTd = styled.td`
    text-align: left;
    color: #fff;
    padding: 0.8rem;
    :first-child {
        font-weight: 600;
    }
    ${media('phone', 'padding: 8px;font-size: .8rem')}
`;
const Check = styled.span`
    font-size: 10px;
    font-weight: 600;
    margin-right: 10px;
    display: inline-block;
    color: #18395a;
    background-color: #00c4c4;
    width: 15px;
    border-radius: 50%;
    padding: 2px;
    text-align: center;
`;
/** end of styled */

interface WorkflowProps {
    colOne: string;
    colTwo: string;
    colThree: string;
}
interface ItemProps {
    colOne: string;
    colTwo: string;
    colThree: string;
}

export interface TableOnlyProps extends MainInterface, ResponsiveInterface {
    data: WorkflowProps[] | ItemProps[];
    rowsVisible?: number;
    headingColOne: string;
    headingColTwo: string;
}

interface UseSortReturnType {
    sortedItems: (WorkflowProps | ItemProps)[];
    setIsAscending: React.Dispatch<React.SetStateAction<boolean>>;
    isAscending: boolean;
}

const useSort = (
    rowData: WorkflowProps[] | ItemProps[],
    rowLimit: number,
    timeInterval: string,
): UseSortReturnType => {
    const [isAscending, setIsAscending] = useState(true);

    let sortedItems;
    if (isAscending) {
        sortedItems = [...rowData]
            .sort((a, b): number => +b[timeInterval] - +a[timeInterval])
            .slice(0, rowLimit);
    } else {
        sortedItems = [...rowData]
            .sort((a, b): number => +a[timeInterval] - +b[timeInterval])
            .slice(0, rowLimit);
    }
    return { sortedItems, setIsAscending, isAscending };
};

export const TableOnly: React.FC<TableOnlyProps> = ({
    data,
    headingColOne,
    headingColTwo,
    rowsVisible = 10,
    ...args
}): React.ReactElement => {
    const [workFlows] = useState('');

    const { sortedItems } = useSort(data, rowsVisible, workFlows);

    return (
        <Table {...args}>
            <thead>
                <TableHeaderRow>
                    <TableHeaderTh />
                    <TableHeaderTh>{headingColOne}</TableHeaderTh>
                    <TableHeaderTh>{headingColTwo}</TableHeaderTh>
                </TableHeaderRow>
            </thead>
            <tbody>
                {sortedItems &&
                    sortedItems.map(
                        (
                            item: WorkflowProps | ItemProps,
                        ): React.ReactElement => (
                            <TableBodyRow key={item.colOne}>
                                <TableBodyTd>{item.colOne}</TableBodyTd>
                                <TableBodyTd>{item.colTwo}</TableBodyTd>
                                <TableBodyTd>
                                    <Check>&#10003;</Check>
                                    {item.colThree}
                                </TableBodyTd>
                            </TableBodyRow>
                        ),
                    )}
            </tbody>
        </Table>
    );
};