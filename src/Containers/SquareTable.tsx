/**
 * Documentation – the order of chairs are in the chairs array will populate the table from top left to the bottom right
 * “the purpose of the order in the array is to populate the chairs from top left to bottom right”
 */
import React from 'react';
import styled, { useTheme } from 'styled-components';
import { IChair } from '@Containers/Chair';
import { ChairRow } from './ChairRow';

type getTableSizeType = (
    top: number,
    bottom: number,
    left: number,
    right: number,
) => number;

export interface ISquareTable {
    /**
     * The unique identifier for the table
     */
    tableID: string;
    /**
     * The name of the party assigned to the table
     */
    partyName: string;
    /**
     * The occupancy status for the table
     */
    occupancyStatus: occupancyStatusTypes;
    /**
     * Array of chairs
     */
    chairs: Array<IChair>;
}

enum occupancyStatusTypes {
    Vacant = 'Vacant',
    Reserved = 'Reserved',
    Occupied = 'Occupied',
}

/**
 * Primary UI component for user interaction
 * Square Table
 */
export const SquareTable: React.FC<ISquareTable> = ({
    tableID = 'T1',
    partyName = 'Null',
    occupancyStatus = occupancyStatusTypes.Vacant,
    chairs = [],
    ...props
}) => {
    /**
     * Split chairs array into four arrays for each table side
     */
    const topArray = chairs.filter((i) => i.position === 'top');
    const rightArray = chairs.filter((i) => i.position === 'right');
    const leftArray = chairs.filter((i) => i.position === 'left');
    const bottomArray = chairs.filter((i) => i.position === 'bottom');

    /**
     * Get proper theme color for the table
     */
    const { colors } = useTheme();

    /**
     * This function will determine how many chair to put per each side
     * of the table (left, right, top, bottom)
     * @param top {number} - Number of chairs on top side
     * @param bottom {number} - Number of chairs on bottom side
     * @param left {number} - Number of chairs on left side
     * @param right {number} - Number of chairs on right side
     * @return {number} - The largest number of chairs
     */
    const getTableSize: getTableSizeType = (top, bottom, left, right) => {
        return Math.max(top, bottom, left, right);
    };

    const tableSize = getTableSize(
        topArray.length,
        bottomArray.length,
        leftArray.length,
        rightArray.length,
    );

    /**
     * This function will determine if there are left chairs
     * to correct top or bottom row's margins
     * @return {boolean} - Returns true if there are left chairs, otherwise false
     */
    function isSideChairs() {
        const left = chairs.map((i) => i.position === 'left').length;
        return left > 0;
    }

    /**
     * This function will determine what color should be the Status and ColorDiv
     * and return hexadecimal color value
     *
     * @return {string} - Hexadecimal color value
     */
    function getOccupancyColor(): string {
        switch (occupancyStatus) {
            case occupancyStatusTypes.Vacant:
                return colors.occupancyStatusColors.Vacant;

            case occupancyStatusTypes.Reserved:
                return colors.occupancyStatusColors.Reserved;

            case occupancyStatusTypes.Occupied:
                return colors.occupancyStatusColors.Occupied;

            default:
                return '';
        }
    }

    return (
        <div {...props}>
            {/** chairs top */}
            <ChairRow
                position="top"
                chairs={topArray}
                sideChairs={isSideChairs()}
            />

            {/** table itself */}
            <div>
                <Row>
                    {/** chairs left */}
                    <ChairRow
                        position="left"
                        chairs={leftArray}
                        sideChairs={isSideChairs()}
                    />

                    <TableBody chairNumOnSide={tableSize}>
                        <Row>
                            <TableInfo>
                                <div>
                                    {`${tableID}\n${partyName}`}
                                    <Status
                                        occupancyColor={getOccupancyColor()}
                                    >
                                        {occupancyStatus}
                                    </Status>
                                </div>
                            </TableInfo>
                            <ColorDiv
                                chairNumOnSide={tableSize}
                                occupancyColor={getOccupancyColor()}
                            />
                        </Row>
                    </TableBody>

                    {/** chairs right */}
                    <ChairRow
                        position="right"
                        chairs={rightArray}
                        sideChairs={isSideChairs()}
                    />
                </Row>
            </div>

            {/** chairs bottom */}
            <ChairRow
                position="bottom"
                chairs={bottomArray}
                sideChairs={isSideChairs()}
            />
        </div>
    );
};

/**
 * variables for the styled components
 */

interface ITableBody {
    chairNumOnSide: number;
}

const TableBody = styled.div<ITableBody>`
    height: ${({ chairNumOnSide }) => chairNumOnSide * 20}rem;
    width: ${({ chairNumOnSide }) => chairNumOnSide * 20}rem;
    border-radius: 3rem;
    background-color: #6c757d;
`;

interface IColorDiv {
    chairNumOnSide: number;
    occupancyColor: string;
}

const ColorDiv = styled.div<IColorDiv>`
    height: ${({ chairNumOnSide }) => chairNumOnSide * 20}rem;
    width: 3rem;
    margin-left: auto;
    margin-right: 0.95rem;
    border-top-right-radius: 3rem;
    border-bottom-right-radius: 3rem;
    background-color: ${({ occupancyColor }) => occupancyColor};
`;

const Row = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-right: -15px;
    margin-left: -15px;
`;

const TableInfo = styled.div`
    color: #f8f9fa;
    margin-top: 2rem;
    margin-left: 3rem;
    white-space: pre-line;
`;

interface IStatus {
    occupancyColor: string;
}

const Status = styled.div<IStatus>`
    color: ${({ occupancyColor }) => occupancyColor};
`;
