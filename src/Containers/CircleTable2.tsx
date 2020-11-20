import React from 'react';
import styled, { useTheme } from 'styled-components';
import { ChairRow } from './ChairRow';

export interface ICircleTable2 {
    /**
     * The unique identifier for the table
     */
    tableID: string;
    /**
     * The number of chairs at the table
     */
    numOfChairs: number;
    /**
     * The name of the party assigned to the table
     */
    partyName: string;
    /**
     * The occupancy status for the table
     */
    occupancyStatus: occupancyStatusTypes;
    /**
     * The seating/reservation time for the party at the table
     */
    reservationTime?: Date;
}

enum occupancyStatusTypes {
    Vacant = 'Vacant',
    Reserved = 'Reserved',
    Occupied = 'Occupied',
}

/**
 * Primary UI component for user interaction
 */
export const CircleTable2: React.FC<ICircleTable2> = ({
    tableID = 'T1',
    numOfChairs = 4,
    partyName = 'Null',
    occupancyStatus = occupancyStatusTypes.Vacant,
    ...props
}) => {

    const { colors } = useTheme();

    /**
     * This function will calculate the number of chairs for each table side
     * return 1 if numOfChairs is below 0
     * returns the number of the chairs / 4 so it can be called on each side
     */
    function getChairNumOnSide() {
        if (numOfChairs < 1) {
            return 1;
        }

        if (numOfChairs % 4 === 0) {
            return numOfChairs / 4;
        }

        return Math.floor(numOfChairs / 4) + 1;
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
            return "";
        }
    }

    return (
        <div {...props}>
            {/** chairs top */}
            <ChairRow position="top" chairNumOnSide={getChairNumOnSide()} />

            {/** table itself */}
            <div>
                <Row>
                    {/** chairs left */}
                    <ChairRow position="left" chairNumOnSide={getChairNumOnSide()} />

                    <TableBody
                        chairNumOnSide={getChairNumOnSide()}
                        occupancyColor={getOccupancyColor()}
                    >
                        <Row>
                            <TableInfo>
                                <div>
                                    {tableID}
                                    <br />
                                    {partyName}
                                    <br />
                                    <Status
                                        occupancyColor={getOccupancyColor()}
                                    >
                                        {occupancyStatus}
                                    </Status>
                                    <br />
                                </div>
                            </TableInfo>
                        </Row>
                    </TableBody>

                    {/** chairs right */}
                    <ChairRow
                        position="right"
                        chairNumOnSide={getChairNumOnSide()}
                    />
                </Row>
            </div>

            {/** chairs bottom */}
            <ChairRow position="bottom" chairNumOnSide={getChairNumOnSide()} />
        </div>
    );
};

/**
 * Variables for the styled components
 */

interface ITableBody {
    chairNumOnSide: number,
    occupancyColor: string,
}


const TableBody = styled.div<ITableBody>`
    height: ${({ chairNumOnSide }) => chairNumOnSide * 20}rem;
    width: ${({ chairNumOnSide }) => chairNumOnSide * 20}rem;
    border-radius: 50%;
    background-color: #6c757d;
    border-style: solid;
    border-color: ${({ occupancyColor }) => occupancyColor};
    border-width: 3px;
`;

const Row = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-right: -15px;
    margin-left: -15px;
`;

const TableInfo = styled.div`
    color: #f8f9fa;
    margin-top: 4rem;
    margin-left: auto;
    width: 75%;
`;

interface IStatus {
    occupancyColor: string,
}

const Status = styled.div<IStatus>`
    color: ${({ occupancyColor }) => occupancyColor};
`;
