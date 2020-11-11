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
     * This function will calculate the number of chairs for each table side
     * return 1 if numOfChairs is below 0
     * returns the number of the chairs / 4 so it can be called on each side
     */

    function getChairNumOnSide(numOfChairs: number){

        if(numOfChairs < 1){
            return 1;
        }

        if(numOfChairs%4==0){
            return numOfChairs/4;
        }
        else{
            return Math.floor(numOfChairs/4)+1;
        }
    }

    /**
     * This function will determine what color should be the Status and ColorDiv
     */
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
            {/**chairs top*/}
                <ChairRow position='top' chairNumOnSide={chairNumOnSide} />
            
            {/**table itself*/}
            <div>
                <Row>

                    {/**chairs left*/}
                    <ChairRow position='left' chairNumOnSide={chairNumOnSide} />

                    <TableBody chairNumOnSide={chairNumOnSide}>
                        <Row>
                            <TableInfo>
                                <div>
                                    {tableID}<br></br>
                                    {partyName}<br></br>
                                    <Status
                                    occupancyColor={getOccupancyColor(occupancyStatus)}
                                    >{occupancyStatus}</Status><br></br>
                                </div>
                            </TableInfo>
                            <ColorDiv chairNumOnSide={chairNumOnSide} occupancyColor={ getOccupancyColor(occupancyStatus)} />
                        </Row>
                    </TableBody>

                    {/**chairs right*/}
                    <ChairRow position='right' chairNumOnSide={chairNumOnSide} />
                </Row>
            </div>

            {/**chairs bottom*/}
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
        
        `;

    const Status=styled.div`
          color: ${ ({occupancyColor}) => occupancyColor };
        `;