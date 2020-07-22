/* eslint-disable indent */
import React, { useState } from 'react';
import styled from 'styled-components';
import { Mixins } from '../Utils';

interface CustomerProps {
    name: string;
    image: string;
    totalSpent: number;
}
interface ItemProps {
    name: string;
    image: string;
    totalSpent: number;
}

interface RankingTableProps {
    data: CustomerProps[] | ItemProps[];
    rowsVisible?: number;
    IsTimeIntervalFilterVisible?: boolean;
}

interface UseSortReturnType {
    sortedItems: (CustomerProps | ItemProps)[];
    setIsAscending: React.Dispatch<React.SetStateAction<boolean>>;
    isAscending: boolean;
}

const useSort = (
    data: CustomerProps[] | ItemProps[],
    rows: number,
): UseSortReturnType => {
    const [isAscending, setIsAscending] = useState(true);

    let sortedItems;
    if (isAscending) {
        sortedItems = [...data]
            .sort((a, b): number => +b.totalSpent - +a.totalSpent)
            .slice(0, rows);
    } else {
        sortedItems = [...data]
            .sort((a, b): number => +a.totalSpent - +b.totalSpent)
            .slice(0, rows);
    }
    return { sortedItems, setIsAscending, isAscending };
};

export const RankingTable: React.FC<RankingTableProps> = ({
    data,
    rowsVisible = 10,
    IsTimeIntervalFilterVisible = false,
}): React.ReactElement => {
    const columns = data[0] && Object.keys(data[0]);

    const { sortedItems, setIsAscending, isAscending } = useSort(
        data,
        rowsVisible,
    );

    return (
        <TableBodyDiv>
            <Table>
                <thead>
                    <tr>
                        {columns &&
                            columns.map(
                                (heading): React.ReactElement => (
                                    <TableHeading>
                                        {heading === 'totalSpent' ? (
                                            <button
                                                type="button"
                                                onClick={(): void =>
                                                    setIsAscending(!isAscending)
                                                }
                                            >
                                                {heading.toUpperCase()}
                                            </button>
                                        ) : (
                                            <span>{heading.toUpperCase()}</span>
                                        )}
                                    </TableHeading>
                                ),
                            )}
                    </tr>
                </thead>
                <tbody>
                    {sortedItems &&
                        sortedItems.map(
                            (
                                item: CustomerProps | ItemProps,
                            ): React.ReactElement => (
                                <TableRow>
                                    {columns.map(
                                        (column): React.ReactElement =>
                                            typeof item[column] === 'string' &&
                                            item[column].match(
                                                /\.(jpeg|jpg|gif|png)$/,
                                            ) ? (
                                                <TableData>
                                                    <Image
                                                        src={item[column]}
                                                        alt={column}
                                                    />
                                                </TableData>
                                            ) : (
                                                <TableData>
                                                    {item[column]}
                                                </TableData>
                                            ),
                                    )}
                                </TableRow>
                            ),
                        )}
                </tbody>
            </Table>
        </TableBodyDiv>
    );
};

const Image = styled.img`
    width: 120px;
    height: 120px;
    max-height: 100%;
    display: block;
    border-radius: 20px;
    margin: 10px 0;
    ${Mixins.media(
        'phone',
        `
        width: 80px;
        height: 80px;
        border-radius: 15px;
    `,
    )}
`;

const Table = styled.table`
    width: 100%;
`;
const TableHeading = styled.th`
    text-align: left;
    cursor: pointer;
`;

const TableData = styled.td`
    ${({ theme }): string => `
        color:${theme.colors.text};
        font-size:${theme.font.size.default};
    `}
    border-bottom: 1.5px solid rgba(0, 0, 0, 0.1);
`;

const TableRow = styled.tr``;

const TableBodyDiv = styled.div`
    height: 100%;
    max-height: 600px;
    overflow: auto;
    border-collapse: collapse;
    border-top: none;
    border-radius: 0 0 8px 8px;
`;
