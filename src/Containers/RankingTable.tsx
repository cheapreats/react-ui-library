/* eslint-disable indent */
import React, { useState } from 'react';
import styled from 'styled-components';
import { CaretUp as AngleUp } from '@styled-icons/fa-solid/CaretUp';
import { transition } from '@Utils/Mixins';
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

interface StyledIconProps {
    isAscending: boolean;
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
    rowData: CustomerProps[] | ItemProps[],
    rowLimit: number,
): UseSortReturnType => {
    const [isAscending, setIsAscending] = useState(true);

    let sortedItems;
    if (isAscending) {
        sortedItems = [...rowData]
            .sort((a, b): number => +b.totalSpent - +a.totalSpent)
            .slice(0, rowLimit);
    } else {
        sortedItems = [...rowData]
            .sort((a, b): number => +a.totalSpent - +b.totalSpent)
            .slice(0, rowLimit);
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
                                    <TableHeading>
                                        {heading === 'totalSpent' ? (
                                            <TotalSpentDiv>
                                                <span
                                                    role="button"
                                                    tabIndex={0}
                                                    onKeyDown={(): void =>
                                                        setIsAscending(
                                                            !isAscending,
                                                        )
                                                    }
                                                    onClick={(): void =>
                                                        setIsAscending(
                                                            !isAscending,
                                                        )
                                                    }
                                                >
                                                    {heading.toUpperCase()}
                                                </span>

                                                <StyledArrowIcon
                                                    isAscending={isAscending}
                                                />
                                            </TotalSpentDiv>
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
                                <TableRow>
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
    width: 75px;
    height: 75px;
    max-height: 100%;
    display: block;
    border-radius: 15px;

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

const TotalSpentDiv = styled.div`
    display: flex;
    flex-direction: row;
`;

const StyledArrowIcon = styled(AngleUp)<StyledIconProps>`
    ${transition(['transform'])};
    ${({ isAscending }): string =>
        isAscending ? 'transform:rotate(0)' : 'transform:rotate(180deg)'};
    margin-top: 2px;
    width: 17px;
    height: 17px;
`;

const TableHeaderDiv = styled.div`
    ${({ theme }): string => `
    border: 1.5px solid ${theme.colors.text + 20};
    background: ${theme.colors.input};
    `}
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
    ${({ theme }): string => `
    border-bottom: 1.5px solid ${theme.colors.text + 20};
     padding: ${theme.dimensions.padding.default};
    `};

    ${Mixins.media(
        'tablet',
        `
       grid-template-columns: 1fr 2fr 1fr;
       
    `,
    )}
`;

const TableBody = styled.tbody`
    display: block;
    ${({ theme }): string => `
    background: ${theme.colors.input};
    border-color: ${theme.colors.text + 20};
    border-style: solid;
    border-width: 0 1.5px;
    `}

    border-radius: 0 0 8px 8px;
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
