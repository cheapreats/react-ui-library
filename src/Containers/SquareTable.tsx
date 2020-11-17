import React from 'react';
import styled, {useTheme} from 'styled-components';
import { ChairRow } from './ChairRow';

export interface ISquareTable {
    /**
     * The unique identifier for the table
     */
    tableID: string,
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
    /**
     * The number of chairs at the top
     */
    chairsTop: number,
    /**
     * The number of chairs at the left
     */
    chairsLeft: number,
    /**
     * The number of chairs at the right
     */
    chairsRight: number,
    /**
     * The number of chairs at the bottom
     */
    chairsBottom: number,
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
        partyName = 'Null',
        occupancyStatus = occupancyStatusTypes.Vacant,
        reservationTime = Date.now(),
        chairsTop=1,
        chairsBottom=1,
        chairsLeft=1,
        chairsRight=1,
        ...props
    }) => {

        const tableSize= getTableSize(chairsTop,chairsBottom,chairsLeft,chairsRight);
        const {colors} = useTheme();

        /**
         * This function will determine how many chair to put per each side
         * of the table (left, right, top, bottom)
         * @param chairsTop,chairsBottom,chairsLeft,chairsRight {number} - Number of chairs per side
         * @return {number} - The largest number of chairs
         */
        function getTableSize(top:number, bottom:number, left:number, right:number){

            return Math.max(top,bottom,left,right);
        }

        /**
         * This function will determine if there are left chairs
         * * to correct top or bottom row's margins
         * @param chairsLeft {number} - Number of chairs on left side
         * @return {boolean} - If there are true, if none false
         */
        function isSideChairs(chairs:number){

            if(chairs>0){
                return true;
            }
            return false;
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
                <ChairRow position='top' chairsTop={chairsTop} sideChairs={isSideChairs(chairsLeft)} />
            
                {/** table itself */}
                <div>
                    <Row>

                        {/** chairs left */}
                        <ChairRow position='left' chairsLeft={chairsLeft} />

                        <TableBody chairNumOnSide={tableSize}>
                            <Row>
                                <TableInfo>
                                    <div>
                                        {tableID+"\n"+partyName}
                                        <Status occupancyColor={getOccupancyColor(occupancyStatus)}>{occupancyStatus}</Status>
                                    </div>
                                </TableInfo>
                                <ColorDiv chairNumOnSide={tableSize} occupancyColor={ getOccupancyColor(occupancyStatus)} />
                            </Row>
                        </TableBody>

                        {/** chairs right */}
                        <ChairRow position='right' chairsRight={chairsRight} />
                    </Row>
                </div>

                {/** chairs bottom */}
                <ChairRow position='bottom' chairsBottom={chairsBottom} sideChairs={isSideChairs(chairsLeft)} />

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

