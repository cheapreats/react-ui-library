/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable indent */
import React, { useState } from 'react';
import styled from 'styled-components';
import { MainInterface, ResponsiveInterface } from '@Utils/BaseStyles';
import { Check } from '@styled-icons/boxicons-regular/Check';
import { media } from '../../Utils/Mixins';

interface WorkflowProps { 
    reportName: string; 
    reportManual: string; 
    reportAuto: string;
}

interface ItemProps { 
    reportName: string; 
    reportManual: string; 
    reportAuto: string; 
}

export interface TableProps extends MainInterface, ResponsiveInterface {
    data: WorkflowProps[] | ItemProps[];
    rowsVisible?: number; 
    traditional: string;
    stripe: string; 
}

interface UseSortReturnType {
    sortedItems: (WorkflowProps | ItemProps)[];
    setIsAscending: React.Dispatch<React.SetStateAction<boolean>>;
    isAscending: boolean;    
}

/**
 * I got this code from RankingTabe component 
 * 
 * @param rowData 
 * @param rowLimit 
 * @param timeInterval 
 * @returns 
 */
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

export const Table: React.FC<TableProps> = ({
    data, 
    traditional,
    stripe,
    rowsVisible = 10,   
}): React.ReactElement => {
    const [workFlows ] = useState(
        '',
    );     
    const { sortedItems } = useSort(
        data,
        rowsVisible,
        workFlows,
    );

    return ( 
        <ITable>
            <thead>
                <tr>  
                    <Th />
                    <Th>
                        {traditional}
                    </Th>
                    <Th>
                        {stripe}
                    </Th> 
                </tr>
            </thead>
            <tbody>
                {sortedItems &&
                    sortedItems.map(
                        (
                            item: WorkflowProps | ItemProps,
                        ): React.ReactElement => (
                            <BodyRow>
                                <BodyTd>{item.reportName}</BodyTd> 
                                <BodyTd>{item.reportManual}</BodyTd>
                                <BodyTd>
                                    <ICheck />
                                    {item.reportAuto}
                                </BodyTd>
                            </BodyRow>
                        ),
                    )}
            </tbody>
        </ITable> 
    );
};

/** styled */
const ITable = styled.table`
    border-collapse:collapse;
    overflow: hidden;
    padding: 0;
    width: 100%;
`;  
const Th = styled.th`
    text-align: left;
    padding: 0 1rem .5rem; 
`; 
const BodyRow = styled.tr` 
    :nth-child(odd) {
        background-color: ${({ theme }) => theme.colors.primary};
    }
    :nth-child(even) {
        background-color: ${({ theme }) => theme.colors.PieChartColors.Red};
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
const BodyTd = styled.td` 
    color: ${({ theme }) => theme.colors.input.default};
    padding: .8rem;
    :first-child {
        font-weight: 600;
    }
    ${media('phone', 'padding: 8px;font-size: .8rem')} 
`;
const ICheck = styled(Check)`  
    margin-right: 10px;  
    color: ${({ theme }) => theme.colors.text};
    background-color: ${({ theme }) => theme.colors.input.error};
    width: 15px;
    border-radius: 50%;
    padding: 2px; 
`;