import React from 'react';
import styled, { useTheme } from 'styled-components';
import { occupancyStatusTypes } from "@Containers/CircleTable2/CircleTable2";

export interface IRectangleTable {
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

/**
 * Primary UI component for user interaction
 */
export const RectangleTable: React.FC<IRectangleTable> = ({
    tableID = 'T1',
    numOfChairs = 4,
    partyName = 'Null',
    occupancyStatus = occupancyStatusTypes.Vacant,
    ...props
}) => {
    const { colors } = useTheme();

    /**
     * Generates a unique key based on a string and a current timestamp
     * @param pre - a string to append to timestamp
     * @returns {string} a unique key
     */
    function generateKey(pre: string): string {
        return `${pre}_${new Date().getTime()}`;
    }

    /**
     * checks numOfChairs is between 1-6
     *
     * @returns returns {number} of chairs of the component.
     */
    function getChairs(): number {
        if (numOfChairs < 3) {
            return 2;
        }

        if (numOfChairs % 2 !== 0) {
            return numOfChairs + 1;
        }

        return numOfChairs;
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
        <StyledTable numOfChairs={getChairs()} {...props}>
            <div>
                <RowMargin0>
                    {[...Array(getChairs() / 2)].map((e, i) => (
                        <Col key={generateKey(`${i}`)}>
                            <Row>
                                <TopChair />
                            </Row>
                        </Col>
                    ))}
                </RowMargin0>
            </div>

            <TableBody>
                <RowMargin0>
                    <Col6P0>
                        <RowM0H25>
                            <Col6MxAutoMt3TxtLt>
                                {tableID}
                                <TextWhiteDiv>{partyName}</TextWhiteDiv>
                                <TextOccupancyColor
                                    occupancyColor={getOccupancyColor()}
                                >
                                    {occupancyStatus}
                                </TextOccupancyColor>
                            </Col6MxAutoMt3TxtLt>
                        </RowM0H25>
                        <RowM0H25 />
                        <RowM0H50 />
                    </Col6P0>
                    <Col4P0 />
                    <ColorBand occupancyColor={getOccupancyColor()} />
                </RowMargin0>
            </TableBody>

            <div>
                <RowMargin0>
                    {[...Array(getChairs() / 2)].map((e, i) => (
                        <Col key={generateKey(`${i}`)}>
                            <Row>
                                <BottomChair />
                            </Row>
                        </Col>
                    ))}
                </RowMargin0>
            </div>
        </StyledTable>
    );
};

/**
 * variables for the styled components
 */

interface IStyledTable {
    numOfChairs: number;
}
const StyledTable = styled.div<IStyledTable>`
    width: ${({ numOfChairs }) => numOfChairs * 11}em;
`;

const TopChair = styled.div`
    height: 3em;
    border-top-left-radius: 3rem;
    border-top-right-radius: 3rem;
    flex: 0 0 50%;
    max-width: 50%;
    background-color: #6c757d;
    margin: auto;
`;

const TableBody = styled.div`
    height: 22em;
    border-radius: 3rem;
    background-color: #6c757d;
    margin: 0.25rem;
`;

const BottomChair = styled.div`
    height: 3em;
    border-bottom-left-radius: 3rem;
    border-bottom-right-radius: 3rem;
    flex: 0 0 50%;
    max-width: 50%;
    background-color: #6c757d;
    margin: auto !important;
`;

interface IColorBand {
    occupancyColor: string;
}

const ColorBand = styled.div<IColorBand>`
    border-top-right-radius: 3rem;
    border-bottom-right-radius: 3rem;
    height: 22em;
    flex: 0 0 16.666667%;
    max-width: 16.666667%;
    position: relative;
    width: 100%;
    background-color: ${({ occupancyColor }) => occupancyColor};
`;

const Row = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-right: 15px;
    margin-left: 15px;
`;

const RowMargin0 = styled(Row)`
    margin: 0;
`;

const RowM0H25 = styled(RowMargin0)`
    height: 25%;
`;

const RowM0H50 = styled(RowMargin0)`
    height: 50%;
`;

const Col = styled.div`
    flex-basis: 0;
    flex-grow: 1;
    max-width: 100%;
`;

const Col6P0 = styled.div`
    flex: 0 0 50%;
    max-width: 50%;
    position: relative;
    width: 100%;
`;

const Col4P0 = styled.div`
    flex: 0 0 33.333333%;
    max-width: 33.333333%;
    position: relative;
    width: 100%;
`;

const Col6MxAutoMt3TxtLt = styled(Col6P0)`
    padding-right: 15px;
    padding-left: 15px;
    color: #f8f9fa;
    margin-left: auto;
    margin-right: auto;
    margin-top: 1rem;
`;

const TextWhiteDiv = styled.div`
    color: #fff;
`;

interface ITextOccupancyColor {
    occupancyColor: string;
}

const TextOccupancyColor = styled.div<ITextOccupancyColor>`
    color: ${({ occupancyColor }) => occupancyColor};
`;
