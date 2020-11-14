import React from 'react';
import styled, {useTheme} from 'styled-components';
import { ChairRow } from './ChairRow';

export interface ISquareTable {
    /**
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
    occupancyStatus: string,
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

/**
 * Primary UI component for user interaction
 * Square Table
 */
export const SquareTable: React.FC<ISquareTable>
    = ({
           tableID = 'T1',
           numOfChairs = 4,
           partyName = 'Null',
           occupancyStatus = occupancyStatusTypes.Vacant,
           reservationTime = Date.now(),
           ...props
       }) => {

    const chairNumOnSide= getChairNumOnSide(numOfChairs);
    const {colors} = useTheme();

    /**
     * This function will determine how many chair to put per each side
     * of the table (left, right, top, bottom)
     * @param numOfChairs {number} - Total number of chairs per table
     * @return {number} - Number of chair per table side
     */
    function getChairNumOnSide(numOfChairs: number){

        if(numOfChairs < 1){
            return 1;
        }
        if(numOfChairs%4===0){
            return numOfChairs/4;
        }
        return Math.floor(numOfChairs/4)+1;
    }

    /**
     * This function will determine what color should be the Status and ColorDiv
     * and return hexadecimal color value
     * @param occupancyStatus {string} - Occupancy status
     * @return {string} - Hexadecimal color value
     */
    function getOccupancyColor(status: occupancyStatusTypes) {

        switch (occupancyStatus) {
            case occupancyStatusTypes.Vacant:
                return colors.occupancyStatusColors.Vacant;

            case occupancyStatusTypes.Reserved:
                return colors.occupancyStatusColors.Reserved;

            case occupancyStatusTypes.Occupied:
                return colors.occupancyStatusColors.Occupied;
        }

    }

    return (
        <div>
            {/** chairs top */}
            <ChairRow position='top' chairNumOnSide={chairNumOnSide} />

            {/** table itself */}
            <div>
                <Row>

                    {/** chairs left */}
                    <ChairRow position='left' chairNumOnSide={chairNumOnSide} />

                    <TableBody chairNumOnSide={chairNumOnSide}>
                        <Row>
                            <TableInfo>
                                <div>
                                    {tableID+"\n"+partyName}
                                    <Status occupancyColor={getOccupancyColor(occupancyStatus)}>{occupancyStatus}</Status>
                                </div>
                            </TableInfo>
                            <ColorDiv chairNumOnSide={chairNumOnSide} occupancyColor={ getOccupancyColor(occupancyStatus)} />
                        </Row>
                    </TableBody>

                    {/** chairs right */}
                    <ChairRow position='right' chairNumOnSide={chairNumOnSide} />
                </Row>
            </div>

            {/** chairs bottom */}
            <ChairRow position='bottom' chairNumOnSide={chairNumOnSide} />

        </div>
    );
};

/**
 * variables for the styled components
 */
const TableBody=styled.div`
        height: ${(chairNumOnSide) => chairNumOnSide * 20}rem;
        width: ${({chairNumOnSide}) => chairNumOnSide * 20}rem;
        border-radius: 3rem;
        background-color: #6c757d;
`;

const ColorDiv=styled.div`
        height: ${({chairNumOnSide}) => chairNumOnSide * 20}rem;
        width: 3rem;
        margin-left:auto;
        margin-right: .95rem;
        border-top-right-radius: 3rem;
        border-bottom-right-radius: 3rem;
        background-color: ${ ({occupancyColor}) => occupancyColor };
`;

const Row=styled.div`
        display: flex;
        flex-wrap: wrap;
        margin-right: -15px;
        margin-left: -15px;
`;

const TableInfo=styled.div`
        color: #f8f9fa;
        margin-top: 2rem;
        margin-left: 3rem;
        white-space: pre-line;
`;

const Status = styled.div`
        
        color: ${ ({occupancyColor}) => occupancyColor };
`;