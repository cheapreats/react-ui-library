import React from 'react';
import styled, {useTheme} from 'styled-components';

export interface IRectangleTable {
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

/**
 * Primary UI component for user interaction
 */

export const RectangleTable: React.FC<IRectangleTable>
    = ({
           tableID = 'T1',
           numOfChairs = 4,
           partyName = 'Null',
           occupancyStatus = occupancyStatusTypes.Vacant,
           reservationTime = Date.now(),
           ...props
       }) => {

    const {colors} = useTheme();

    /**
     * checks numOfChairs is between 1-6
     * @param numOfChairs {number} uses the number of chairs
     * @returns returns {number} of chairs of the component.
     */
    function getChairs(numOfChairs: number){

        if(numOfChairs < 1 || numOfChairs > 6 ){
            return 2;
        }

        if(numOfChairs < 3){
            return 2;
        } else if (numOfChairs < 5){
            return 4;
        } else {
            return 6;
        }
    }
    /**
     * Primary function that returns the color from the occupancyStatus
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
        <StyledTable numOfChairs={ getChairs(numOfChairs) }>
            <div>
                <RowMargin0>
                    {[...Array( (getChairs(numOfChairs) / 2) )].map((e, i) => (
                        <Col key={i}>
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
                            </Col6MxAutoMt3TxtLt>
                        </RowM0H25>
                        <RowM0H25 />
                        <RowM0H50>
                            <Col6MxAutoMt5>
                                <TextWhiteDiv>{partyName}</TextWhiteDiv>
                                <TextOccupancyColor
                                occupancyColor={ getOccupancyColor(occupancyStatus) }
                                >
                                    {occupancyStatus}
                                </TextOccupancyColor>
                            </Col6MxAutoMt5>
                        </RowM0H50>
                    </Col6P0>
                    <Col4P0 />
                    <ColorBand   occupancyColor={ getOccupancyColor(occupancyStatus) } />
                </RowMargin0>
            </TableBody>

            <div>
                <RowMargin0>
                    {[...Array( (getChairs(numOfChairs) / 2) )].map((e, i) => (
                        <Col key={i}>
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

    const StyledTable = styled.div`
                width: ${ ({numOfChairs}) => numOfChairs * 11}em;        
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
                margin: .25rem;
                
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

    const ColorBand = styled.div`
            border-top-right-radius: 3rem;
            border-bottom-right-radius: 3rem;
            height: 22em;
            flex: 0 0 16.666667%;
            max-width: 16.666667%;
            position: relative;
            width: 100%;
            background-color: ${ ({occupancyColor}) => occupancyColor };
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

    const Col6MxAutoMt5 = styled(Col6P0)`
            padding-right: 15px;
            padding-left: 15px;
            margin-left: auto;
            margin-right: auto;
            margin-top: 3rem;
        `;

    const TextWhiteDiv = styled.div`
            color: #fff;
        `;

    const TextOccupancyColor = styled.div`
            color: ${ ({occupancyColor}) => occupancyColor };
        `;
