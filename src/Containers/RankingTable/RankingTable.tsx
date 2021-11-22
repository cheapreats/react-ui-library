/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable indent */
import React, { useState } from 'react';
import styled from 'styled-components';
import { CaretUp as AngleUp } from '@styled-icons/fa-solid/CaretUp';
import { MainInterface, ResponsiveInterface } from '@Utils/BaseStyles';
import { Heading } from '@Text/Heading';
import { Mixins } from '@Utils';
import { Select } from '../../Inputs/Select/Select';

interface CustomerProps {
    name: string;
    image: string;
    totalSpent: number;
    totalSpent1D: number;
    totalSpent1W: number;
    totalSpent1M: number;
    totalSpent1Y?: number;
}
interface ItemProps {
    name: string;
    image: string;
    totalSpent: number;
    totalSpent1D: number;
    totalSpent1W: number;
    totalSpent1M: number;
    totalSpent1Y?: number;
}

export interface RankingTableProps extends MainInterface, ResponsiveInterface {
    data: CustomerProps[] | ItemProps[];
    rowsVisible?: number;
    IsTimeIntervalFilterVisible?: boolean;
    title: string;
}

interface StyledIconProps {
    isAscending: boolean;
}

interface UseSortReturnType {
    sortedItems: (CustomerProps | ItemProps)[];
    setIsAscending: React.Dispatch<React.SetStateAction<boolean>>;
    isAscending: boolean;
}

enum TimeIntervalEnum {
    totalSpent1D = 'totalSpent1D',
    totalSpent1W = 'totalSpent1W',
    totalSpent1M = 'totalSpent1M',
    totalSpent1Y = 'totalSpent1Y',
    totalSpent = 'totalSpent',
}

const abbreviateNumber = (value: number | string): string => {
    const EXPENSE_INDICATOR = '$';

    let newValue = value;
    if (value >= 1000) {
        const suffixes = ['', 'k', 'm', 'b', 't'];
        const suffixNum = Math.floor(`${value}`.length / 3);
        let shortValue: string | number = '';
        for (let precision = 2; precision >= 1; precision -= 1) {
            shortValue = parseFloat(
                (suffixNum !== 0
                    ? (value as number) / 1000 ** suffixNum
                    : (value as number)
                ).toPrecision(precision),
            );
            const dotLessShortValue = `${shortValue}`.replace(
                /[^a-zA-Z 0-9]+/g,
                '',
            );
            if (dotLessShortValue.length <= 2) {
                break;
            }
        }
        if ((shortValue as number) % 1 !== 0)
            shortValue = (shortValue as number).toFixed(1);
        newValue = shortValue + suffixes[suffixNum];
    }
    return (EXPENSE_INDICATOR + newValue) as string;
};

const useSort = (
    rowData: CustomerProps[] | ItemProps[],
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

export const RankingTable: React.FC<RankingTableProps> = ({
    data,
    rowsVisible = 10,
    title,
    IsTimeIntervalFilterVisible = false,
    ...restProps
}): React.ReactElement => {
    const [selectedTimeInterval, setSelectedTimeInterval] =
        useState('totalSpent');
    const columns = data[0] && Object.keys(data[0]).slice(0, 3);

    const { sortedItems, setIsAscending, isAscending } = useSort(
        data,
        rowsVisible,
        selectedTimeInterval,
    );

    const filterTotalSpent = (timeInterval: TimeIntervalEnum): void => {
        switch (timeInterval) {
            case TimeIntervalEnum.totalSpent1D:
                setSelectedTimeInterval(TimeIntervalEnum.totalSpent1D);
                break;
            case TimeIntervalEnum.totalSpent1W:
                setSelectedTimeInterval(TimeIntervalEnum.totalSpent1W);
                break;
            case TimeIntervalEnum.totalSpent1M:
                setSelectedTimeInterval(TimeIntervalEnum.totalSpent1M);
                break;
            case TimeIntervalEnum.totalSpent1Y:
                setSelectedTimeInterval(TimeIntervalEnum.totalSpent1Y);
                break;
            case TimeIntervalEnum.totalSpent:
                setSelectedTimeInterval(TimeIntervalEnum.totalSpent);
                break;
            default:
                setSelectedTimeInterval(TimeIntervalEnum.totalSpent);
        }
    };

    return (
        <div {...restProps}>
            <TitleAndTimeIntervalDiv>
                <Title bold>{title}</Title>
                {IsTimeIntervalFilterVisible && (
                    <TimeIntervalDiv>
                        <Select
                            placeholder="All Time"
                            onChange={({
                                target,
                            }: {
                                target: HTMLInputElement;
                            }): void => {
                                filterTotalSpent(
                                    target.value as TimeIntervalEnum,
                                );
                            }}
                            value={selectedTimeInterval}
                        >
                            <option value={TimeIntervalEnum.totalSpent1D}>
                                One Day
                            </option>
                            <option value={TimeIntervalEnum.totalSpent1W}>
                                One Week
                            </option>
                            <option value={TimeIntervalEnum.totalSpent1M}>
                                One Month
                            </option>
                            <option value={TimeIntervalEnum.totalSpent1Y}>
                                One Year
                            </option>
                            <option value={TimeIntervalEnum.totalSpent}>
                                All Time
                            </option>
                        </Select>
                    </TimeIntervalDiv>
                )}
            </TitleAndTimeIntervalDiv>
            <Table>
                <TableHeaderDiv>
                    <TableHead>
                        <TableRow>
                            {columns &&
                                columns.map(
                                    (heading): React.ReactElement => (
                                        <TableHeading key={heading}>
                                            {heading === 'totalSpent' ? (
                                                <TotalSpentDiv>
                                                    <span
                                                        role="button"
                                                        tabIndex={0}
                                                        onClick={(): void =>
                                                            setIsAscending(
                                                                !isAscending,
                                                            )
                                                        }
                                                    >
                                                        {heading.toUpperCase()}
                                                    </span>

                                                    <StyledArrowIcon
                                                        isAscending={
                                                            isAscending
                                                        }
                                                    />
                                                </TotalSpentDiv>
                                            ) : (
                                                <span>
                                                    {heading.toUpperCase()}
                                                </span>
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
                                            {abbreviateNumber(
                                                item[selectedTimeInterval],
                                            )}
                                        </TableData>
                                    </TableRow>
                                ),
                            )}
                    </TableBody>
                </TableBodyDiv>
            </Table>
        </div>
    );
};

const Image = styled.img`
    width: 65px;
    height: 65px;
    max-height: 100%;
    display: block;
    border-radius: 15px;

    margin: 10px 0;
    ${Mixins.media(
        'tablet',
        `
        width: 50px;
        height: 50px;
       
    `,
    )}
    ${Mixins.media(
        'phone',
        `
        width: 40px;
        height: 40px;
       
    `,
    )}
`;

const TimeIntervalDiv = styled.div`
    padding-top: 5px;
    width: 100%;
    max-width: 200px;
    ${Mixins.media(
        'tablet',
        `
    
      max-width: 100px;
       
    `,
    )}
`;

const TitleAndTimeIntervalDiv = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 5px;
`;

const Title = styled(Heading)`
    margin-bottom: 4px;
    ${Mixins.media(
        'tablet',
        `
    
      font-size: 22px;
       
    `,
    )}
`;

const TotalSpentDiv = styled.div`
    display: flex;
    flex-direction: row;
`;

const StyledArrowIcon = styled(AngleUp)<StyledIconProps>`
    ${Mixins.transition(['transform'])};
    ${({ isAscending }): string =>
        isAscending ? 'transform:rotate(0)' : 'transform:rotate(180deg)'};
    margin-top: 2px;
    width: 17px;
    height: 17px;
`;

const TableHeaderDiv = styled.div`
    ${({ theme }): string => `
    border: 1.5px solid ${theme.colors.border};
    background: ${theme.colors.background};
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

    ${Mixins.media(
        'phone',
        `
       font-size: 0.85rem;
       
    `,
    )}
`;

const TableData = styled.td`
    margin: auto 0;
    ${({ theme }): string => `
        color:${theme.colors.text};
        font-size:${theme.font.size.default};
    `}
    ${Mixins.media(
        'phone',
        `
       font-size: 0.85rem;
       
    `,
    )}
`;

const TableRow = styled.tr`
    display: grid;
    padding-left: 20px;
    grid-template-columns: 1fr 3fr 1fr;
    ${({ theme }): string => `
    border-bottom: 1.5px solid ${theme.colors.border};
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
    background: ${theme.colors.background};
    border-color: ${theme.colors.border};
    border-style: solid;
    border-width: 0 1.5px;
    `}

    border-radius: 0 0 8px 8px;
`;

const TableBodyDiv = styled.div`
    ${Mixins.scroll};
    height: 100%;
    max-height: 600px;
    overflow: auto;
    border-collapse: collapse;
    border-top: none;
`;

const TableHead = styled.thead`
    display: block;
`;
