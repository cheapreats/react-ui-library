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

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

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
        <Table>
            <TableHeaderDiv>
                <TableHead>
                    <TableRow>
                        {columns &&
                            columns.map(
                                (heading): React.ReactElement => (
                                    <TableHeading key={heading}>
                                        {heading === 'totalSpent' ? (
                                            <span
                                                role="button"
                                                tabIndex={0}
                                                onKeyDown={(): void =>
                                                    setIsAscending(!isAscending)
                                                }
                                                onClick={(): void =>
                                                    setIsAscending(!isAscending)
                                                }
                                            >
                                                {heading.toUpperCase()}
                                            </span>
                                        ) : (
                                            <span>{heading.toUpperCase()}</span>
                                        )}
                                    </TableHeading>
                                ),
                            )}
                    </TableRow>
                </TableHead>
            </TableHeaderDiv>
            <TableBodyDiv>
                <TableBody>
                    {sortedItems &&
                        sortedItems.map(
                            (
                                item: CustomerProps | ItemProps,
                            ): React.ReactElement => (
                                <TableRow key={item.name}>
                                    <TableData>
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                        />
                                    </TableData>
                                    <TableData>{item.name}</TableData>
                                    <TableData>
                                        {formatter.format(item.totalSpent)}
                                    </TableData>
                                </TableRow>
                            ),
                        )}
                </TableBody>
            </TableBodyDiv>
        </Table>
    );
};

const Image = styled.img`
    width: 100px;
    height: 100px;
    max-height: 100%;
    display: block;
    ${({ theme }): string => `
   border-radius:${theme.dimensions.radius};
    `}
    border-radius: 20px;
    margin: 10px 0;
    ${Mixins.media(
        'tablet',
        `
        width: 60px;
        height: 60px;
       
    `,
    )}
    ${Mixins.media(
        'phone',
        `
        width: 50px;
        height: 50px;
       
    `,
    )}
`;
const TableHeaderDiv = styled.div`
    border: 1.5px solid rgba(0, 0, 0, 0.1);
    background: white;
    border-bottom: none;
    border-radius: 8px 8px 0 0;
`;

const Table = styled.table`
    width: 100%;
    font-weight: bold;
`;
const TableHeading = styled.th`
    text-align: left;
    cursor: pointer;
`;

const TableData = styled.td`
    margin: auto 0;
    ${({ theme }): string => `
        color:${theme.colors.text};
        font-size:${theme.font.size.default};
    `}
`;

const TableRow = styled.tr`
    display: grid;
    padding-left: 20px;
    grid-template-columns: 1fr 3fr 1fr;
    border-bottom: 1.5px solid rgba(0, 0, 0, 0.1);
    padding: 10px;

    ${Mixins.media(
        'tablet',
        `
       grid-template-columns: 1fr 2fr 1fr;
       
    `,
    )}
`;

const TableBody = styled.tbody`
    display: block;
    background: white;
    border-radius: 0 0 8px 8px;
    border-right: 1.5px solid rgba(0, 0, 0, 0.1);
    border-left: 1.5px solid rgba(0, 0, 0, 0.1);
`;

const TableBodyDiv = styled.div`
    height: 100%;
    max-height: 600px;
    overflow: auto;
    border-collapse: collapse;
    border-top: none;
`;

const TableHead = styled.thead`
    display: block;
`;
