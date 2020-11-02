import React from 'react';

import styled, {useTheme} from "styled-components";
import {IRectangleTable} from "./RectangleTable";

/**
 * Primary UI component for user interaction
 */
export interface ICircleTable { /**
     * The unique identifier for the table
     */
    tableID: string,
    /**
     * The number of chairs at the table
     */
    numOfChairs: number,
    /**
     * The name of the party assigned to the table
     */
    partyName: string,
    /**
     * The occupancy status for the table
     */
    occupancyStatus: occupancyStatusTypes,
    /**
     * The seating/reservation time for the party at the table
     */
    reservationTime: Date,
}

enum occupancyStatusTypes {
    Vacant = "Vacant",
    Reserved = "Reserved",
    Occupied = "Occupied"
}

export const CircleTable: React.FC<ICircleTable>
    = ({
           tableID = 'T1',
           numOfChairs = 4,
           partyName = 'Null',
           occupancyStatus = occupancyStatusTypes.Vacant,
           reservationTime = Date.now(),
           ...props
       }) => {
    const {colors} = useTheme();

    const occupancyColor = getOccupancyColor(occupancyStatus);

    function getOccupancyColor(status: occupancyStatusTypes) {
        if (occupancyStatus === occupancyStatusTypes.Vacant) {
            return colors.occupancyStatusColors.Vacant;
        } if (occupancyStatus === occupancyStatusTypes.Reserved) {
            return colors.occupancyStatusColors.Reserved;
        }
        return colors.occupancyStatusColors.Occupied;

    }

    return (
        <div>
            <TableBody>
                <RowMargin0>
                    <Col6P0>
                        <RowM0H25>
                        </RowM0H25>

                        <RowM0H25>
                        </RowM0H25>

                        <RowM0H25>
                            <Col6MxAutoMt5>
                                <TextWhiteDiv>
                                    {tableID}
                                </TextWhiteDiv>
                                <TextWhiteDiv>{partyName}</TextWhiteDiv>
                                <TextOccupancyColor occupancyColor={getOccupancyColor(occupancyStatus)}>{occupancyStatus}</TextOccupancyColor>
                            </Col6MxAutoMt5>
                        </RowM0H25>
                    </Col6P0>
                    <Col4P0>
                    </Col4P0>
                </RowMargin0>
            </TableBody>
        </div>
    );
};
const TableBody = styled.div`
         height: 22em;
         width: 22em;
         background-color: #bbb;
         border-radius: 50%;
         border-style: solid;
         border-color: black;
         border-width: 3px !important;
    `;
const Row = styled.div`
        display: flex;
        flex-wrap: wrap;
        margin-right: 15px;
        margin-left: 15px;
    `;

const RowMargin0 = styled(Row)`
        margin: 0 !important;  
    `;

const RowM0H25 = styled(RowMargin0)`
        height: 25% !important;  
    `;

const Col = styled.div`
        flex-basis: 0;
        flex-grow: 1;
        max-width: 100%;
    `;
const Col4P0 = styled.div`
        flex: 0 0 33.333333%;
        max-width: 33.333333%;
        position: relative;
        width: 100%;
    `;
const Col6P0 = styled.div`
        flex: 0 0 50%;
        max-width: 50%;
        position: relative;
        width: 100%;
    `;
const Col6MxAutoMt5 = styled(Col6P0)`
        padding-right: 15px;
        padding-left: 15px;
        margin-left: auto !important;
        margin-right: auto !important;
        margin-top: 3rem !important;
    `;

const TextWhiteDiv = styled.div`
        color: #fff !important;
    `;
const TextOccupancyColor = styled.div`
       //color: ${({theme}) => theme.colors.primary} !important;
       color: ${ ({occupancyColor}) => occupancyColor } !important;
        
    `;